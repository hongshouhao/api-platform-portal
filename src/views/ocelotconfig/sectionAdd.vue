<template>
  <div class="detail">
    <Form :model="sectionEditViewModel" :label-width="150">
      <Row>
        <Col span="12">
          <FormItem label="name">
            <Input v-model="sectionEditViewModel.section.name"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="enable">
            <i-switch v-model="sectionEditViewModel.section.enable" size="large">
              <span slot="open">true</span>
              <span slot="close">false</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
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
    <Divider/>选择模板版本：
    <Select v-model="templateVer" style="width:200px">
      <Option v-for="item in templateVers" :value="item" :key="item">{{item}}</Option>
    </Select>
    <Tabs value="ReRoutes" type="card" style="margin:5px 0;">
      <TabPane label="ReRoutes" name="ReRoutes">
        <Button type="primary" @click="reRoutes.push('')" style="margin:0 0 5px 0;">添加</Button>
        <Collapse>
          <template v-for="(item,index) in reRoutes">
            <Panel :name="'panel'+index">
              {{index}}
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>Change
              </a>
              <div slot="content">
                <ReRoutesView ref="reroutesView" class="content" :jsonString="item"></ReRoutesView>
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="DynamicReRoutes" name="DynamicReRoutes">
        <Button type="primary" @click="dynamic.push('')" style="margin:0 0 5px 0;">添加</Button>
        <Collapse>
          <template v-for="(item,index) in dynamic">
            <Panel :name="'panel'+index">
              {{index}}
              <div slot="content">
                <DynamicReRoutesView ref="dynamicView" class="content" :jsonString="item"></DynamicReRoutesView>
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="Aggregates" name="Aggregates">
        <Button type="primary" @click="aggregate.push('')" style="margin:0 0 5px 0;">添加</Button>
        <Collapse>
          <template v-for="(item,index) in aggregate">
            <Panel :name="'panel'+index">
              {{index}}
              <div slot="content">
                <AggregatesView ref="aggregatesView" class="content" :jsonString="item"></AggregatesView>
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
import ReRoutesView from "../ocelotconfig-template/parts/reroutes";
import DynamicReRoutesView from "../ocelotconfig-template/parts/dynamic";
import AggregatesView from "../ocelotconfig-template/parts/aggregates";

export default {
  data() {
    return {
      sectionEditViewModel: {
        section: {
          name: "",
          description: "",
          enable: false,
          createTime: "",
          modifiedTime: ""
        }
      },
      templateVer: "",
      templateVers: [],
      reRoutes: [""],
      dynamic: [""],
      aggregate: [""]
    };
  },
  mounted() {
    this.getVersions();
  },
  methods: {
    getVersions() {
      var _this = this;
      $.ajax({
        url: Env.ocelotConfig_host + "/admin/template/getall",
        type: "GET",
        success: function(data) {
          data.forEach(ele => {
            _this.templateVers.push(ele.version);
          });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(textStatus + "," + errorThrown);
        }
      });
    }
  },
  components: {
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView
  }
};
</script>

<style>
</style>
