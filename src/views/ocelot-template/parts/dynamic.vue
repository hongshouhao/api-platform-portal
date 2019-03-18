<template>
  <div class="form">
    <Form :model="model" :label-width="150">
      <FormItem label="ServiceName">
        <Input v-model="model.ServiceName"></Input>
      </FormItem>
      <Card>
        <p slot="title">RateLimitRule</p>
        <char-common
          class="mar10"
          title="ClientWhitelist"
          :array="model.RateLimitRule.ClientWhitelist"
        ></char-common>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="model.RateLimitRule.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="model.RateLimitRule.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="model.RateLimitRule.PeriodTimespan"></Input>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="model.RateLimitRule.Limit"></Input>
        </FormItem>
      </Card>
    </Form>
  </div>
</template>

<script>
import CharCommon from "../common/char";
import { modelTempl } from "../../modelTempl.js";

export default {
  data() {
    return {
      model: modelTempl.getOcelotConfigurationSchema().DynamicReRoutes[0]
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
      if (json.DynamicReRoutes.length > 0) this.model = json.DynamicReRoutes[0];
    }
  },
  methods: {},
  components: {
    CharCommon
  }
};
</script>

<style>
</style>
