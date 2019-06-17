<template>
  <div class="form">
    <Form :model="model" :label-width="150">
      <FormItem label="服务名">
        <Input v-model="model.name"></Input>
      </FormItem>
      <FormItem label="ID">
        <Input v-model="model.id" placeholder="非必填"></Input>
      </FormItem>
      <FormItem label="IP">
        <Input v-model="model.address"></Input>
      </FormItem>
      <FormItem label="端口">
        <Input v-model="model.port"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { modelTempl } from "../modelTempl.js";

export default {
  data() {
    return {};
  },
  props: {
    model: {
      type: Object,
      default: modelTempl.getConsulServiceSchema()
    }
  },
  methods: {}
};
</script>
