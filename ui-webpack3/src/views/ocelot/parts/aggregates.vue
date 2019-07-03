<template>
  <div class="form">
    <Form :model="vmodel" :label-width="150">
      <FormItem label="UpstreamPathTemplate" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="right" content="网关地址" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.UpstreamPathTemplate"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="UpstreamHost">
        <Row>
          <Col span="1">
            <Tooltip placement="right" content theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.UpstreamHost"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Aggregator">
        <Row>
          <Col span="1">
            <Tooltip placement="right" content theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Aggregator"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Priority">
        <Row>
          <Col span="1">
            <Tooltip placement="right" content theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <Input v-model="vmodel.Priority"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="ReRouteIsCaseSensitive">
        <i-switch v-model="vmodel.ReRouteIsCaseSensitive"></i-switch>
      </FormItem>
      <StringList
        class="mar10 highlight"
        title="ReRouteKeys"
        tooltip="ReRoute.Key"
        :array="vmodel.DelegatingHandlers"
      ></StringList>

      <FormItem label="UpstreamHttpMethod" class="highlight">
        <Row>
          <Col span="1">
            <Tooltip placement="right" content="请求方式" theme="light" :delay="500">
              <Icon type="ios-information-circle"/>
            </Tooltip>
          </Col>
          <Col span="23">
            <HttpMethodEditor
              :httpMethods="vmodel.UpstreamHttpMethod"
              @update:httpMethods="val=>vmodel.UpstreamHttpMethod=val"
            ></HttpMethodEditor>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import StringList from "../../common/stringlist";
import HttpMethodEditor from "../../common/httpmethodeditor";
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
    StringList,
    HttpMethodEditor
  }
};
</script>

<style>
</style>
