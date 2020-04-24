<template>
  <div>
    <Form :model="vmodel" :label-width="155" class="vue-form-label-icon">
      <FormItem label="Key">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="属性名(用于服务聚合时)"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Key" />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="ServiceName">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="服务名(用于服务发现)"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.ServiceName"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="网关地址"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.UpstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="DownstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="原始地址"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.DownstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="DownstreamScheme" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="http或https"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.DownstreamScheme"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Timeout">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="超时"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Timeout" number></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Priority">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="优先级"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Priority" number></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Input v-model="vmodel.UpstreamHost"></Input>
      </FormItem>
      <FormItem label="RequestIdKey">
        <Input v-model="vmodel.RequestIdKey"></Input>
      </FormItem>
      <Row>
        <Col span="8">
          <FormItem label="ReRouteIsCaseSensitive">
            <i-switch v-model="vmodel.ReRouteIsCaseSensitive"></i-switch>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="DangerousAcceptAnyServerCertificateValidator"
            :label-width="300"
          >
            <i-switch
              v-model="vmodel.DangerousAcceptAnyServerCertificateValidator"
            ></i-switch>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="UpstreamHttpMethod" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip
              placement="right"
              content="请求方式"
              theme="light"
              :delay="500"
            >
              <Icon type="ios-information-circle" />
            </Tooltip>
          </Col>
          <Col span="23">
            <HttpMethodEditor
              :httpMethods.sync="vmodel.UpstreamHttpMethod"
            ></HttpMethodEditor>
          </Col>
        </Row>
      </FormItem>

      <port-view
        class="mar10 highlight"
        title="DownstreamHostAndPorts"
        tooltip="原始服务IP和端口"
        :hosts="vmodel.DownstreamHostAndPorts"
      ></port-view>

      <Card class="mar10 highlight" dis-hover>
        <p slot="title">
          AuthenticationOptions
          <Tooltip placement="right" content="授权" theme="light" :delay="500">
            <Icon type="ios-information-circle" />
          </Tooltip>
        </p>
        <FormItem label="AuthenticationProviderKey" class="highlight">
          <Row>
            <Col span="1">
              <Tooltip
                placement="right"
                content="授权方案"
                theme="light"
                :delay="500"
              >
                <Icon type="ios-information-circle" />
              </Tooltip>
            </Col>
            <Col span="23">
              <Select
                clearable
                v-model="vmodel.AuthenticationOptions.AuthenticationProviderKey"
                :loading="loadingAuthOptions"
              >
                <Option
                  v-for="(item, index) in options"
                  :value="item.AuthScheme"
                  :key="index"
                  >{{ item.AuthScheme }}</Option
                >
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="AllowedScopes" class="highlight">
          <Row>
            <Col span="1">
              <Tooltip
                placement="right"
                content="权限范围"
                theme="light"
                :delay="500"
              >
                <Icon type="ios-information-circle" />
              </Tooltip>
            </Col>
            <Col span="23">
              <ScopeEditor
                :idsHost="url"
                :scopes.sync="vmodel.AuthenticationOptions.AllowedScopes"
              ></ScopeEditor>
            </Col>
          </Row>
        </FormItem>
      </Card>
      <ClaimEditor
        class="mar10"
        title="RouteClaimsRequirement"
        :property.sync="vmodel.RouteClaimsRequirement"
        :idsHost="url"
      ></ClaimEditor>
      <KeyValueEditor
        class="mar10"
        title="UpstreamHeaderTransform"
        :property.sync="vmodel.UpstreamHeaderTransform"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="DownstreamHeaderTransform"
        :property.sync="vmodel.DownstreamHeaderTransform"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="AddHeadersToRequest"
        :property.sync="vmodel.AddHeadersToRequest"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="AddClaimsToRequest"
        :property.sync="vmodel.AddClaimsToRequest"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="AddQueriesToRequest"
        :property.sync="vmodel.AddQueriesToRequest"
      ></KeyValueEditor>
      <Card class="mar10" dis-hover>
        <p slot="title">FileCacheOptions</p>
        <FormItem label="TtlSeconds">
          <Input v-model="vmodel.FileCacheOptions.TtlSeconds" number></Input>
        </FormItem>
        <FormItem label="Region">
          <Input v-model="vmodel.FileCacheOptions.Region"></Input>
        </FormItem>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="type">
          <Input v-model="vmodel.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="key">
          <Input v-model="vmodel.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="expiry">
          <Input v-model="vmodel.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">
          QoSOptions
          <Tooltip placement="right" content="熔断" theme="light" :delay="500">
            <Icon type="ios-information-circle" />
          </Tooltip>
        </p>

        <FormItem label="ExceptionsAllowedBeforeBreaking" :label-width="200">
          <Input
            v-model="vmodel.QoSOptions.ExceptionsAllowedBeforeBreaking"
            number
          ></Input>
        </FormItem>
        <FormItem label="DurationOfBreak" :label-width="200">
          <Input v-model="vmodel.QoSOptions.DurationOfBreak" number></Input>
        </FormItem>
        <FormItem label="TimeoutValue" :label-width="200">
          <Input v-model="vmodel.QoSOptions.TimeoutValue" number></Input>
        </FormItem>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">RateLimitOptions</p>
        <Row>
          <Col span="10">
            <FormItem label="EnableRateLimiting">
              <i-switch
                v-model="vmodel.RateLimitOptions.EnableRateLimiting"
              ></i-switch>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Limit">
              <Input v-model="vmodel.RateLimitOptions.Limit" number></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
            <FormItem label="Period">
              <Input v-model="vmodel.RateLimitOptions.Period"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="PeriodTimespan">
              <Input
                v-model="vmodel.RateLimitOptions.PeriodTimespan"
                number
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <StringList
          title="ClientWhitelist"
          :array="vmodel.RateLimitOptions.ClientWhitelist"
        ></StringList>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">HttpHandlerOptions</p>
        <Row>
          <Col span="6">
            <FormItem label="AllowAutoRedirect">
              <i-switch
                v-model="vmodel.HttpHandlerOptions.AllowAutoRedirect"
              ></i-switch>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="UseCookieContainer">
              <i-switch
                v-model="vmodel.HttpHandlerOptions.UseCookieContainer"
              ></i-switch>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="UseTracing">
              <i-switch
                v-model="vmodel.HttpHandlerOptions.UseTracing"
              ></i-switch>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="UseProxy">
              <i-switch v-model="vmodel.HttpHandlerOptions.UseProxy"></i-switch>
            </FormItem>
          </Col>
        </Row>
      </Card>

      <StringList
        class="mar10"
        title="DelegatingHandlers"
        :array="vmodel.DelegatingHandlers"
      ></StringList>

      <Card class="mar10" dis-hover>
        <p slot="title">SecurityOptions</p>
        <StringList
          class="mar10"
          title="IpAllowedList"
          :array="vmodel.SecurityOptions.IpAllowedList"
        ></StringList>
        <StringList
          class="mar10"
          title="IpBlockedList"
          :array="vmodel.SecurityOptions.IpBlockedList"
        ></StringList>
      </Card>
    </Form>
  </div>
</template>

<script>
import config from '../../../config'
import KeyValueEditor from '../../common/keyvalueeditor'
import HttpMethodEditor from '../../common/httpmethodeditor'
import StringList from '../../common/stringlist'
import PortView from '../../common/port'
import ClaimEditor from './claimeditor'
import ScopeEditor from './scopeseditor'
var Enumerable = require('linq')

export default {
  data() {
    return {
      loadingAuthOptions: false,
      options: []
    }
  },
  props: {
    vmodel: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.loadAuthOptions()
  },
  methods: {
    // onPropertyChanged (propVal, propertyName) {
    //   this.vmodel[propertyName] = propVal
    // },
    loadAuthOptions() {
      var _this = this
      _this.loadingAuthOptions = true
      _this.$axios
        .get(config.ocelot.adminApiBaseURL + '/admin/authoptions/getall')
        .then(function(response) {
          _this.loadingAuthOptions = false
          _this.options = response.data.map(op => {
            return JSON.parse(op.jsonString)
          })
        })
    }
  },
  computed: {
    url: {
      get() {
        var _this = this
        var slted = Enumerable.from(_this.options).firstOrDefault(
          s =>
            s.AuthScheme ===
            _this.vmodel.AuthenticationOptions.AuthenticationProviderKey
        )
        if (slted) {
          return slted.Authority
        } else {
          return null
        }
      }
    }
  },
  components: {
    KeyValueEditor,
    StringList,
    PortView,
    ClaimEditor,
    ScopeEditor,
    HttpMethodEditor
  }
}
</script>

<style lang="less">
.mar10 {
  margin: 5px 0;
}
</style>
