<template>
  <Content :style="{padding: '0 50px'}">
    <Button type="primary" @click="redirect">
      <Icon type="ios-arrow-back"/>Backward
    </Button>
  </Content>
</template>

<script>
import { Identity } from "../../lib/identity";
export default {
  created() {
    Identity.redirect();
  },
  methods: {
    redirect() {
      Identity.redirect();
    }
  }
};
</script>