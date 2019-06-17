<template>
  <div>
    <Form :model="vmodel" :label-width="155" class="vue-form-label-icon">
      <FormItem label="Key">
        <Input v-model="vmodel.Key"></Input>
      </FormItem>
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="网关地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
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
            <Tooltip placement="bottom" content="原始地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
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
            <Tooltip placement="bottom" content="http或https" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
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
            <Tooltip placement="bottom" content="超时" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
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
            <Tooltip placement="bottom" content="优先级" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Priority" number></Input>
          </Col>
        </Row>
      </FormItem>

      <StringList
        class="mar10 highlight"
        title="UpstreamHttpMethod"
        tooltip="请求方式"
        :array="vmodel.UpstreamHttpMethod"
      ></StringList>
      <port-view
        class="mar10 highlight"
        title="DownstreamHostAndPorts"
        tooltip="原始服务IP和端口"
        :array="vmodel.DownstreamHostAndPorts"
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
              <Input v-model="vmodel.AuthenticationOptions.AuthenticationProviderKey"></Input>
            </Col>
          </Row>
        </FormItem>
        <StringList
          title="AllowedScopes"
          class="highlight"
          :array="vmodel.AuthenticationOptions.AllowedScopes"
        ></StringList>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">
          QoSOptions
          <Tooltip placement="bottom" content="熔断" theme="light" :delay="500">
            <Icon type="ios-information-circle"/>
          </Tooltip>
        </p>

        <FormItem label="ExceptionsAllowedBeforeBreaking">
          <Input v-model="vmodel.QoSOptions.ExceptionsAllowedBeforeBreaking" number></Input>
        </FormItem>
        <FormItem label="DurationOfBreak">
          <Input v-model="vmodel.QoSOptions.DurationOfBreak" number></Input>
        </FormItem>
        <FormItem label="TimeoutValue">
          <Input v-model="vmodel.QoSOptions.TimeoutValue" number></Input>
        </FormItem>
      </Card>

      <KeyValueEditor
        class="mar10"
        title="AddHeadersToRequest"
        :property="vmodel.AddHeadersToRequest"
        propertyName="AddHeadersToRequest"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="UpstreamHeaderTransform"
        :property="vmodel.UpstreamHeaderTransform"
        propertyName="UpstreamHeaderTransform"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="DownstreamHeaderTransform"
        :property="vmodel.DownstreamHeaderTransform"
        propertyName="DownstreamHeaderTransform"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="AddClaimsToRequest"
        :property="vmodel.AddClaimsToRequest"
        propertyName="AddClaimsToRequest"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="RouteClaimsRequirement"
        :property="vmodel.RouteClaimsRequirement"
        propertyName="RouteClaimsRequirement"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <KeyValueEditor
        class="mar10"
        title="AddQueriesToRequest"
        :property="vmodel.AddQueriesToRequest"
        propertyName="AddQueriesToRequest"
        @onPropertyChanged="onPropertyChanged"
      ></KeyValueEditor>
      <FormItem label="RequestIdKey">
        <Input v-model="vmodel.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10" dis-hover>
        <p slot="title">FileCacheOptions</p>
        <FormItem label="TtlSeconds">
          <Input v-model="vmodel.FileCacheOptions.TtlSeconds" number></Input>
        </FormItem>
        <FormItem label="Region">
          <Input v-model="vmodel.FileCacheOptions.Region"></Input>
        </FormItem>
      </Card>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="vmodel.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>

      <FormItem label="ServiceName">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="服务名(用于服务发现)" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.ServiceName"></Input>
          </Col>
        </Row>
      </FormItem>

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
        <p slot="title">RateLimitOptions</p>
        <StringList title="ClientWhitelist" :array="vmodel.RateLimitOptions.ClientWhitelist"></StringList>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="vmodel.RateLimitOptions.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="vmodel.RateLimitOptions.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="vmodel.RateLimitOptions.PeriodTimespan" number></Input>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="vmodel.RateLimitOptions.Limit" number></Input>
        </FormItem>
      </Card>

      <Card class="mar10" dis-hover>
        <p slot="title">HttpHandlerOptions</p>
        <FormItem label="AllowAutoRedirect">
          <i-switch v-model="vmodel.HttpHandlerOptions.AllowAutoRedirect"></i-switch>
        </FormItem>
        <FormItem label="UseCookieContainer">
          <i-switch v-model="vmodel.HttpHandlerOptions.UseCookieContainer"></i-switch>
        </FormItem>
        <FormItem label="UseTracing">
          <i-switch v-model="vmodel.HttpHandlerOptions.UseTracing"></i-switch>
        </FormItem>
        <FormItem label="UseProxy">
          <i-switch v-model="vmodel.HttpHandlerOptions.UseProxy"></i-switch>
        </FormItem>
      </Card>
      <FormItem label="UpstreamHost">
        <Input v-model="vmodel.UpstreamHost"></Input>
      </FormItem>

      <StringList class="mar10" title="DelegatingHandlers" :array="vmodel.DelegatingHandlers"></StringList>
      <Card dis-hover>
        <p slot="title">DangerousAcceptAnyServerCertificateValidator</p>
        <i-switch v-model="vmodel.DangerousAcceptAnyServerCertificateValidator"></i-switch>
      </Card>
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
import { modelTempl } from "../../modelTempl.js";
import KeyValueEditor from "../../common/keyvalueeditor";
import StringList from "../../common/stringlist";
import PortView from "../../common/port";

export default {
  data() {
    return {
    };
  },
  props: {
    vmodel: {}
  },
  mounted() {
  },
  methods: {
    onPropertyChanged(propVal, propertyName) {
      this.vmodel[propertyName] = propVal;
    }
  },
  watch: {
    vmodel(val) {}
  },
  components: {
    KeyValueEditor,
    StringList,
    PortView
  }
};
</script>

<style lang="less">
.mar10 {
  margin: 5px 0;
}
</style>
