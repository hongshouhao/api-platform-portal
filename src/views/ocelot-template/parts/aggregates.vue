<template>
  <div class="form">
    <Form :model="model" :label-width="150">
      <char-common class="mar10" title="ReRouteKeys" :array="model.DelegatingHandlers"></char-common>
      <FormItem label="UpstreamPathTemplate">
        <Input v-model="model.UpstreamPathTemplate"></Input>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Input v-model="model.UpstreamHost"></Input>
      </FormItem>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="model.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>
      <FormItem label="Aggregator">
        <Input v-model="model.Aggregator"></Input>
      </FormItem>
      <char-common class="mar10" title="UpstreamHttpMethod" :array="model.UpstreamHttpMethod"></char-common>
      <FormItem label="Priority">
        <Input v-model="model.Priority" :number="true"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import CharCommon from "../common/char";
import { modelTempl } from "../../modelTempl.js";

export default {
  data() {
    return {
      model: modelTempl.getOcelotConfigurationSchema().Aggregates[0]
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
      if (json.Aggregates.length > 0) this.model = json.Aggregates[0];
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
