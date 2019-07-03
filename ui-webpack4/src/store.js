import Vue from 'vue'
import Vuex from 'vuex'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import env from './global'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    oidcStore: vuexOidcCreateStoreModule(
      env.oidcSettings,
      {
        namespaced: true,
        dispatchEventsOnWindow: true
      },
      {
        userLoaded: (user) => console.log('OIDC user is loaded:', user),
        userUnloaded: () => console.log('OIDC user is unloaded'),
        accessTokenExpiring: () => console.log('Access token will expire'),
        accessTokenExpired: () => console.log('Access token did expire'),
        silentRenewError: () => console.log('OIDC user is unloaded'),
        userSignedOut: () => console.log('OIDC user is signed out')
      })
  }
})
