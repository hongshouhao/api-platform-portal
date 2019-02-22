<template>
  <div>callback</div>
</template>

<script>
export default {
  mounted() {
    var mgr = new Oidc.UserManager({
      loadUserInfo: true,
      filterProtocolClaims: true
    });
    mgr.signinRedirectCallback().then(function(user) {
      console.log(user);
      window.history.replaceState(
        {},
        window.document.title,
        env.client_root + "/"
      );
      this.$router.push("/");
    });
  }
};
</script>

<style>
</style>
