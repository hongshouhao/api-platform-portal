'use strict'
let env = {
  virtualpath: "",
  oidcSettings: {
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
  ocelot_host: 'http://192.168.122.17:9610',
  ocelotAdmin_host: 'http://192.168.122.17:9620',
  consul_host: 'http://192.168.84.24:8500',
  karma_host: 'http://192.168.122.11:9098',
  prometheus_host: 'http://192.168.122.11:9090',
  elasticserach_host: 'http://192.168.84.24:9200',
  kibana_host: 'http://192.168.84.24:5601',
  skywalking_host: 'http://192.168.84.24:8998',
  identityServerWellKnownUri: '/.well-known/openid-configuration',
  identityServerAdmin_host: 'http://192.168.122.17:8620'
}

var host = window.location.protocol + "//" + window.location.host;
if (env.virtualpath) {
  env.oidcSettings.redirect_uri = host + "/" + env.virtualpath + env.oidcSettings.redirect_uri
  env.oidcSettings.silent_redirect_uri = host + "/" + env.virtualpath + env.oidcSettings.silent_redirect_uri
}
else {
  env.oidcSettings.redirect_uri = host + env.oidcSettings.redirect_uri
  env.oidcSettings.silent_redirect_uri = host + env.oidcSettings.silent_redirect_uri
}

export default env
