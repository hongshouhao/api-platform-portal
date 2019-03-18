<template>
  <div class="panel">
    <Button
      icon="md-add-circle"
      type="primary"
      @click="addNewTemplate"
      :style="{margin:'10px 5px'}"
    >新增</Button>
    <Table
      ref="configTable"
      :columns="columns"
      :data="dataSource"
      stripe
      :loading="loading"
      @on-row-click="showTemplEditView"
    ></Table>
    <Drawer
      title="Template Edit"
      :closable="false"
      width="800"
      v-model="editState"
      style="overflow:hidden"
    >
      <TemplEditView ref="templateEditView" v-if="editState" :templateEditModel="templateEditModel"></TemplEditView>
      <div class="drawer-footer-buttons">
        <Button type="error" style="margin-right: 8px" @click="deleteTemplate">Delete</Button>
        <Button type="primary" @click="saveTemplate">Save</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { Env } from "../../lib/env";
import { Identity } from "../../lib/identity";
import { modelTempl } from "../modelTempl.js";
import TemplEditView from "./templateEdit";

export default {
  data() {
    return {
      editState: false,
      dataSource: [],
      loading: false,
      templateEditModel: {
        template: {},
        forUpdate: false
      },
      columns: [
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
          ellipsis: true
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
        }
      ]
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        Identity.ensureLogedin();
        $.ajax({
          url: Env.ocelot_host + "/admin/template/getall",
          type: "GET",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            _this.dataSource = data;
            _this.editState = false;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    saveTemplate() {
      var _this = this;
      var configObj = {
        ReRoutes: [this.$refs.templateEditView.$refs.reroutesView.model],
        DynamicReRoutes: [this.$refs.templateEditView.$refs.dynamicView.model],
        Aggregates: [this.$refs.templateEditView.$refs.aggregatesView.model],
        GlobalConfiguration: this.$refs.templateEditView.$refs.globalView.model
      };
      var templ = this.$refs.templateEditView.templateEditModel.template;
      templ.jsonString = JSON.stringify(configObj, null, 2);

      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: Env.ocelot_host + "/admin/template/save",
          contentType: "application/json",
          type: "POST",
          data: JSON.stringify(templ),
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            _this.refreshData();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    addNewTemplate() {
      this.editState = true;
      this.templateEditModel.template = modelTempl.getOcelotTemplate();
      this.templateEditModel.forUpdate = false;
    },
    showTemplEditView(row) {
      this.editState = true;
      this.templateEditModel.template = row;
      this.templateEditModel.forUpdate = true;
    },
    deleteTemplate(row) {
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
                _this.refreshData();
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
    TemplEditView
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
