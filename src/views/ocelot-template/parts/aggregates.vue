<template>
  <div class="form">
    <Form :model="model" :label-width="150">
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="网关地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="model.UpstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>
      <char-common
        class="mar10 highlight"
        title="ReRouteKeys"
        tooltip="ReRoute.Key"
        :array="model.DelegatingHandlers"
      ></char-common>
      <FormItem label="Aggregator">
        <Input v-model="model.Aggregator"></Input>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Input v-model="model.UpstreamHost"></Input>
      </FormItem>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="model.ReRouteIsCaseSensitive"></i-switch>
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
