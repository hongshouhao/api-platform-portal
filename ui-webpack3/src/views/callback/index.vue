<template>
  <Content :style="{padding: '0 50px'}">
    <Button type="primary" @click="redirect">
      <Icon type="ios-arrow-back"/>Backward
    </Button>
  </Content>
</template>

<script>
export default {
  created() {
    debugger;
    this.redirect();
  },
  methods: {
    redirect() {
      this.$webapi.identity.redirect();
    }
  }
};
</script>