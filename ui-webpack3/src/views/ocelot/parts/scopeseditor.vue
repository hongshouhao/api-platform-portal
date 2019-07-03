<template>
  <Select v-model="scopes" multiple not-found-text="请选择一个授权方案">
    <Option v-for="item in supportedScopes" :value="item" :key="item">{{ item }}</Option>
  </Select>
</template>

<script>
export default {
  data() {
    return {
      supportedScopes: []
    };
  },
  props: {
    idsHost: {
      type: String,
      default: ""
    },
    scopes: {
      type: Array,
      default: []
    }
  },
  mounted() {},
  watch: {
    idsHost() {
      var _this = this;
      if (_this.idsHost) {
        _this.$axios
          .get(_this.idsHost.CombineWellKnownUri())
          .then(function(response) {
            _this.supportedScopes = response.data.scopes_supported;
          })
          .catch(function(error) {
            _this.$Notice.error({
              title: "服务连接失败!",
              desc: error
            });
          });
      }
    }
  },
  methods: {}
};
</script>