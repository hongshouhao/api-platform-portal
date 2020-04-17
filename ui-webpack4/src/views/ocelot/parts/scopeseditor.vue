<template>
  <Select v-model="innerscopes"
          not-found-text="请选择一个授权方案">
    <Option v-for="item in supportedScopes"
            :value="item"
            :key="item">{{ item }}</Option>
  </Select>
</template>

<script>
import env from '../../../global'
export default {
  data () {
    return {
      supportedScopes: []
    }
  },
  props: {
    idsHost: {
      type: String,
      default: ''
    },
    scopes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
  },
  computed: {
    innerscopes: {
      get () {
        return this.scopes
      },
      set (val) {
        this.$emit('update:scopes', val)
      }
    }
  },
  watch: {
    idsHost () {
      this.loadScopes()
    }
  },
  methods: {
    loadScopes () {
      var _this = this
      if (_this.idsHost) {
        _this.$axios
          .get(_this.idsHost + env.identityServerWellKnownUri)
          .then(function (response) {
            _this.supportedScopes = response.data.scopes_supported
          })
          .catch(function (error) {
            _this.$Notice.error({
              title: '服务连接失败!',
              desc: error
            })
          })
      }
    }
  }
}
</script>
