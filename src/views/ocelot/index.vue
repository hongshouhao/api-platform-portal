<template>
  <div class="panel">
    <Tabs value="table" type="card">
      <TabPane label="Table View" name="table">
        <div class="content">
          <Button icon="ios-refresh" type="info" :style="{margin:'10px'}" @click="initTable">刷新</Button>
          <Button icon="md-add-circle" type="primary" @click="onAdd" :style="{margin:'10px 5px'}">新增</Button>
          <Button
            icon="ios-locate-outline"
            type="warning"
            @click="onVerify"
            :style="{margin:'10px 5px'}"
          >验证</Button>
          <Button
            icon="ios-code-working"
            type="success"
            :style="{margin:'10px'}"
            @click="GetCurrentMapping"
          >当前Mapping</Button>
          <Button
            icon="ios-cloud-circle"
            type="error"
            :style="{margin:'10px 5px'}"
            @click="onExcute"
          >生成</Button>
          <Table ref="configTable" :columns="columns" :data="columnData" stripe :loading="loading"></Table>
        </div>
      </TabPane>

      <TabPane label="JSON View" name="json">
        <highlight-code lang="JSON">{{json}}</highlight-code>
      </TabPane>
    </Tabs>
    <Modal v-model="modal" title="编辑网关信息" fullscreen @on-ok="onSave">
      <edit-view ref="config" v-if="modal" :sectionModel="formData"></edit-view>
    </Modal>
    <Modal v-model="configModal" title="当前Mapping" width="800">
      <div class="mappingcontent">
        <pre>
          <code>{{configData}}</code>
        </pre>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Ocelot } from "../../lib/ocelot";
import { util } from "../../js/utils";
import EditView from "./configpanel";

export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "id",
          key: "id",
          width: 100,
          align: "center"
        },
        {
          title: "name",
          key: "name",
          width: 150,
          align: "center"
        },
        {
          title: "jsonString",
          key: "jsonString",
          ellipsis: true,
          tooltip: true
        },
        {
          title: "enable",
          key: "enable",
          width: 150,
          align: "center"
        },
        {
          title: "description",
          key: "description",
          width: 250,
          align: "center"
        },
        {
          title: "createTime",
          key: "createTime",
          width: 180,
          align: "center"
        },
        {
          title: "modifiedTime",
          key: "modifiedTime",
          width: 180,
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
      ],
      columnData: [],
      json: "",
      modal: false,
      configModal: false,
      configData: [],
      formData: {},
      template: false
    };
  },
  mounted() {
    this.initTable();
  },
  methods: {
    initTable() {
      this.loading = true;
      var _this = this;
      Ocelot.GetAllSections(
        function(json) {
          _this.columnData = json.map(item => {
            item.createTime = new Date(item.createTime).Format(
              "yyyy-MM-dd hh:mm:ss"
            );
            if (item.modifiedTime) {
              item.modifiedTime = new Date(item.modifiedTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            return item;
          });
          _this.json = JSON.stringify(json, null, 2);
          debugger;
          _this.loading = false;
        },
        function(errorThrow) {
          if (errorThrow == "Unauthorized")
            _this.$Message.warning("登录过期，请重新登录");
          else _this.$Message.warning("数据获取失败！");
        }
      );
    },
    onEdit(row) {
      this.formData = row;
      this.modal = true;
    },
    onAdd() {
      this.modal = true;
      this.formData = {};
    },
    onSave() {
      var _this = this;
      var obj = _this.$refs.config.sectionModel;
      Ocelot.SaveSection(
        obj,
        function() {
          _this.$Message.success("保存成功");
          _this.initTable();
        },
        function(errorThrow) {
          _this.$Message.error("保存失败:" + errorThrow);
          _this.initTable();
        }
      );
    },
    onDelete(row) {
      var _this = this;
      var id = row.id;
      _this.$Modal.confirm({
        title: "注意",
        content: "<p>是否删除当前行？</p>",
        onOk: () => {
          Ocelot.DeleteSection(
            id,
            function() {
              _this.$Message.success("删除成功");
              _this.initTable();
            },
            function(errorThrow) {
              _this.$Message.error("删除失败:" + errorThrow);
            }
          );
        }
      });
    },
    onExcute() {
      var _this = this;
      Ocelot.ReBuiltConfiguration(
        function() {
          _this.$Message.success("生成成功");
        },
        function(errorThrow) {
          _this.$Message.error("生成失败:" + errorThrow);
        }
      );
    },
    onVerify() {
      var _this = this;
      var rows = _this.$refs.configTable.getSelection();
      Ocelot.ValidateSection(
        rows,
        function() {
          _this.$Message.success("验证通过");
        },
        function(errorThrow) {
          _this.$Message.error("验证失败：" + errorThrow);
        }
      );
    },
    GetCurrentMapping() {
      var _this = this;
      Ocelot.GetConfiguration(
        function(data) {
          _this.configModal = true;
          _this.configData = JSON.stringify(data, null, 2);
        },
        function(errorThrow) {
          _this.$Message.error("获取失败" + errorThrow);
        }
      );
    }
  },
  components: {
    EditView
  }
};
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
