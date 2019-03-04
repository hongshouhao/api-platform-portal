<template>
  <div class="panel">
    <Tabs value="name1" type="card">
      <TabPane label="Table View" name="name1">
        <div class="content">
          <Button icon="ios-refresh" type="info" :style="{margin:'10px'}" @click="initTable">服务</Button>
          <Button icon="md-add-circle" type="primary" @click="onAdd" :style="{margin:'10px 5px'}">注册新服务</Button>
          <Table ref="serviceTable" :columns="columns" :data="dataSource" stripe :loading="loading"></Table>
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
    <Modal v-model="modal" title="编辑服务信息" fullscreen @on-ok="onSave">
      <edit-view ref="config" v-if="modal" :sectionModel="formData"></edit-view>
    </Modal>
  </div>
</template>

<script>
import ServiceView from "./service.vue";
export default {
  data() {
    return {
      loading: false,
      columns: [ 
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
          title: "address",
          key: "address",
        },
        {
          title: "port",
          key: "port",
          width: 150,
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
      dataSource: [],
      json: "",
      modal: false,
      configModal: false,
      configData: [],
      formData: {},
      template: false
    };
  },
  mounted() {
    Identity.ensureLogedin();
    this.initTable();
  },
  methods: {
    initTable() {
      this.loading = true;
      var _this = this;
      Ocelot.GetAllSections(
        function(json) {
          _this.dataSource =json;
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

