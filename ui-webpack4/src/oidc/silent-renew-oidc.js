import 'core-js/fn/promise'
import { vuexOidcProcessSilentSignInCallback } from 'vuex-oidc'
import config from '../config'

vuexOidcProcessSilentSignInCallback(config.oidc)