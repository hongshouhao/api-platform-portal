<template>
  <Card>
    <div class="panel">
      <Tabs value="table">
        <TabPane label="Table View" name="table">
          <div class="content">
            <Button
              icon="ios-refresh"
              type="primary"
              :style="{margin:'10px'}"
              @click="refreshData"
            >刷新</Button>
            <Button
              icon="ios-cloud-circle"
              type="primary"
              :style="{margin:'10px 5px'}"
              @click="buildConfig"
            >生成</Button>
            <Button
              icon="ios-code-working"
              type="primary"
              :style="{margin:'10px'}"
              @click="currentConfig"
            >当前Mapping</Button>
            <Table
              ref="configTable"
              :columns="columns"
              :data="dataSource"
              :loading="loading"
              stripe
            ></Table>
          </div>
        </TabPane>
        <TabPane label="JSON View">
          <highlight-code lang="JSON">{{dataSourceJString}}</highlight-code>
        </TabPane>
      </Tabs>
      <Modal v-model="viewJsonString" footer-hide width="800">
        <highlight-code lang="JSON">{{json}}</highlight-code>
      </Modal>
    </div>
  </Card>
</template>

<script>
import { Ocelot } from "../../lib/ocelot";
import { truncate } from "fs";
export default {
  data() {
    return {
      loading: false,
      viewJsonString: false,
      json: {},
      columns: [
        {
          type: "index",
          width: 80
        },
        {
          title: "description",
          key: "description",
          width: 250,
          align: "center"
        },
        {
          title: "jsonString",
          key: "jsonString",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: "#"
                },
                on: {
                  click: () => {
                    this.viewJsonString = true;
                    this.json = JSON.stringify(
                      JSON.parse(params.row.jsonString),
                      null,
                      2
                    );
                  }
                }
              },
              "{...}"
            );
          }
        },
        {
          title: "enable",
          key: "enable",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Icon",
              {
                props: {
                  size: 20,
                  type:
                    params.row.enable === true
                      ? "md-checkmark-circle"
                      : "md-close-circle",
                  color: params.row.enable === true ? "#19be6b" : "#ed4014"
                }
              },
              params.row.Status
            );
          }
        },
        {
          title: "createTime",
          key: "createTime",
          width: 180,
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.enableConfig(params.row);
                    }
                  }
                },
                "应用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteConfig(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataSource: [],
      dataSourceJString: "",
      template: false,
      description: ""
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.loading = true;
      var _this = this;
      Ocelot.GetAllConfigs(
        function(data) {
          _this.dataSourceJString = JSON.stringify(data, null, 2);
          _this.dataSource = data;
          _this.loading = false;
        },
        function(errorThrown) {
          if (errorThrown == "Unauthorized")
            _this.$Message.warning("登录过期，请重新登录");
          else _this.$Message.warning("数据获取失败！");
        }
      );
    },
    deleteConfig(row) {
      var _this = this;
      _this.$Modal.confirm({
        title: "注意",
        content: "<p>确定是否删除当前行？</p>",
        onOk: () => {
          Ocelot.DeleteConfig(
            row.id,
            function() {
              _this.$Notice.success({
                title: "删除成功"
              });
              _this.refreshData();
            },
            function(errorThrownn) {
              _this.$Notice.error({
                title: "删除失败:",
                desc: errorThrownn
              });
            }
          );
        }
      });
    },
    buildConfig(row) {
      var _this = this;
      _this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: _this.description,
              autofocus: true,
              placeholder: "输入备注信息"
            },
            on: {
              input: val => {
                _this.description = val;
              }
            }
          });
        },
        onOk: () => {
          Ocelot.BuildConfig(
            _this.description,
            function() {
              _this.$Notice.success({
                title: "生成成功"
              });
              _this.refreshData();
            },
            function(errorThrownn) {
              _this.$Notice.error({
                title: "生成失败:",
                desc: errorThrownn
              });
            }
          );
        }
      });
    },
    enableConfig(row) {
      var _this = this;
      Ocelot.EnableConfig(
        row.id,
        function() {
          Ocelot.ReLoadConfig(
            function() {
              _this.$Notice.success({
                title: "应用成功"
              });
              _this.refreshData();
            },
            function(errorThrownn) {
              _this.$Notice.error({
                title: "网关加载映射失败",
                desc: errorThrownn
              });
            }
          );
        },
        function(errorThrownn) {
          _this.$Notice.error({
            title: "应用失败:",
            desc: errorThrownn
          });
          _this.refreshData();
        }
      );
    },
    currentConfig() {
      var _this = this;
      Ocelot.CurrentConfig(
        function(data) {
          _this.viewJsonString = true;
          _this.json = JSON.stringify(data, null, 2);
        },
        function(errorThrown) {
          _this.$Notice.error({
            title: "获取失败",
            desc: errorThrown
          });
        }
      );
    },
    inputDesc() {}
  },
  components: {}
};
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
