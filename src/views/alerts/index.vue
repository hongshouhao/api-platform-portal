<template>
  <div style="width:100%; height:100%">
    <iframe style="width:100%; height:100%" frameborder="0" scrolling="auto" :src="alertUrl"></iframe>
  </div>
</template>

<script>
import { Env } from "../../lib/env";
export default {
  data() {
    return {
      alertUrl: Env.karma_host
    };
  }
};
</script>