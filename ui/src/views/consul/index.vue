<template>
  <Card>
    <div class="panel">
      <div class="content">
        <i-select style="width:200px" @on-change="dcChanged" v-model="selecteddc">
          <i-option v-for="item in datacenters" :value="item" :key="item">{{ item }}</i-option>
        </i-select>
        <Button
          icon="md-add"
          type="primary"
          :style="{margin:'10px 5px'}"
          @click="editState=true"
        >注册新服务</Button>
        <Table
          ref="svcTable"
          :columns="columns"
          :data="services_per_page"
          :loading="loading"
          stripe
        ></Table>
        <br>
        <Page :total="serviceCount" show-elevator @on-change="pageChange"/>
      </div>
      <Drawer
        title="服务信息"
        :closable="false"
        width="800"
        v-model="editState"
        style="overflow:hidden"
      >
        <ServiceEditView ref="ServiceEditView" v-if="editState" :model="model"></ServiceEditView>
        <div class="drawer-footer-buttons">
          <Button type="primary" @click="save">Save</Button>
        </div>
      </Drawer>
    </div>
  </Card>
</template>

<script>
import { Env } from "../../lib/env";
import ServiceEditView from "./serviceEdit";
var consul = require("consul")({ host: new URL(Env.consul_host).hostname });
var Enumerable = require("linq");
export default {
  data() {
    return {
      loading: false,
      editState: false,
      selecteddc: "",
      datacenters: [],
      services: [],
      services_per_page: [],
      serviceCount: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "Name",
          key: "Service"
        },
        {
          title: "Host",
          key: "ServiceHost",
          width: 150
        },
        {
          title: "Node",
          key: "Node",
          width: 200
        },
        {
          title: "Status",
          key: "Status",
          align: "center",
          render: (h, params) => {
            return h(
              "Icon",
              {
                props: {
                  size: 20,
                  type:
                    params.row.Status === "passing"
                      ? "md-checkmark-circle"
                      : "md-close-circle",
                  color: params.row.Status === "passing" ? "#19be6b" : "#ed4014"
                }
              },
              params.row.Status
            );
          },
          width: 100
        },
        {
          title: "Tags",
          key: "ServiceTags",
          align: "center",
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  color: "blue"
                }
              },
              params.row.ServiceTags
            );
          },
          width: 100
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deregister(params.row);
                    }
                  }
                },
                "注销"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.refreshDcs();
  },
  methods: {
    refreshDcs() {
      var _this = this;
      consul.catalog.datacenters(function(err, dcs) {
        if (err) throw err;

        _this.datacenters = dcs;
        var dc = dcs[0];
        if (dc) {
          _this.selecteddc = dc;
          _this.dcChanged(dc);
        }
      });
    },
    dcChanged(dc) {
      if (!dc) return;
      var _this = this;
      var svcarr = new Array();
      var svcEnum = Enumerable.from(svcarr);
      consul.catalog.node.list(dc, function(err1, nodes) {
        if (err1) throw err1;

        for (var j = 0; j < nodes.length; j++) {
          {
            var node = nodes[j];
            consul.catalog.node.services(node.Node, function(
              err2,
              nodeservices
            ) {
              if (err2) throw err2;
              for (var svc in nodeservices.Services) {
                var svcobj = svcEnum.firstOrDefault(s => s.Service === svc);
                if (!svcobj) {
                  svcobj = nodeservices.Services[svc];
                  svcobj.Node = node.Address + ":" + node.Node;
                  svcobj.ServiceHost = svcobj.Address + ":" + svcobj.Port;
                  svcobj.ServiceTags = svcobj.Tags.join(",");

                  svcarr.push(svcobj);
                }
              }

              consul.health.node(node.Node, function(err3, checks) {
                if (err3) throw err3;

                for (var i = 0; i < checks.length; i++) {
                  svcobj = svcEnum.firstOrDefault(
                    s => s.Service === checks[i].ServiceName
                  );
                  if (svcobj) {
                    svcobj.Status = checks[i].Status;
                  }
                }

                svcarr = svcarr.sort(function(a, b) {
                  a.ServiceHost - b.ServiceHost;
                });
                _this.serviceCount = svcarr.length;
                _this.services = svcarr;
                _this.pageChange(1);
              });
            });
          }
        }
      });
    },
    deregister(row) {
      var _this = this;
      _this.$Modal.confirm({
        title: "警告",
        content: "<p>确定注销此服务实例？</p>",
        onOk: () => {
          consul.agent.service.deregister(row.ID, function(err) {
            if (err) {
              _this.$Notice.error({
                title: "注销失败:",
                desc: err
              });
            } else {
              _this.$Notice.success({
                title: "注销成功"
              });
              _this.dcChanged(_this.selecteddc);
            }
          });
        }
      });
    },
    save() {
      var _this = this;
      var options = this.$refs.ServiceEditView.model;
      consul.agent.service.register(options, function(err) {
        if (err) {
          _this.$Notice.error({
            title: "服务注册失败:",
            desc: err
          });
        } else {
          _this.$Notice.success({
            title: "服务注册成功"
          });
          _this.editState = false;
          _this.dcChanged(_this.selecteddc);
        }
      });
    },
    getUrlPort(url) {
      var protocolReg = /^\w+:\/\//;
      if (!protocolReg.test(url)) {
        url = "http://" + url;
      }
      return new URL(url).port;
    },
    pageChange(page) {
      var offset = (page - 1) * 15;
      this.services_per_page =
        offset + 15 >= this.services.length
          ? this.services.slice(offset, this.services.length)
          : this.services.slice(offset, offset + 15);
    }
  },
  components: {
    ServiceEditView
  }
};
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
