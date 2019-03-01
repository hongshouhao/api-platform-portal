<template>
  <div class="form">
    <Form :model="AggregatesForm" :label-width="150">
      <char-common class="mar10" title="ReRouteKeys" :array="AggregatesForm.DelegatingHandlers"></char-common>
      <FormItem label="UpstreamPathTemplate">
        <Input v-model="AggregatesForm.UpstreamPathTemplate"></Input>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Input v-model="AggregatesForm.UpstreamHost"></Input>
      </FormItem>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="AggregatesForm.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>
      <FormItem label="Aggregator">
        <Input v-model="AggregatesForm.Aggregator"></Input>
      </FormItem>
      <char-common
        class="mar10"
        title="UpstreamHttpMethod"
        :array="AggregatesForm.UpstreamHttpMethod"
      ></char-common>
      <FormItem label="Priority">
        <Input v-model="AggregatesForm.Priority" :number="true"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import CharCommon from "../common/char";
export default {
  data() {
    return {
      AggregatesForm: {
        DelegatingHandlers: [],
        UpstreamPathTemplate: "",
        UpstreamHost: "",
        ReRouteIsCaseSensitive: false,
        Aggregator: "",
        UpstreamHttpMethod: [],
        Priority: 0
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
      if (json.Aggregates.length > 0) this.transfer(json.Aggregates[0]);
    }
  },
  methods: {
    transfer(json) {
      this.AggregatesForm = {
        DelegatingHandlers: json.DelegatingHandlers || [],
        UpstreamPathTemplate: json.UpstreamPathTemplate || "",
        UpstreamHost: json.UpstreamHost || "",
        ReRouteIsCaseSensitive: json.ReRouteIsCaseSensitive || false,
        Aggregator: json.Aggregator || "",
        UpstreamHttpMethod: json.UpstreamHttpMethod || [],
        Priority: json.Priority || 0
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
