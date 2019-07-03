<template>
  <Select v-model="innerhttpMethods"
          transfer
          multiple>
    <Option v-for="item in supportedHttpMethods"
            :value="item.toLowerCase()"
            :key="item">{{ item }}</Option>
  </Select>
</template>

<script>
export default {
  data () {
    return {
      supportedHttpMethods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS',
        'PATCH',
        'HEAD',
        'TRACE',
        'CONNECT'
      ]
    }
  },
  props: {
    httpMethods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    innerhttpMethods: {
      get () {
        return this.httpMethods
      },
      set (val) {
        this.$emit('update:httpMethods', val)
      }
    }
  }
}
</script>
