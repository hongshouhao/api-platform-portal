<template>
  <div class="panel">
    <Tabs value="table" type="card">
      <TabPane label="Table View" name="table">
        <div class="content">
          <Button icon="ios-refresh" type="primary" :style="{margin:'10px'}" @click="refreshData">刷新</Button>
          <Button
            icon="md-add-circle"
            type="primary"
            @click="addNewSection"
            :style="{margin:'10px 5px'}"
          >新增</Button>
          <Button
            icon="ios-locate-outline"
            type="primary"
            @click="verifySelectedSections"
            :style="{margin:'10px 5px'}"
          >验证</Button>
          <Button
            icon="ios-code-working"
            type="primary"
            :style="{margin:'10px'}"
            @click="getUsingGatawayConfig"
          >当前Mapping</Button>
          <Button
            icon="ios-cloud-circle"
            type="primary"
            :style="{margin:'10px 5px'}"
            @click="reBuildGatawayConfig"
          >生成</Button>
          <Table
            ref="sectionTable"
            :columns="columns"
            :data="dataSource"
            :loading="loading"
            stripe
            @on-row-click="editSection"
          ></Table>
        </div>
      </TabPane>

      <TabPane label="JSON View">
        <highlight-code lang="JSON">{{dataSourceJString}}</highlight-code>
      </TabPane>
    </Tabs>
    <Drawer title="Section Detail" :closable="false" width="640" v-model="sectionEditView">
      <editView :sectionEditViewModel="sectionEditViewModel" v-if="sectionEditView"></editView>
      <div class="drawer-footer-buttons">
        <Button
          type="error"
          :disabled="sectionEditViewModel.forUpdate==false"
          style="margin-right: 8px"
          @click="deleteSection"
        >Delete</Button>
        <Button type="primary" @click="saveSection">Save</Button>
      </div>
    </Drawer>

    <Modal v-model="showCurrentConfiguration" title="当前Mapping" width="800">
      <div class="mappingcontent">
        <pre>
          <code>{{currentConfiguration}}</code>
        </pre>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Ocelot } from "../../lib/ocelot";
import { modelTempl } from "../modelTempl.js";
import editView from "./sectionEdit";

export default {
  data() {
    return {
      sectionEditViewModel: {
        section: {},
        forUpdate: true
      },
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
        }
      ],
      dataSource: [],
      dataSourceJString: "",
      sectionEditView: false,
      showCurrentConfiguration: false,
      currentConfiguration: {},
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
      Ocelot.GetAllSections(
        function(data) {
          _this.dataSource = data.map(item => {
            item.sectionType = item.sectionType.toString();
            return item;
          });
          _this.dataSourceJString = JSON.stringify(data, null, 2);
          _this.loading = false;
        },
        function(errorThrow) {
          if (errorThrow == "Unauthorized")
            _this.$Message.warning("登录过期，请重新登录");
          else _this.$Message.warning("数据获取失败！");
        }
      );
    },
    addNewSection() {
      this.sectionEditViewModel.section = modelTempl.getConfigSection();
      this.sectionEditViewModel.forUpdate = false;
      this.sectionEditView = true;
    },
    editSection(row) {
      this.sectionEditViewModel.section = row;
      this.sectionEditViewModel.forUpdate = true;
      this.sectionEditView = true;
    },
    saveSection() {
      var _this = this;
      Ocelot.SaveSection(
        _this.sectionEditViewModel.section,
        function() {
          _this.$Message.success("保存成功");
          _this.sectionEditView = false;
          _this.refreshData();
        },
        function(errorThrow) {
          _this.$Message.error("保存失败:" + errorThrow);
        }
      );
    },
    deleteSection() {
      var _this = this;
      _this.$Modal.confirm({
        title: "注意",
        content: "<p>是否删除当前行？</p>",
        onOk: () => {
          Ocelot.DeleteSection(
            _this.sectionEditViewModel.section.id,
            function() {
              _this.$Message.success("删除成功");
              _this.sectionEditView = false;
              _this.refreshData();
            },
            function(errorThrow) {
              _this.$Message.error("删除失败:" + errorThrow);
            }
          );
        }
      });
    },
    reBuildGatawayConfig() {
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
    verifySelectedSections() {
      var _this = this;
      var rows = _this.$refs.sectionTable.getSelection();
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
    getUsingGatawayConfig() {
      var _this = this;
      Ocelot.GetConfiguration(
        function(data) {
          _this.showCurrentConfiguration = true;
          _this.currentConfiguration = JSON.stringify(data, null, 2);
        },
        function(errorThrow) {
          _this.$Message.error("获取失败" + errorThrow);
        }
      );
    }
  },
  components: {
    editView
  }
};
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
