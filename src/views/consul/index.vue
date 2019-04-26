<template>
  <div class="panel">
    <div class="content">
      <i-select style="width:200px" @on-change="dcChanged" v-model="selecteddc">
        <i-option v-for="item in datacenters" :value="item" :key="item">{{ item }}</i-option>
      </i-select>
      <Button
        icon="md-add-circle"
        type="primary"
        :style="{margin:'10px 5px'}"
        @click="editState=true"
      >注册新服务</Button>
      <Table ref="svcTable" :columns="columns" :data="services" :loading="loading" stripe></Table>
    </div>

    <Drawer title="服务信息" :closable="false" width="800" v-model="editState" style="overflow:hidden">
      <ServiceEditView ref="ServiceEditView" v-if="editState" :model="model"></ServiceEditView>
      <div class="drawer-footer-buttons">
        <Button type="primary" @click="save">Save</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { Env } from "../../lib/env";
import ServiceEditView from "./serviceEdit";
var consul = require("consul")({ host: Env.consul_host });
export default {
  data() {
    return {
      loading: false,
      editState: false,
      selecteddc: "",
      datacenters: [],
      services: [],
      columns: [
        {
          title: "Name",
          key: "ServiceName"
        },
        {
          title: "Host",
          key: "ServiceHost"
        },
        {
          title: "Node",
          key: "Node"
        },
        {
          title: "Tags",
          key: "ServiceTags",
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          align: "center",
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
      consul.catalog.service.list(dc, function(err1, services) {
        if (err1) throw err1;

        var svcArray = new Array();
        for (let svcName in services) {
          consul.catalog.service.nodes(svcName, function(err2, nodeArr) {
            if (err2) throw err2;

            nodeArr.map(function(item, index) {
              item.ServiceHost = item.Address + ":" + item.ServicePort;
              svcArray.push(item);
            });
          });
        }

        svcArray.sort(function(a, b) {
          a.ServiceHost - b.ServiceHost;
        });

        _this.services = svcArray;
      });
    },
    deregister(row) {
      var _this = this;
      _this.$Modal.confirm({
        title: "警告",
        content: "<p>确定注销此服务实例？</p>",
        onOk: () => {
          consul.agent.service.deregister(row.ServiceID, function(err) {
            if (err) {
              _this.$Notice.error({
                title: "注销失败:",
                desc: err
              });
            } else {
              _this.$Notice.success({
                title: "注销成功"
              });
              _this.refreshData();
            }
          });
        }
      });
    },
    save() {
      var options = this.$refs.ServiceEditView.model;
      consul.agent.service.register(options, function(err) {
        if (err) throw err;
      });
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
