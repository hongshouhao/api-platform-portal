<template>
  <div class="panel">
    <Tabs value="table" type="card">
      <TabPane label="Table View" name="table">
        <div class="content">
          <Button icon="ios-refresh" type="primary" :style="{margin:'10px'}" @click="refreshData">刷新</Button>
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
          <Table ref="configTable" :columns="columns" :data="dataSource" :loading="loading" stripe></Table>
        </div>
      </TabPane>

      <TabPane label="JSON View">
        <highlight-code lang="JSON">{{dataSourceJString}}</highlight-code>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Ocelot } from "../../lib/ocelot";

export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          title: "description",
          key: "description",
          width: 250,
          align: "center"
        },
        {
          title: "jsonString",
          key: "jsonString",
          ellipsis: true
        },
        {
          title: "enable",
          key: "enable",
          width: 150,
          align: "center"
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
      template: false
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
                desc: errorThrownn,
                duration: 0
              });
            }
          );
        }
      });
    },
    buildConfig(row) {
      Ocelot.BuildConfig(
        "test",
        function() {
          _this.$Notice.success({
            title: "生成成功"
          });
          _this.refreshData();
        },
        function(errorThrownn) {
          _this.$Notice.error({
            title: "生成失败:",
            desc: errorThrownn,
            duration: 0
          });
        }
      );
    },
    enableConfig(row) {
      Ocelot.EnableConfig(
        row.id,
        function() {
          Ocelot.ReLoadConfig(
            function() {
              Ocelot.ReLoadConfig();
              _this.$Notice.success({
                title: "应用成功"
              });
            },
            function(errorThrownn) {
              _this.$Notice.error({
                title: "配置成功置为当前, 但重新加载映射配置过程失败:",
                desc: errorThrownn,
                duration: 0
              });
            }
          );

          _this.refreshData();
        },
        function(errorThrownn) {
          _this.$Notice.error({
            title: "应用失败:",
            desc: errorThrownn,
            duration: 0
          });
        }
      );
    },
    currentConfig() {
      var _this = this;
      Ocelot.CurrentConfig(
        function(data) {
          _this.showCurrentConfiguration = true;
          _this.currentConfiguration = JSON.stringify(data, null, 2);
        },
        function(errorThrown) {
          _this.$Notice.error({
            title: "获取失败",
            desc: errorThrown,
            duration: 0
          });
        }
      );
    }
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
