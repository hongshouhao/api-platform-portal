<template>
  <div class="form">
    <Form :model="vmodel" :label-width="150">
      <FormItem label="RequestIdKey">
        <Input v-model="vmodel.RequestIdKey"></Input>
      </FormItem>
      <Card class="mar10" dis-hover>
        <p slot="title">ServiceDiscoveryProvider</p>
        <FormItem label="Host">
          <Input v-model="vmodel.ServiceDiscoveryProvider.Host"></Input>
        </FormItem>
        <FormItem label="Port">
          <Input v-model="vmodel.ServiceDiscoveryProvider.Port" number></Input>
        </FormItem>
        <FormItem label="Type">
          <Input v-model="vmodel.ServiceDiscoveryProvider.Type"></Input>
        </FormItem>
        <FormItem label="Token">
          <Input v-model="vmodel.ServiceDiscoveryProvider.Token"></Input>
        </FormItem>
        <FormItem label="ConfigurationKey">
          <Input v-model="vmodel.ServiceDiscoveryProvider.ConfigurationKey"></Input>
        </FormItem>
        <FormItem label="PollingInterval">
          <Input v-model="vmodel.ServiceDiscoveryProvider.PollingInterval" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">RateLimitOptions</p>
        <FormItem label="ClientIdHeader">
          <Input v-model="vmodel.RateLimitOptions.ClientIdHeader"></Input>
        </FormItem>
        <FormItem label="QuotaExceededMessage">
          <Input v-model="vmodel.RateLimitOptions.QuotaExceededMessage"></Input>
        </FormItem>
        <FormItem label="RateLimitCounterPrefix">
          <Input v-model="vmodel.RateLimitOptions.RateLimitCounterPrefix"></Input>
        </FormItem>
        <FormItem label="DisableRateLimitHeaders">
          <i-switch v-model="vmodel.RateLimitOptions.DisableRateLimitHeaders"></i-switch>
        </FormItem>
        <FormItem label="HttpStatusCode">
          <Input v-model="vmodel.RateLimitOptions.HttpStatusCode" number></Input>
        </FormItem>
      </Card>
      <Card class="mar10" dis-hover>
        <p slot="title">QoSOptions</p>
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
      <FormItem label="BaseUrl">
        <Input v-model="vmodel.BaseUrl"></Input>
      </FormItem>
      <Card class="mar10" dis-hover>
        <p slot="title">LoadBalancerOptions</p>
        <FormItem label="Type">
          <Input v-model="vmodel.LoadBalancerOptions.Type"></Input>
        </FormItem>
        <FormItem label="Key">
          <Input v-model="vmodel.LoadBalancerOptions.Key"></Input>
        </FormItem>
        <FormItem label="Expiry">
          <Input v-model="vmodel.LoadBalancerOptions.Expiry" number></Input>
        </FormItem>
      </Card>
      <FormItem label="DownstreamScheme">
        <Input v-model="vmodel.DownstreamScheme"></Input>
      </FormItem>
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
    </Form>
  </div>
</template>

<script>
import modelTempl from "../../modelTempl.js";

export default {
  data() {
    return {};
  },
  props: {
    vmodel: {}
  },
  mounted() {},
  methods: {}
};
</script>

