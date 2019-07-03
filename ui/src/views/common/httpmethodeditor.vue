<template>
  <Select v-model="innerhttpMethods" transfer multiple>
    <Option v-for="item in supportedHttpMethods" :value="item.toLowerCase()" :key="item">{{ item }}</Option>
  </Select>
</template>

<script>
export default {
  data() {
    return {
      supportedHttpMethods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
        "PATCH",
        "HEAD",
        "TRACE",
        "CONNECT"
      ],
      innerhttpMethods: this.httpMethods
    };
  },
  props: {
    httpMethods: {
      type: Array,
      default: []
    }
  },
  mounted() {},
  methods: {},
  watch: {
    innerhttpMethods: {
      handler(val) {
        this.$emit("update:httpMethods", val);
      },
      deep: true
    },
    httpMethods() {
      this.innerhttpMethods = this.httpMethods;
    }
  }
};
</script>