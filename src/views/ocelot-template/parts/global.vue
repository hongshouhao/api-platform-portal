<template>
  <div class="form">
    <Form :model="model" :label-width="150">
      <FormItem label="RequestIdKey">
        <Input v-model="model.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">ServiceDiscoveryProvider</p>
        <FormItem label="Host">
          <Input v-model="model.ServiceDiscoveryProvider.Host"></Input>
        </FormItem>
        <FormItem label="Port">
          <Input v-model="model.ServiceDiscoveryProvider.Port" number></Input>
        </FormItem>
        <FormItem label="Type">
          <Input v-model="model.ServiceDiscoveryProvider.Type"></Input>
        </FormItem>
        <FormItem label="Token">
          <Input v-model="model.ServiceDiscoveryProvider.Token"></Input>
        </FormItem>
        <FormItem label="ConfigurationKey">
          <Input v-model="model.ServiceDiscoveryProvider.ConfigurationKey"></Input>
        </FormItem>
        <FormItem label="PollingInterval">
          <Input v-model="model.ServiceDiscoveryProvider.PollingInterval" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">RateLimitOptions</p>
        <FormItem label="ClientIdHeader">
          <Input v-model="model.RateLimitOptions.ClientIdHeader"></Input>
        </FormItem>
        <FormItem label="QuotaExceededMessage">
          <Input v-model="model.RateLimitOptions.QuotaExceededMessage"></Input>
        </FormItem>
        <FormItem label="RateLimitCounterPrefix">
          <Input v-model="model.RateLimitOptions.RateLimitCounterPrefix"></Input>
        </FormItem>
        <FormItem label="DisableRateLimitHeaders">
          <i-switch v-model="model.RateLimitOptions.DisableRateLimitHeaders"></i-switch>
        </FormItem>
        <FormItem label="HttpStatusCode">
          <Input v-model="model.RateLimitOptions.HttpStatusCode" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10">
        <p slot="title">QoSOptions</p>
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
      <FormItem label="BaseUrl">
        <Input v-model="model.BaseUrl"></Input>
      </FormItem>
      <Card class="mar10">
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="Type">
          <Input v-model="model.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="Key">
          <Input v-model="model.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="Expiry">
          <Input v-model="model.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <FormItem label="DownstreamScheme">
        <Input v-model="model.DownstreamScheme"></Input>
      </FormItem>
      <Card class="mar10">
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
    </Form>
  </div>
</template>

<script>
import { modelTempl } from "../../modelTempl.js";

export default {
  data() {
    return {
      model: modelTempl.getOcelotConfigurationSchema().GlobalConfiguration
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
      this.model = json.GlobalConfiguration;
    }
  },
  methods: {}
};
</script>

<style>
</style>
