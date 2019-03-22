<template>
  <div>
    <Form ref="formInline" :model="sectionEditViewModel" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="name">
            <Input
              v-model="sectionEditViewModel.section.name"
              :readonly="sectionEditViewModel.forUpdate"
            ></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="sectionType">
            <Select
              placeholder="选择配置类型"
              v-model="sectionEditViewModel.section.sectionType"
              :disabled="sectionEditViewModel.forUpdate"
              @on-change="sectionTypeChanged"
            >
              <Option value="1">GlobalConfiguration</Option>
              <Option value="2">ReRoutes</Option>
              <Option value="3">AggregateReRoute</Option>
              <Option value="4">DynamicReRoutes</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="jsonString">
        <highlight-code lang="JSON" class="hjs">{{sectionEditViewModel.section.jsonString}}</highlight-code>
        <Button
          type="primary"
          :disabled="sectionEditViewModel.section.sectionType=='' || sectionEditViewModel.section.sectionType==null"
          @click="editState = true"
        >配置</Button>
      </FormItem>
      <FormItem label="enable">
        <i-switch v-model="sectionEditViewModel.section.enable" size="large">
          <span slot="open">true</span>
          <span slot="close">false</span>
        </i-switch>
      </FormItem>
      <FormItem label="description">
        <Input v-model="sectionEditViewModel.section.description"></Input>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="createTime">
            <Input v-model="sectionEditViewModel.section.createTime" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="modifiedTime">
            <Input v-model="sectionEditViewModel.section.modifiedTime" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Drawer
      :title="getTitle()"
      :closable="false"
      width="640"
      v-model="editState"
      style="overflow:hidden"
    >
      <div>
        <GlobalView
          ref="globalView"
          v-if="sectionEditViewModel.section.sectionType=='1'"
          :jsonString="sectionEditViewModel.section.jsonString"
        ></GlobalView>
        <ReroutesView
          ref="reroutesView"
          v-if="sectionEditViewModel.section.sectionType=='2'"
          :jsonString="sectionEditViewModel.section.jsonString"
        ></ReroutesView>
        <AggregatesView
          ref="aggregatesView"
          v-if="sectionEditViewModel.section.sectionType=='3'"
          :jsonString="sectionEditViewModel.section.jsonString"
        ></AggregatesView>
        <DynamicView
          ref="dynamicView"
          v-if="sectionEditViewModel.section.sectionType=='4'"
          :jsonString="sectionEditViewModel.section.jsonString"
        ></DynamicView>
      </div>
      <div class="drawer-footer-buttons">
        <Button style="margin-right: 8px" @click="editState = false">Cancel</Button>
        <Button type="primary" @click="finishEdit">OK</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import GlobalView from "../ocelot-template/parts/global";
import ReroutesView from "../ocelot-template/parts/reroutes";
import AggregatesView from "../ocelot-template/parts/aggregates";
import DynamicView from "../ocelot-template/parts/dynamic";
import { Ocelot } from "../../lib/ocelot";
import { modelTempl } from "../modelTempl.js";

export default {
  data() {
    return {
      editState: false
    };
  },
  props: {
    sectionEditViewModel: {
      type: Object,
      default: {
        section: {},
        forUpdate: false
      }
    }
  },
  // mounted() {
  //   this.sectionTypeChanged("2");
  // },
  watch: {
    sectionEditViewModel() {
      console.log(this.sectionEditViewModel);
    }
  },
  methods: {
    getTitle() {
      switch (this.sectionEditViewModel.section.sectionType) {
        case "1":
          return "Global";
        case "2":
          return "ReRoutes";
        case "3":
          return "Aggregates";
        case "4":
          return "Dynamic";
      }
    },
    sectionTypeChanged(sectionType) {
      debugger;
      var ocelotConfig = {};
      var ocelotConfigTempl = modelTempl.getOcelotConfigurationSchema();
      switch (sectionType) {
        case "1":
          ocelotConfig.GlobalConfiguration =
            ocelotConfigTempl.GlobalConfiguration;
          break;
        case "2":
          var model = ocelotConfigTempl.ReRoutes[0];
          model.AddHeadersToRequest = this.arrayToObj(
            model.AddHeadersToRequest
          );
          model.UpstreamHeaderTransform = this.arrayToObj(
            model.UpstreamHeaderTransform
          );
          model.DownstreamHeaderTransform = this.arrayToObj(
            model.DownstreamHeaderTransform
          );
          model.AddClaimsToRequest = this.arrayToObj(model.AddClaimsToRequest);
          model.RouteClaimsRequirement = this.arrayToObj(
            model.RouteClaimsRequirement
          );
          model.AddQueriesToRequest = this.arrayToObj(
            model.AddQueriesToRequest
          );
          ocelotConfig.ReRoutes = [model];
          break;
        case "3":
          var model = ocelotConfigTempl.Aggregates;
          ocelotConfig.Aggregates = [model];
          break;
        case "4":
          var model = ocelotConfigTempl.DynamicReRoutes;
          ocelotConfig.DynamicReRoutes = [model];
          break;
      }
      this.sectionEditViewModel.section.jsonString = JSON.stringify(
        ocelotConfig,
        null,
        2
      );
    },
    finishEdit() {
      debugger;
      var ocelotConfig = {};
      switch (this.sectionEditViewModel.section.sectionType) {
        case "1":
          ocelotConfig.GlobalConfiguration = this.$refs.globalView.model;
          break;
        case "2":
          var model = this.copyObject(this.$refs.reroutesView.model);
          model.AddHeadersToRequest = this.arrayToObj(
            model.AddHeadersToRequest
          );
          model.UpstreamHeaderTransform = this.arrayToObj(
            model.UpstreamHeaderTransform
          );
          model.DownstreamHeaderTransform = this.arrayToObj(
            model.DownstreamHeaderTransform
          );
          model.AddClaimsToRequest = this.arrayToObj(model.AddClaimsToRequest);
          model.RouteClaimsRequirement = this.arrayToObj(
            model.RouteClaimsRequirement
          );
          model.AddQueriesToRequest = this.arrayToObj(
            model.AddQueriesToRequest
          );

          ocelotConfig.ReRoutes = [model];
          break;
        case "3":
          var model = this.$refs.aggregatesView.model;
          ocelotConfig.Aggregates = [model];
          break;
        case "4":
          var model = this.$refs.dynamicView.model;
          ocelotConfig.DynamicReRoutes = [model];
          break;
      }
      this.editState = false;
      console.log(this.sectionEditViewModel);
      this.sectionEditViewModel.section.jsonString = JSON.stringify(
        ocelotConfig,
        null,
        2
      );
    },
    arrayToObj(array) {
      var result = {};
      for (var i in array) {
        result[array[i].key] = array[i].value;
      }
      return result;
    },
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  },
  components: {
    GlobalView,
    ReroutesView,
    AggregatesView,
    DynamicView
  }
};
</script>

