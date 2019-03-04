<template>
  <div class="form">
    <Form :model="DynamicForm" :label-width="150">
      <FormItem label="ServiceName">
        <Input v-model="DynamicForm.ServiceName"></Input>
      </FormItem>
      <Card>
        <p slot="title">RateLimitRule</p>
        <char-common
          class="mar10"
          title="ClientWhitelist"
          :array="DynamicForm.RateLimitRule.ClientWhitelist"
        ></char-common>
        <FormItem label="EnableRateLimiting">
          <i-switch v-model="DynamicForm.RateLimitRule.EnableRateLimiting"></i-switch>
        </FormItem>
        <FormItem label="Period">
          <Input v-model="DynamicForm.RateLimitRule.Period"></Input>
        </FormItem>
        <FormItem label="PeriodTimespan">
          <Input v-model="DynamicForm.RateLimitRule.PeriodTimespan"></Input>
        </FormItem>
        <FormItem label="Limit">
          <Input v-model="DynamicForm.RateLimitRule.Limit"></Input>
        </FormItem>
      </Card>
    </Form>
  </div>
</template>

<script>
import CharCommon from "../common/char";
export default {
  data() {
    return {
      DynamicForm: {
        ServiceName: "",
        RateLimitRule: {
          ClientWhitelist: [],
          EnableRateLimiting: false,
          Period: "",
          PeriodTimespan: 0,
          Limit: 0
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
      if (json.DynamicReRoutes.length > 0)
        this.transfer(json.DynamicReRoutes[0]);
    }
  },
  methods: {
    transfer(json) {
      this.DynamicForm = {
        ServiceName: json.ServiceName || "",
        RateLimitRule: json.RateLimitRule || {
          ClientWhitelist: json.RateLimitRule.ClientWhitelist || [],
          EnableRateLimiting: json.RateLimitRule.EnableRateLimiting || false,
          Period: json.RateLimitRule.Period || "",
          PeriodTimespan: json.RateLimitRule.PeriodTimespan || 0,
          Limit: json.RateLimitRule.Limit || 0
        }
      };
    }
  },
  components: {
    CharCommon
  }
};
</script>

<style>
</style>
