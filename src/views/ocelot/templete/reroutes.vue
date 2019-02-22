<template>
  <div>
    <Form :model="ReRoutesForm" :label-width="150">
      <FormItem label="DownstreamPathTemplate">
        <Input v-model="ReRoutesForm.DownstreamPathTemplate"></Input>
      </FormItem>
      <FormItem label="UpstreamPathTemplate">
        <Input v-model="ReRoutesForm.UpstreamPathTemplate"></Input>
      </FormItem>
      <char-common
        class="mar10"
        title="UpstreamHttpMethod"
        :array="ReRoutesForm.UpstreamHttpMethod"
      ></char-common>
      <key-value-common
        class="mar10"
        title="AddHeadersToRequest"
        :kvarray="ReRoutesForm.AddHeadersToRequest"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="UpstreamHeaderTransform"
        :kvarray="ReRoutesForm.UpstreamHeaderTransform"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="DownstreamHeaderTransform"
        :kvarray="ReRoutesForm.DownstreamHeaderTransform"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="AddClaimsToRequest"
        :kvarray="ReRoutesForm.AddClaimsToRequest"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="RouteClaimsRequirement"
        :kvarray="ReRoutesForm.RouteClaimsRequirement"
      ></key-value-common>
      <key-value-common
        class="mar10"
        title="AddQueriesToRequest"
        :kvarray="ReRoutesForm.AddQueriesToRequest"
      ></key-value-common>
      <FormItem label="RequestIdKey">
        <Input v-model="ReRoutesForm.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">FileCacheOptions</p>
        <FormItem label="TtlSeconds">
          <Input v-model="ReRoutesForm.FileCacheOptions.TtlSeconds" number></Input>
        </FormItem>
        <FormItem label="Region">
          <Input v-model="ReRoutesForm.FileCacheOptions.Region"></Input>
        </FormItem>
      </Card>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="ReRoutesForm.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>
      <FormItem label="ServiceName">
        <Input v-model="ReRoutesForm.ServiceName"></Input>
      </FormItem>
      <FormItem label="DownstreamScheme">
        <Input v-model="ReRoutesForm.DownstreamScheme"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">QoSOptions</p>
        <FormItem label="ExceptionsAllowedBeforeBreaking">
          <Input v-model="ReRoutesForm.QoSOptions.ExceptionsAllowedBeforeBreaking" number></Input>
        </FormItem>
        <FormItem label="DurationOfBreak">
          <Input v-model="ReRoutesForm.QoSOptions.DurationOfBreak" number></Input>
        </FormItem>
        <FormItem label="TimeoutValue">
          <Input v-model="ReRoutesForm.QoSOptions.TimeoutValue" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="type">
          <Input v-model="ReRoutesForm.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="key">
          <Input v-model="ReRoutesForm.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="expiry">
          <Input v-model="ReRoutesForm.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">RateLimitOptions</p>
        <char-common title="ClientWhitelist" :array="ReRoutesForm.RateLimitOptions.ClientWhitelist"></char-common>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="ReRoutesForm.RateLimitOptions.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="ReRoutesForm.RateLimitOptions.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="ReRoutesForm.RateLimitOptions.PeriodTimespan" number></Input>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="ReRoutesForm.RateLimitOptions.Limit" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">AuthenticationOptions</p>
        <FormItem label="AuthenticationProviderKey">
          <Input v-model="ReRoutesForm.AuthenticationOptions.AuthenticationProviderKey"></Input>
        </FormItem>
        <char-common
          title="AllowedScopes"
          :array="ReRoutesForm.AuthenticationOptions.AllowedScopes"
        ></char-common>
      </Card>
      <Card class="mar10">
        <p slot="title">HttpHandlerOptions</p>
        <FormItem label="AllowAutoRedirect">
          <i-switch v-model="ReRoutesForm.HttpHandlerOptions.AllowAutoRedirect"></i-switch>
        </FormItem>
        <FormItem label="UseCookieContainer">
          <i-switch v-model="ReRoutesForm.HttpHandlerOptions.UseCookieContainer"></i-switch>
        </FormItem>
        <FormItem label="UseTracing">
          <i-switch v-model="ReRoutesForm.HttpHandlerOptions.UseTracing"></i-switch>
        </FormItem>
        <FormItem label="UseProxy">
          <i-switch v-model="ReRoutesForm.HttpHandlerOptions.UseProxy"></i-switch>
        </FormItem>
      </Card>
      <port-view
        class="mar10"
        title="DownstreamHostAndPorts"
        :array="ReRoutesForm.DownstreamHostAndPorts"
      ></port-view>
      <FormItem label="UpstreamHost">
        <Input v-model="ReRoutesForm.UpstreamHost"></Input>
      </FormItem>
      <FormItem label="Key">
        <Input v-model="ReRoutesForm.Key"></Input>
      </FormItem>
      <char-common
        class="mar10"
        title="DelegatingHandlers"
        :array="ReRoutesForm.DelegatingHandlers"
      ></char-common>
      <FormItem label="Priority">
        <Input v-model="ReRoutesForm.Priority" number></Input>
      </FormItem>
      <FormItem label="Timeout">
        <Input v-model="ReRoutesForm.Timeout" number></Input>
      </FormItem>
      <Card>
        <p slot="title">DangerousAcceptAnyServerCertificateValidator</p>
        <i-switch v-model="ReRoutesForm.DangerousAcceptAnyServerCertificateValidator"></i-switch>
      </Card>
      <Card class="mar10">
        <p slot="title">SecurityOptions</p>
        <char-common
          class="mar10"
          title="IpAllowedList"
          :array="ReRoutesForm.SecurityOptions.IpAllowedList"
        ></char-common>
        <char-common
          class="mar10"
          title="IpBlockedList"
          :array="ReRoutesForm.SecurityOptions.IpBlockedList"
        ></char-common>
      </Card>
    </Form>
  </div>
</template>

<script>
import KeyValueCommon from "../common/keyvalue";
import CharCommon from "../common/char";
import PortView from "../common/port";
export default {
  data() {
    return {
      ReRoutesForm: {
        DownstreamPathTemplate: "",
        UpstreamPathTemplate: "",
        UpstreamHttpMethod: [],
        AddHeadersToRequest: [],
        UpstreamHeaderTransform: [],
        DownstreamHeaderTransform: [],
        AddClaimsToRequest: [],
        RouteClaimsRequirement: [],
        AddQueriesToRequest: [],
        RequestIdKey: "",
        FileCacheOptions: {
          TtlSeconds: 0,
          Region: ""
        },
        ReRouteIsCaseSensitive: false,
        ServiceName: "",
        DownstreamScheme: "",
        QoSOptions: {
          ExceptionsAllowedBeforeBreaking: 0,
          DurationOfBreak: 0,
          TimeoutValue: 0
        },
        LoadBalancerOptions: {
          Type: "",
          Key: "",
          Expiry: 0
        },
        RateLimitOptions: {
          ClientWhitelist: [],
          EnableRateLimiting: false,
          Period: "",
          PeriodTimespan: 0.0,
          Limit: 0
        },
        AuthenticationOptions: {
          AuthenticationProviderKey: "",
          AllowedScopes: []
        },
        HttpHandlerOptions: {
          AllowAutoRedirect: false,
          UseCookieContainer: false,
          UseTracing: false,
          UseProxy: false
        },
        DownstreamHostAndPorts: [
          {
            Host: "",
            Port: 8001
          }
        ],
        UpstreamHost: "",
        Key: "",
        DelegatingHandlers: [],
        Priority: 0,
        Timeout: 0,
        DangerousAcceptAnyServerCertificateValidator: false,
        SecurityOptions: {
          IpAllowedList: [""],
          IpBlockedList: [""]
        }
      }
    };
  },
  props: {
    jsonString: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.jsonString) {
      var json = eval("(" + this.jsonString + ")");
      this.transfer(json.ReRoutes[0]);
      console.log(this.ReRoutesForm);
    }
  },
  methods: {
    transfer(json) {
      this.ReRoutesForm = {
        DownstreamPathTemplate: json.DownstreamPathTemplate || "",
        UpstreamPathTemplate: json.UpstreamPathTemplate || "",
        UpstreamHttpMethod: json.UpstreamHttpMethod || [],
        RequestIdKey: json.requestIdKey || "",
        FileCacheOptions: json.FileCacheOptions || {
          TtlSeconds: 0,
          Region: ""
        },
        ReRouteIsCaseSensitive: json.ReRouteIsCaseSensitive || false,
        ServiceName: json.ServiceName || "",
        DownstreamScheme: json.DownstreamScheme || "",
        QoSOptions: json.QoSOptions || {
          ExceptionsAllowedBeforeBreaking: 0,
          DurationOfBreak: 0,
          TimeoutValue: 0
        },
        LoadBalancerOptions: json.LoadBalancerOptions || {
          Type: "",
          Key: "",
          Expiry: 0
        },
        RateLimitOptions: json.RateLimitOptions || {
          ClientWhitelist: [],
          EnableRateLimiting: false,
          Period: "",
          PeriodTimespan: 0.0,
          Limit: 0
        },
        AuthenticationOptions: json.AuthenticationOptions || {
          AuthenticationProviderKey: "",
          AllowedScopes: []
        },
        HttpHandlerOptions: json.HttpHandlerOptions || {
          AllowAutoRedirect: false,
          UseCookieContainer: false,
          UseTracing: false,
          UseProxy: false
        },
        DownstreamHostAndPorts: json.DownstreamHostAndPorts || [
          {
            Host: "",
            Port: 8001
          }
        ],
        UpstreamHost: json.UpstreamHost || "",
        Key: json.Key || "",
        DelegatingHandlers: json.DelegatingHandlers || [],
        Priority: json.Priority || 0,
        Timeout: json.Timeout || 0,
        DangerousAcceptAnyServerCertificateValidator:
          json.DangerousAcceptAnyServerCertificateValidator || false,
        SecurityOptions: json.SecurityOptions || {
          IpAllowedList: [],
          IpBlockedList: []
        }
      };

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
      this.ReRoutesForm[name] = [];
      if (obj) {
        for (let prop in obj) {
          this.ReRoutesForm[name].push({
            id: prop,
            key: prop,
            value: obj[prop]
          });
        }
      } else {
        this.ReRoutesForm[name] = [];
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
