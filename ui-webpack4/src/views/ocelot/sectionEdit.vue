<template>
  <div>
    <Form :model="vsection"
          :label-width="100">
      <Row>
        <Col span="12">
        <FormItem label="name">
          <Input v-model="vsection.name"></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="enable">
          <i-switch v-model="vsection.enable"
                    size="large">
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
          <Input v-model="vsection.createTime"
                 readonly></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="modifiedTime">
          <Input v-model="vsection.modifiedTime"
                 readonly></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider />

    <Tabs :value="defaultTab"
          @on-click="tabChanged"
          style="margin:5px 0;">
      <Select placeholder="模板"
              slot="extra"
              v-model="sltedTempl"
              @on-change="sltedTemplChanged"
              @on-open-change="loadTempls"
              :loading="loadingTempl"
              style="width:150px;margin:0 10px 5px 0">
        <Option v-for="(item, index) in templates"
                :value="item.jsonString"
                :key="index">{{item.version}}</Option>
      </Select>
      <Button type="primary"
              slot="extra"
              icon="md-add"
              v-if="!vsection.isGlobal"
              @click="addConfigItem"
              style="margin:0 0 5px 0;">{{configType}}</Button>
      <TabPane label="Global"
               v-if="vsection.isGlobal"
               name="Global">
        <GlobalConfigView class="content"
                          :vmodel="vconfig.GlobalConfiguration"></GlobalConfigView>
      </TabPane>
      <TabPane label="ReRoutes"
               v-if="!vsection.isGlobal"
               name="ReRoute">
        <Collapse v-model="slctedReRoutePanel"
                  accordion>
          <template v-for="(item,index) in vconfig.ReRoutes">
            <Panel :key="'reRoute'+index.toString()"
                   :name="'reRoute'+index.toString()">
              {{item.DownstreamPathTemplate}}
              <div slot="content">
                <ReRoutesView class="content"
                              :vmodel="item"></ReRoutesView>
              </div>
              <div style="width:30px;float:right;margin-right:18px;"
                   align="center"
                   @click="removeReRoute($event, index)">
                <Icon type="md-trash"
                      size="18" />
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="DynamicReRoutes"
               v-if="!vsection.isGlobal"
               name="DynamicReRoute">
        <Collapse v-model="slctedDynamicReRoutePanel"
                  accordion>
          <template v-for="(item,index) in vconfig.DynamicReRoutes">
            <Panel :key="'dynamicReRoute'+index.toString()"
                   :name="'dynamicReRoute'+index.toString()">
              {{item.ServiceName}}
              <div slot="content">
                <DynamicReRoutesView class="content"
                                     :vmodel="item"></DynamicReRoutesView>
              </div>
              <div style="width:30px;float:right;margin-right:18px;"
                   align="center"
                   @click="removeDynamicReRoute($event, index)">
                <Icon type="md-trash"
                      size="18" />
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
      <TabPane label="Aggregates"
               v-if="!vsection.isGlobal"
               name="Aggregate">
        <Collapse v-model="slctedAggregatePanel"
                  accordion>
          <template v-for="(item,index) in vconfig.Aggregates">
            <Panel :key="'aggregate'+index.toString()"
                   :name="'aggregate'+index.toString()">
              {{item.UpstreamPathTemplate}}
              <div slot="content">
                <AggregatesView class="content"
                                :vmodel="item"></AggregatesView>
              </div>
              <div style="width:30px;float:right;margin-right:18px;"
                   align="center"
                   @click="removeAggregateItem($event, index)">
                <Icon type="md-trash"
                      size="18" />
              </div>
            </Panel>
          </template>
        </Collapse>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import env from '../../global'
import modelTempl from '../modelTempl'
import GlobalConfigView from './parts/global'
import ReRoutesView from './parts/reroutes'
import DynamicReRoutesView from './parts/dynamic'
import AggregatesView from './parts/aggregates'

export default {
  data () {
    return {
      vsection: {
        type: Object,
        default () {
          return modelTempl.getOcelotConfigSection()
        }
      },
      vconfig: {
        type: Object,
        default () {
          return modelTempl.getOcelotConfigurationSchema()
        }
      },
      configType: 'ReRoute',
      sltedTempl: '',
      slctedReRoutePanel: '',
      slctedAggregatePanel: '',
      slctedDynamicReRoutePanel: '',
      templates: [],
      loadingTempl: false
    }
  },
  props: {
    section: {
      type: Object,
      default () { return {} }
    },
    forUpdate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultTab: {
      get () {
        return this.vsection.isGlobal ? "Global" : "ReRoute";
      }
    }
  },
  mounted () { },
  watch: {
    section () {
      var _this = this
      _this.vsection = _this.section

      if (_this.vsection.jsonString) {
        _this.vconfig = JSON.parse(_this.vsection.jsonString)
      }
      if (_this.vsection.isGlobal) {
        if (_this.vconfig.GlobalConfiguration === undefined) {
          _this.vconfig.GlobalConfiguration = modelTempl.getOcelotConfigurationSchema().GlobalConfiguration
        }
      }
      else {
        if (_this.forUpdate === false) {
          _this.vconfig.ReRoutes = []
          _this.vconfig.DynamicReRoutes = []
          _this.vconfig.Aggregates = []
        }
      }
    },
    vconfig: {
      handler (val) {
        var _this = this
        if (_this.vsection.isGlobal) {
          delete val.ReRoutes
          delete val.DynamicReRoutes
          delete val.Aggregates
        }
        else {
          delete val.GlobalConfiguration
        }

        this.vsection.jsonString = JSON.stringify(val)
      },
      deep: true
    }
  },
  methods: {
    tabChanged (name) {
      this.configType = name
    },
    sltedTemplChanged () {
      if (this.vsection.isGlobal) {
        this.vconfig.GlobalConfiguration = JSON.parse(this.sltedTempl).GlobalConfiguration
      }
    },
    addConfigItem () {
      var templ = {}
      if (this.sltedTempl) {
        templ = JSON.parse(this.sltedTempl)
      } else {
        templ = modelTempl.getOcelotConfigurationSchema()
      }
      switch (this.configType) {
        case 'ReRoute':
          this.vconfig.ReRoutes.push(
            JSON.parse(JSON.stringify(templ.ReRoutes[0]))
          )
          this.slctedReRoutePanel =
            'reRoute' + (this.vconfig.ReRoutes.length - 1).toString()
          break
        case 'DynamicReRoute':
          this.vconfig.DynamicReRoutes.push(
            JSON.parse(JSON.stringify(templ.DynamicReRoutes[0]))
          )
          this.slctedDynamicReRoutePanel =
            'dynamicReRoute' +
            (this.vconfig.DynamicReRoutes.length - 1).toString()
          break
        case 'Aggregate':
          this.vconfig.Aggregates.push(
            JSON.parse(JSON.stringify(templ.Aggregates[0]))
          )
          this.slctedAggregatePanel =
            'aggregate' + (this.vconfig.Aggregates.length - 1).toString()
          break
      }
    },
    loadTempls (open) {
      if (open === true) {
        var _this = this
        _this.loadingTempl = true
        _this.$axios
          .get(env.ocelotAdmin_host + '/admin/template/getall')
          .then(function (response) {
            _this.loadingTempl = false
            _this.templates = response.data
          })
      }
    },
    removeReRoute (ev, index) {
      ev.cancelBubble = true
      this.vconfig.ReRoutes.splice(index, 1)
    },
    removeDynamicReRoute (ev, index) {
      ev.cancelBubble = true
      this.vconfig.DynamicReRoutes.splice(index, 1)
    },
    removeAggregateItem (ev, index) {
      ev.cancelBubble = true
      this.vconfig.Aggregates.splice(index, 1)
    }
  },
  components: {
    GlobalConfigView,
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView
  }
}
</script>
