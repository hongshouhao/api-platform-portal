<template>
  <div v-if="oidcIsAuthenticated">
    <Divider>You are signed in as</Divider>
    <div v-html="userDisplay"></div>
    <Divider>Id token</Divider>
    <p>expires {{ new Date(oidcIdTokenExp).toISOString() }}</p>
    <Input v-model="oidcIdToken" type="textarea" readonly :rows="5" />
    <Button
      type="primary"
      style="margin-top:15px"
      @click="authenticateOidcSilent"
      >Reauthenticate silently</Button
    >
  </div>
  <p v-else-if="oidcAuthenticationIsChecked">You are not signed in</p>
  <p v-else>Silent renew is in progress...</p>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import jsonMarkup from 'json-markup'
import './signedinuser.less'
export default {
  name: 'SignedInUser',
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated',
      'oidcAuthenticationIsChecked',
      'oidcUser',
      'oidcIdToken',
      'oidcIdTokenExp'
    ]),
    userDisplay: function() {
      return jsonMarkup(this.oidcUser)
    }
  },
  methods: {
    ...mapActions('oidcStore', ['authenticateOidcSilent'])
  }
}
</script>

<style>
.json-markup {
  color: transparent;
}
.json-markup span {
  color: black;
  float: left;
}
.json-markup .json-markup-key {
  clear: left;
}
</style>
