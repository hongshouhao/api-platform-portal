<template>
  <div>
    <FormItem label="Key">
      <Input v-model="model.Key"></Input>
    </FormItem>
    <Form :model="model" :label-width="155" class="vue-form-label-icon">
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="网关地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.UpstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="DownstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="原始地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.DownstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="DownstreamScheme" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="http或https" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.DownstreamScheme"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Timeout">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="超时" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.Timeout" number></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Priority">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="优先级" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.Priority" number></Input>
          </Col>
        </Row>
      </FormItem>

      <char-common
        class="mar10 highlight"
        title="UpstreamHttpMethod"
        tooltip="请求方式"
        :array="model.UpstreamHttpMethod"
      ></char-common>
      <port-view
        class="mar10 highlight"
        title="DownstreamHostAndPorts"
        tooltip="原始服务IP和端口"
        :array="model.DownstreamHostAndPorts"
      ></port-view>

      <Card class="mar10 highlight" dis-hover>
        <p slot="title">
          AuthenticationOptions
          <Tooltip placement="bottom" content="授权" theme="light" :delay="500">
            <Icon type="ios-information-circle"/>
          </Tooltip>
        </p>
        <FormItem label="AuthenticationProviderKey" class="highlight">
          <Row>
            <Col span="1">
              <Tooltip placement="bottom" content="授权配置名" theme="light" :delay="500">
                <Icon type="ios-information-circle"/>
              </Tooltip>
            </Col>
            <Col span="23">
              <Input v-model="model.AuthenticationOptions.AuthenticationProviderKey"></Input>
            </Col>
          </Row>
        </FormItem>
        <char-common
          title="AllowedScopes"
          class="highlight"
          :array="model.AuthenticationOptions.AllowedScopes"
        ></char-common>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">
          QoSOptions
          <Tooltip placement="bottom" content="熔断" theme="light" :delay="500">
            <Icon type="ios-information-circle"/>
          </Tooltip>
        </p>

        <FormItem label="ExceptionsAllowedBeforeBreaking">
          <Input v-model="model.QoSOptions.ExceptionsAllowedBeforeBreaking" number></Input>
        </FormItem>
        <FormItem label="DurationOfBreak">
          <Input v-model="model.QoSOptions.DurationOfBreak" number></Input>
        </FormItem>
        <FormItem label="TimeoutValue">
          <Input v-model="model.QoSOptions.TimeoutValue" number></Input>
        </FormItem>
      </Card>

      <KeyValueCommon
        class="mar10"
        title="AddHeadersToRequest"
        :kvarray="model.AddHeadersToRequest"
      ></KeyValueCommon>
      <KeyValueCommon
        class="mar10"
        title="UpstreamHeaderTransform"
        :kvarray="model.UpstreamHeaderTransform"
      ></KeyValueCommon>
      <KeyValueCommon
        class="mar10"
        title="DownstreamHeaderTransform"
        :kvarray="model.DownstreamHeaderTransform"
      ></KeyValueCommon>
      <key-value-common
        class="mar10"
        title="AddClaimsToRequest"
        :kvarray="model.AddClaimsToRequest"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="RouteClaimsRequirement"
        :kvarray="model.RouteClaimsRequirement"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="AddQueriesToRequest"
        :kvarray="model.AddQueriesToRequest"
      ></key-value-common>
      <FormItem label="RequestIdKey">
        <Input v-model="model.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10" dis-hover>
        <p slot="title">FileCacheOptions</p>
        <FormItem label="TtlSeconds">
          <Input v-model="model.FileCacheOptions.TtlSeconds" number></Input>
        </FormItem>
        <FormItem label="Region">
          <Input v-model="model.FileCacheOptions.Region"></Input>
        </FormItem>
      </Card>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="model.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>

      <FormItem label="ServiceName">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="服务名(用于服务发现)" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.ServiceName"></Input>
          </Col>
        </Row>
      </FormItem>

      <Card class="mar10" dis-hover>
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="type">
          <Input v-model="model.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="key">
          <Input v-model="model.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="expiry">
          <Input v-model="model.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">RateLimitOptions</p>
        <char-common title="ClientWhitelist" :array="model.RateLimitOptions.ClientWhitelist"></char-common>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="model.RateLimitOptions.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="model.RateLimitOptions.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="model.RateLimitOptions.PeriodTimespan" number></Input>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="model.RateLimitOptions.Limit" number></Input>
        </FormItem>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">HttpHandlerOptions</p>
        <FormItem label="AllowAutoRedirect">
          <i-switch v-model="model.HttpHandlerOptions.AllowAutoRedirect"></i-switch>
        </FormItem>
        <FormItem label="UseCookieContainer">
          <i-switch v-model="model.HttpHandlerOptions.UseCookieContainer"></i-switch>
        </FormItem>
        <FormItem label="UseTracing">
          <i-switch v-model="model.HttpHandlerOptions.UseTracing"></i-switch>
        </FormItem>
        <FormItem label="UseProxy">
          <i-switch v-model="model.HttpHandlerOptions.UseProxy"></i-switch>
        </FormItem>
      </Card>
      <FormItem label="UpstreamHost">
        <Input v-model="model.UpstreamHost"></Input>
      </FormItem>

      <char-common class="mar10" title="DelegatingHandlers" :array="model.DelegatingHandlers"></char-common>

      <Card dis-hover>
        <p slot="title">DangerousAcceptAnyServerCertificateValidator</p>
        <i-switch v-model="model.DangerousAcceptAnyServerCertificateValidator"></i-switch>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">SecurityOptions</p>
        <char-common
          class="mar10"
          title="IpAllowedList"
          :array="model.SecurityOptions.IpAllowedList"
        ></char-common>
        <char-common
          class="mar10"
          title="IpBlockedList"
          :array="model.SecurityOptions.IpBlockedList"
        ></char-common>
      </Card>
    </Form>
  </div>
</template>

<script>
import { modelTempl } from "../../modelTempl.js";
import KeyValueCommon from "../common/keyvalue";
import CharCommon from "../common/char";
import PortView from "../common/port";

export default {
  data() {
    return {
      model: {}
    };
  },
  props: {
    jsonString: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.jsonString != "") {
      var json = eval("(" + this.jsonString + ")");
      if (json.ReRoutes.length > 0) this.transfer(json.ReRoutes[0]);
    } else {
      this.model = modelTempl.getOcelotConfigurationSchema().ReRoutes[0];
    }
  },
  methods: {
    transfer(json) {
      this.model = json;
      this.objToArray(json.AddHeadersToRequest, "AddHeadersToRequest");
      this.objToArray(json.UpstreamHeaderTransform, "UpstreamHeaderTransform");
      this.objToArray(
        json.DownstreamHeaderTransform,
        "DownstreamHeaderTransform"
      );
      this.objToArray(json.AddClaimsToRequest, "AddClaimsToRequest");
      this.objToArray(json.RouteClaimsRequirement, "RouteClaimsRequirement");
      this.objToArray(json.AddQueriesToRequest, "AddQueriesToRequest");
    },
    objToArray(obj, name) {
      this.model[name] = [];
      if (obj) {
        for (let prop in obj) {
          this.model[name].push({
            id: prop,
            key: prop,
            value: obj[prop]
          });
        }
      }
    }
  },
  components: {
    KeyValueCommon,
    CharCommon,
    PortView
  }
};
</script>

<style lang="less">
.mar10 {
  margin: 5px 0;
}
</style>
