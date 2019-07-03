<template>
  <div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('oidcStore', [
      'oidcSignInCallback'
    ])
  },
  created () {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        this.$router.push(redirectPath)
      })
      .catch((err) => {
        console.error(err)
        this.$router.push('/signincallbackerror')
      })
  }
}
</script>
