<template>
  <div class="form">
    <Form ref="formInline" :model="serviceModel" :label-width="100">
      <FormItem label="id">
        <Input v-model="serviceModel.id"></Input>
      </FormItem>
      <FormItem label="name">
        <Input v-model="serviceModel.name"></Input>
      </FormItem>
      <FormItem label="address">
        <Input v-model="serviceModel.address"></Input>
      </FormItem>
      <FormItem label="port">
        <Input v-model="serviceModel.port"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      show: true,
      model: {}
    };
  },
  props: {
    serviceModel: {
      type: Object,
      default: {
        id: "",
        name: "",
        address: "",
        port: "",
      }
    }
  },
  methods: {
    onConfig() {
      this.modal = true;
    },
    ObjToJSON() {
      this.arrayToObj("AddHeadersToRequest");
      this.arrayToObj("UpstreamHeaderTransform");
      this.arrayToObj("DownstreamHeaderTransform");
      this.arrayToObj("AddClaimsToRequest");
      this.arrayToObj("RouteClaimsRequirement");
      this.arrayToObj("AddQueriesToRequest");
    },
    arrayToObj(name) {
      var arr = this.model[name];
      delete this.model[name];
      this.model[name] = {};
      if (arr.length > 0) {
        for (var i in arr) {
          this.model[name][arr[i].key] = arr[i].value;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.form {
  .configBth {
    margin: 10px 0 0 0;
  }
}
</style>
