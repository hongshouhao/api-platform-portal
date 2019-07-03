<template>
  <div class="form">
    <Form :model="vmodel" :label-width="150">
      <FormItem label="ServiceName">
        <Input v-model="vmodel.ServiceName"></Input>
      </FormItem>
      <Card dis-hover>
        <p slot="title">RateLimitRule</p>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="vmodel.RateLimitRule.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="vmodel.RateLimitRule.Limit"></Input>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="vmodel.RateLimitRule.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="vmodel.RateLimitRule.PeriodTimespan"></Input>
        </FormItem>
        <StringList
          class="mar10"
          title="ClientWhitelist"
          :array="vmodel.RateLimitRule.ClientWhitelist"
        ></StringList>
      </Card>
    </Form>
  </div>
</template>

<script>
import StringList from "../../common/stringlist";
import modelTempl from "../../modelTempl.js";

export default {
  data() {
    return {};
  },
  props: {
    vmodel: {}
  },
  mounted() {},
  methods: {},
  components: {
    StringList
  }
};
</script>

<style>
</style>
