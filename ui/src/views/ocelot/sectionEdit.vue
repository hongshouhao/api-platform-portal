<template>
  <div>
    <Form :model="vsection" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem label="name">
            <Input v-model="vsection.name"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="enable">
            <i-switch v-model="vsection.enable" size="large">
              <span slot="open">true</span>
              <span slot="close">false</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="description">
        <Input v-model="vsection.description"></Input>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="createTime">
            <Input v-model="vsection.createTime" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="modifiedTime">
            <Input v-model="vsection.modifiedTime" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider/>
    <span>选择模板</span>
    <Select
      v-model="sltedTempl"
      @on-open-change="loadTempls"
      :disabled="forUpdate==true"
      :loading="loadingTempl"
      style="width:200px"
    >
      <Option
        v-for="(item, index) in templates"
        :value="item.jsonString"
        :key="index"
      >{{item.version}}</Option>
    </Select>
    <Tabs value="ReRoute" @on-click="tabChanged" style="margin:5px 0;">
      <Button
        type="primary"
        slot="extra"
        icon="md-add" 
        @click="addConfigItem"
        style="margin:0 0 5px 0;"
      >{{configType}}</Button>
      <TabPane label="ReRoutes" name="ReRoute">
        <Collapse v-model="slctedReRoutePanel" accordion>
          <template v-for="(item,index) in vconfig.ReRoutes">
            <Panel :key="'reRoute'+index.toString()" :name="'reRoute'+index.toString()">
              {{item.DownstreamPathTemplate}}
              <div slot="content">
                <ReRoutesView class="content" :vmodel="item"></ReRoutesView>
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="DynamicReRoutes" name="DynamicReRoute">
        <Collapse v-model="slctedDynamicReRoutePanel" accordion>
          <template v-for="(item,index) in vconfig.DynamicReRoutes">
            <Panel
              :key="'dynamicReRoute'+index.toString()"
              :name="'dynamicReRoute'+index.toString()"
            >
              {{item.ServiceName}}
              <div slot="content">
                <DynamicReRoutesView class="content" :vmodel="item"></DynamicReRoutesView>
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="Aggregates" name="Aggregate">
        <Collapse v-model="slctedAggregatePanel" accordion>
          <template v-for="(item,index) in vconfig.Aggregates">
            <Panel :key="'aggregate'+index.toString()" :name="'aggregate'+index.toString()">
              {{item.UpstreamPathTemplate}}
              <div slot="content">
                <AggregatesView class="content" :vmodel="item"></AggregatesView>
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Env } from "../../lib/env";
import { Ocelot } from "../../lib/ocelot";
import ReRoutesView from "./parts/reroutes";
import DynamicReRoutesView from "./parts/dynamic";
import AggregatesView from "./parts/aggregates";
import { modelTempl } from "../modelTempl";

export default {
  data() {
    return {
      vsection: {
        name: "",
        description: "",
        enable: false,
        createTime: "",
        modifiedTime: "",
        jsonString: ""
      },
      vconfig: modelTempl.getOcelotConfigurationSchema(),
      configType: "ReRoute",
      sltedTempl: "",
      slctedReRoutePanel: "",
      slctedAggregatePanel: "",
      slctedDynamicReRoutePanel: "",
      templates: [],
      loadingTempl: false
    };
  },
  props: {
    section: {},
    forUpdate: false
  },
  mounted() {},
  watch: {
    section() {
      var _this = this;
      _this.vsection = _this.section;
      if (_this.vsection.jsonString) {
        _this.vconfig = JSON.parse(_this.vsection.jsonString);
      }
      if (_this.forUpdate === false) {
        _this.vconfig.ReRoutes = new Array();
        _this.vconfig.DynamicReRoutes = new Array();
        _this.vconfig.Aggregates = new Array();
      }
    },
    vconfig: {
      handler(val, oldVal) {
        this.vsection.jsonString = JSON.stringify(val);
      },
      deep: true
    }
  },
  methods: {
    tabChanged(name) {
      this.configType = name;
    },
    addConfigItem() {
      var templ = {};
      if (this.sltedTempl) {
        templ = JSON.parse(this.sltedTempl);
      } else {
        templ = modelTempl.getOcelotConfigurationSchema();
      }
      switch (this.configType) {
        case "ReRoute":
          this.vconfig.ReRoutes.push(
            JSON.parse(JSON.stringify(templ.ReRoutes[0]))
          );
          this.slctedReRoutePanel =
            "reRoute" + (this.vconfig.ReRoutes.length - 1).toString();
          break;
        case "DynamicReRoute":
          this.vconfig.DynamicReRoutes.push(
            JSON.parse(JSON.stringify(templ.DynamicReRoutes[0]))
          );
          this.slctedDynamicReRoutePanel =
            "dynamicReRoute" +
            (this.vconfig.DynamicReRoutes.length - 1).toString();
          break;
        case "Aggregate":
          this.vconfig.Aggregates.push(
            JSON.parse(JSON.stringify(templ.Aggregates[0]))
          );
          this.slctedAggregatePanel =
            "aggregate" + (this.vconfig.Aggregates.length - 1).toString();
          break;
      }
    },
    loadTempls(open) {
      if (open === true) {
        var _this = this;
        _this.loadingTempl = true;
        _this.$axios
          .get(Env.ocelotConfig_host + "/admin/template/getall")
          .then(function(response) {
            _this.loadingTempl = false;
            _this.templates = response.data;
          });
      }
    }
  },
  components: {
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView
  }
};
</script>
