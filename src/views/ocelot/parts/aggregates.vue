<template>
  <div class="form">
    <Form :model="vmodel" :label-width="150">
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="bottom" content="网关地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.UpstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>
      <StringList
        class="mar10 highlight"
        title="ReRouteKeys"
        tooltip="ReRoute.Key"
        :array="vmodel.DelegatingHandlers"
      ></StringList>
      <FormItem label="Aggregator">
        <Input v-model="vmodel.Aggregator"></Input>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Input v-model="vmodel.UpstreamHost"></Input>
      </FormItem>

      <FormItem label="Priority">
        <Input v-model="vmodel.Priority" :number="true"></Input>
      </FormItem>
      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="vmodel.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>
      <StringList class="mar10" title="UpstreamHttpMethod" :array="vmodel.UpstreamHttpMethod"></StringList>
    </Form>
  </div>
</template>

<script>
import StringList from "../../common/stringlist";
import { modelTempl } from "../../modelTempl.js";

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
