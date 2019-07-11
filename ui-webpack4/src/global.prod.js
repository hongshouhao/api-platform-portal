'use strict'
let env = {
  oidcSettings: {
    authority: 'http://192.168.122.17:8610',
    client_id: 'backend_admin_js',
    client_secret: 'secret',
    response_type: 'id_token token',
    scope: 'openid roles name',
    loadUserInfo: true,
    revokeAccessTokenOnSignout: true,
    redirect_uri: window.document.location.origin + '/signincallback',
    silent_redirect_uri: window.document.location.origin + '/silentcallback',
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

function getRootPath () {
  var curWwwPath = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName);
  var localhostPaht = curWwwPath.substring(0, pos);
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  return (localhostPaht + projectName);
}

export default env
