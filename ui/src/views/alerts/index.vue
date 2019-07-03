<template>
  <div style="width:100%; height:100%">
    <iframe style="width:100%; height:100%" frameborder="0" scrolling="auto" :src="alertUrl"></iframe>
  </div>
</template>

<script>
import env from "../../lib/env";
export default {
  data() {
    return {
      alertUrl: env.karma_home
    };
  }
};
</script>