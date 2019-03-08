<template>
  <Content :style="{padding: '0 50px'}">
    <Button :size="buttonSize" type="primary" @click="fffff">
      <Icon type="ios-arrow-back"/>Backward
    </Button>
  </Content>
</template>

<script>
import { Identity } from "../../lib/identity";
export default {
  created() {
    debugger;
    Identity.redirect();
  },
  methods: {
    fffff() {
      Identity.redirect();
    }
  }
};
</script>

