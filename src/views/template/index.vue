<template>
  <div class="panel">
    <Button icon="md-add-circle" type="primary" @click="onAdd" :style="{margin:'10px 5px'}">新增</Button>
    <Table ref="configTable" :columns="columns" :data="columnData" stripe :loading="loading"></Table>
    <Modal v-model="modal" title="编辑模板信息" fullscreen @on-ok="onSave">
      <config-view ref="config" v-if="modal" :sectionModel="formData"></config-view>
    </Modal>
  </div>
</template>

<script>
import ConfigView from "./config";
export default {
  data() {
    return {
      modal: false,
      template: {},
      columnData: [],
      loading: false,
      formData: {},
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "id",
          key: "id",
          width: 100,
          align: "center"
        },
        {
          title: "version",
          key: "version",
          width: 200,
          align: "center"
        },
        {
          title: "jsonString",
          key: "jsonString",
          ellipsis: true,
          tooltip: true
        },
        {
          title: "description",
          key: "description",
          width: 200,
          align: "center"
        },
        {
          title: "createTime",
          key: "createTime",
          width: 200,
          align: "center"
        },
        {
          title: "modifiedTime",
          key: "modifiedTime",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            let hButton = [];
            hButton.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.onEdit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.onDelete(params.row);
                    }
                  }
                },
                "删除"
              )
            );
            return h("div", hButton);
          }
        }
      ]
    };
  },
  created() {
    Identity.ensureLogedin();
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.ocelot_host + "/admin/template/getall",
          type: "GET",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            _this.columnData = data;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    onSave() {
      var _this = this;
      var obj = {
        ReRoutes: [this.$refs.config.$refs.reroutes.ReRoutesForm],
        DynamicReRoutes: [this.$refs.config.$refs.dynamic.DynamicForm],
        Aggregates: [this.$refs.config.$refs.aggregates.AggregatesForm],
        GlobalConfiguration: this.$refs.config.$refs.global.GlobalForm
      };
      var jsonForm = this.$refs.config.sectionModel;
      jsonForm.jsonString = JSON.stringify(obj, null, 2);

      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.ocelot_host + "/admin/template/save",
          contentType: "application/json",
          type: "POST",
          data: JSON.stringify(jsonForm),
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            _this.getData();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
      console.log(jsonForm);
    },
    onAdd() {
      this.modal = true;
      this.formData = {};
    },
    onEdit(row) {
      this.modal = true;
      if (row) this.formData = row;
    },
    onDelete(row) {
      var _this = this;
      _this.$Modal.confirm({
        title: "注意",
        content: "<p>是否删除当前行？</p>",
        onOk: () => {
          Identity.getAccessToken().then(function(token) {
            $.ajax({
              url: env.ocelot_host + "/admin/template/delete",
              contentType: "application/json",
              data: JSON.stringify(row.id),
              type: "POST",
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
              },
              success: function(data) {
                _this.$Message.success("删除成功");
                _this.getData();
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus + "," + errorThrown);
                _this.$Message.error("删除失败：" + errorThrown);
              }
            });
          });
        }
      });
    }
  },
  components: {
    ConfigView
  }
};
</script>

<style lang="less" scoped>
.detail {
  padding: 10px;
  .cardView {
    width: 98%;
    margin: 10px auto;
    padding: 10px;
  }
}
</style>
