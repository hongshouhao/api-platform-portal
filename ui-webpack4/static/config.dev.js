let config = {
  oidc: {
    authority: 'http://192.168.122.17:8610',
    client_id: 'api_platform_admin',
    client_secret: '59ecca08-a33d-60c8-e63b-3a884a6c390c',
    response_type: 'code',
    scope: 'openid roles cnname',
    loadUserInfo: true,
    revokeAccessTokenOnSignout: true,
    redirect_uri: '/#/signincallback',
    silent_redirect_uri: '/#/silentcallback',
    post_logout_redirect_uri: '',
    automaticSilentRenew: true
    // userStore: new oidc.WebStorageStateStore({
    //   store: window.localStorage
    // })
  },
  ocelot: {
    enable: true,
    serverBaseURL: 'http://192.168.122.17:9610',
    adminApiBaseURL: 'http://192.168.122.17:9620',
  },
  consul: {
    enable: true,
    baseURL: 'http://192.168.84.24:8500'
  },
  karma: {
    enable: false,
    baseURL: 'http://192.168.122.11:9098'
  },
  prometheus: {
    enable: true,
    baseURL: 'http://192.168.122.11:9090'
  },
  elasticserach: {
    baseURL: 'http://192.168.84.24:9200'
  },
  kibana: {
    enable: true,
    baseURL: 'http://192.168.84.24:5601'
  },
  apm: {
    enable: true,
    baseURL: 'http://192.168.84.24:8998'
  },
  ids: {
    wellKnownUri: '/.well-known/openid-configuration',
    adminApiBaseURL: 'http://192.168.122.17:8620'
  }
}

var host = window.location.protocol + "//" + window.location.host;
if (process.env.BASE_URL) {
  config.oidc.redirect_uri = host + config.oidc.redirect_uri
  config.oidc.silent_redirect_uri = host + config.oidc.silent_redirect_uri
}
else {
  config.oidc.redirect_uri = host + config.oidc.redirect_uri
  config.oidc.silent_redirect_uri = host + config.oidc.silent_redirect_uri
}

export default config
