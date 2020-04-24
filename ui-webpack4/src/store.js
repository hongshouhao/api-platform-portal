import Vue from 'vue'
import Vuex from 'vuex'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import config from './config'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    servicesInConsul: []
  },
  mutations: {
    setServices (state, value) {
      state.servicesInConsul = value;
    }
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(
      config.oidc,
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
