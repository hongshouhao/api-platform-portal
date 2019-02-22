<template>
  <div class="form">
    <Form ref="formInline" :model="sectionModel" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="name">
            <Input v-model="sectionModel.name"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="sectionType">
            <Select v-model="sectionModel.sectionType" placeholder="选择配置类型">
              <Option value="1">ReRoutes</Option>
              <Option value="2">GlobalConfiguration</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="jsonString">
        <Input
          v-model="sectionModel.jsonString"
          type="textarea"
          :autosize="{minRows: 15,maxRows: 20}"
          readonly
        ></Input>
        <Button type="primary" class="configBth" @click="onConfig">配置</Button>
      </FormItem>
      <FormItem label="enable">
        <i-switch v-model="sectionModel.enable" size="large">
          <span slot="open">true</span>
          <span slot="close">false</span>
        </i-switch>
      </FormItem>
      <FormItem label="description">
        <Input v-model="sectionModel.description"></Input>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="createTime">
            <Input v-model="sectionModel.createTime" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="modifiedTime">
            <Input v-model="sectionModel.modifiedTime" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Modal v-model="modal" width="1000" title="配置内容" @on-ok="ok" :mask-closable="false">
      <div v-if="modal">
        <reroutes-view
          ref="reroute"
          v-if="sectionModel.sectionType=='1'"
          :jsonString="sectionModel.jsonString"
        ></reroutes-view>
        <global-view
          ref="global"
          v-if="sectionModel.sectionType=='2'"
          :jsonString="sectionModel.jsonString"
        ></global-view>
      </div>
    </Modal>
  </div>
</template>

<script>
import ReroutesView from "./templete/reroutes";
import GlobalView from "./templete/global";
export default {
  data() {
    return {
      modal: false,
      show: true,
      data: {},
      json: ""
    };
  },
  props: {
    sectionModel: {
      type: Object,
      default: {
        name: "",
        sectionType: "1",
        jsonString: "",
        enable: true,
        description: "",
        createTime: "",
        modifiedTime: ""
      }
    }
  },
  mounted() {
    if (this.sectionModel.sectionType)
      this.sectionModel.sectionType = this.sectionModel.sectionType.toString();
  },
  methods: {
    onConfig() {
      this.modal = true;
      this.show = this.sectionModel.sectionType == "1";
    },
    ok() {
      switch (this.sectionModel.sectionType) {
        case "1":
          this.data = this.$refs.reroute.ReRoutesForm;
          this.ObjToJSON();
          var obj = {
            ReRoutes: [this.data]
          };
          break;
        case "2":
          this.data = this.$refs.global.GlobalForm;
          var obj = {
            GlobalConfiguration: this.data
          };
          break;
        case "3":
          break;
        case "4":
          break;
      }
      this.sectionModel.jsonString = JSON.stringify(obj, null, 2);
    },
    ObjToJSON() {
      this.arrayToObj("AddHeadersToRequest");
      this.arrayToObj("UpstreamHeaderTransform");
      this.arrayToObj("DownstreamHeaderTransform");
      this.arrayToObj("AddClaimsToRequest");
      this.arrayToObj("RouteClaimsRequirement");
      this.arrayToObj("AddQueriesToRequest");
    },
    arrayToObj(name) {
      var arr = this.data[name];
      delete this.data[name];
      this.data[name] = {};
      if (arr.length > 0) {
        for (var i in arr) {
          this.data[name][arr[i].key] = arr[i].value;
        }
      }
    }
  },
  components: {
    ReroutesView,
    GlobalView
  }
};
</script>

<style scoped lang="less">
.form {
  .configBth {
    margin: 10px 0 0 0;
  }
}
</style>
