<template>
  <div class="panel">
    <Tabs value="name1" type="card">
      <TabPane label="Table View" name="name1">
        <div class="content">
          <Button icon="md-add-circle" type="primary" @click="add" :style="{margin:'10px 5px'}">新增</Button>
          <Button icon="ios-refresh" type="primary" :style="{margin:'10px'}" @click="initTable">刷新</Button>
          <Button
            icon="ios-refresh"
            type="primary"
            :style="{margin:'10px'}"
            @click="GetCurrentMapping"
          >获取当前Mapping</Button>
          <Button icon="ios-build" type="error" :style="{margin:'10px 5px'}" @click="onExcute">生成</Button>
          <Table :columns="columns" :data="columnData" stripe :loading="loading"></Table>
        </div>
      </TabPane>
      <TabPane label="JSON View" name="name2">
        <div class="content">
          <pre>
            <code>{{json}}</code>
          </pre>
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="modal" title="编辑网关信息" fullscreen @on-ok="save">
      <edit-view ref="config" v-if="modal" :sectionModel="formData"></edit-view>
    </Modal>
  </div>
</template>

<script>
import EditView from "./configpanel";
export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          title: "id",
          key: "id",
          width: 150
        },
        {
          title: "name",
          key: "name",
          width: 150
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
          width: 150
        },
        {
          title: "description",
          key: "description",
          width: 250
        },
        {
          title: "createTime",
          key: "createTime",
          width: 180
        },
        {
          title: "modifiedTime",
          key: "modifiedTime",
          width: 180
        },
        {
          title: "操作",
          width: 180,
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
      formData: {}
    };
  },
  mounted() {
    Identity.ensureLogedin();
    this.initTable();
  },
  methods: {
    onEdit(row) {
      this.formData = row;
      this.modal = true;
    },
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
          _this.loading = false;
        },
        function(errorThrow) {
          if (errorThrow == "Unauthorized") {
            debugger;
            Identity.ensureLogedin();
          }
          _this.$Message.warning("数据获取失败！");
        }
      );
    },
    add() {
      this.modal = true;
      this.formData = {};
    },
    save() {
      var _this = this;
      console.log(typeof _this.$refs.config.sectionModel);
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
      debugger;
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
    GetCurrentMapping() {}
  },
  components: {
    EditView
  }
};
</script>

<style scoped>
</style>
