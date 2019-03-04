<template>
  <div class="form">
    <Form :model="GlobalForm" :label-width="150">
      <FormItem label="RequestIdKey">
        <Input v-model="GlobalForm.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">ServiceDiscoveryProvider</p>
        <FormItem label="Host">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.Host"></Input>
        </FormItem>
        <FormItem label="Port">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.Port" number></Input>
        </FormItem>
        <FormItem label="Type">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.Type"></Input>
        </FormItem>
        <FormItem label="Token">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.Token"></Input>
        </FormItem>
        <FormItem label="ConfigurationKey">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.ConfigurationKey"></Input>
        </FormItem>
        <FormItem label="PollingInterval">
          <Input v-model="GlobalForm.ServiceDiscoveryProvider.PollingInterval" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">RateLimitOptions</p>
        <FormItem label="ClientIdHeader">
          <Input v-model="GlobalForm.RateLimitOptions.ClientIdHeader"></Input>
        </FormItem>
        <FormItem label="QuotaExceededMessage">
          <Input v-model="GlobalForm.RateLimitOptions.QuotaExceededMessage"></Input>
        </FormItem>
        <FormItem label="RateLimitCounterPrefix">
          <Input v-model="GlobalForm.RateLimitOptions.RateLimitCounterPrefix"></Input>
        </FormItem>
        <FormItem label="DisableRateLimitHeaders">
          <i-switch v-model="GlobalForm.RateLimitOptions.DisableRateLimitHeaders"></i-switch>
        </FormItem>
        <FormItem label="HttpStatusCode">
          <Input v-model="GlobalForm.RateLimitOptions.HttpStatusCode" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">QoSOptions</p>
        <FormItem label="ExceptionsAllowedBeforeBreaking">
          <Input v-model="GlobalForm.QoSOptions.ExceptionsAllowedBeforeBreaking" number></Input>
        </FormItem>
        <FormItem label="DurationOfBreak">
          <Input v-model="GlobalForm.QoSOptions.DurationOfBreak" number></Input>
        </FormItem>
        <FormItem label="TimeoutValue">
          <Input v-model="GlobalForm.QoSOptions.TimeoutValue" number></Input>
        </FormItem>
      </Card>
      <FormItem label="BaseUrl">
        <Input v-model="GlobalForm.BaseUrl"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="Type">
          <Input v-model="GlobalForm.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="Key">
          <Input v-model="GlobalForm.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="Expiry">
          <Input v-model="GlobalForm.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <FormItem label="DownstreamScheme">
        <Input v-model="GlobalForm.DownstreamScheme"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">HttpHandlerOptions</p>
        <FormItem label="AllowAutoRedirect">
          <i-switch v-model="GlobalForm.HttpHandlerOptions.AllowAutoRedirect"></i-switch>
        </FormItem>
        <FormItem label="UseCookieContainer">
          <i-switch v-model="GlobalForm.HttpHandlerOptions.UseCookieContainer"></i-switch>
        </FormItem>
        <FormItem label="UseTracing">
          <i-switch v-model="GlobalForm.HttpHandlerOptions.UseTracing"></i-switch>
        </FormItem>
        <FormItem label="UseProxy">
          <i-switch v-model="GlobalForm.HttpHandlerOptions.UseProxy"></i-switch>
        </FormItem>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GlobalForm: {
        RequestIdKey: "",
        ServiceDiscoveryProvider: {
          Host: "",
          Port: 0,
          Type: "",
          Token: "",
          ConfigurationKey: "",
          PollingInterval: 0
        },
        RateLimitOptions: {
          ClientIdHeader: "",
          QuotaExceededMessage: "",
          RateLimitCounterPrefix: "",
          DisableRateLimitHeaders: false,
          HttpStatusCode: 0
        },
        QoSOptions: {
          ExceptionsAllowedBeforeBreaking: 0,
          DurationOfBreak: 0,
          TimeoutValue: 0
        },
        BaseUrl: "",
        LoadBalancerOptions: {
          Type: "",
          Key: "",
          Expiry: 0
        },
        DownstreamScheme: "",
        HttpHandlerOptions: {
          AllowAutoRedirect: false,
          UseCookieContainer: false,
          UseTracing: false,
          UseProxy: false
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
      this.transfer(json.GlobalConfiguration);
    }
  },
  methods: {
    transfer(json) {
      this.GlobalForm = {
        RequestIdKey: json.RequestIdKey || "",
        ServiceDiscoveryProvider: json.ServiceDiscoveryProvider || {
          Host: "",
          Port: 0,
          Type: "",
          Token: "",
          ConfigurationKey: "",
          PollingInterval: 0
        },
        RateLimitOptions: json.RateLimitOptions || {
          ClientIdHeader: "",
          QuotaExceededMessage: "",
          RateLimitCounterPrefix: "",
          DisableRateLimitHeaders: false,
          HttpStatusCode: 0
        },
        QoSOptions: json.QoSOptions || {
          ExceptionsAllowedBeforeBreaking: 0,
          DurationOfBreak: 0,
          TimeoutValue: 0
        },
        BaseUrl: json.BaseUrl || "",
        LoadBalancerOptions: json.LoadBalancerOptions || {
          Type: "",
          Key: "",
          Expiry: 0
        },
        DownstreamScheme: json.DownstreamScheme || "",
        HttpHandlerOptions: json.HttpHandlerOptions || {
          AllowAutoRedirect: false,
          UseCookieContainer: false,
          UseTracing: false,
          UseProxy: false
        }
      };
    }
  }
};
</script>

<style>
</style>
