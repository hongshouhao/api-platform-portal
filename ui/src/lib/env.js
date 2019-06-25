class EnvVar {
    constructor() {
        this.client_id = "backend_admin_js";
        this.client_secret = "secret";
        this.redirect_uri = window.location.origin + "/#/signincallback";
        this.silent_redirect_uri = window.location.origin + "/#/silentcallback";
        this.scope = "openid roles";
        this.identityServer_host = "http://192.168.122.17:8610";
        this.identityServerAdmin_host = "http://192.168.122.17:8620";

        this.ocelotConfig_host = "http://192.168.122.17:9620";
        //this.ocelotConfig_host = "http://localhost:48969";
        this.ocelot_host = "http://192.168.122.17:9610";
        this.consul_host = "http://192.168.84.24:8500";

        this.karma_home = "http://192.168.122.11:9098";
        this.prometheus_host = "http://192.168.122.11:9090";

        this.elasticserach_host = "http://192.168.84.24:9200";
        this.kibana_home = "http://192.168.84.24:5601";
        this.skywalking_home = "http://192.168.84.24:8998";

        this.combineWellKnownConfigUri = function (host) {
            return host + "/.well-known/openid-configuration";
        }
    }
}

// class EnvVar {
//     constructor() {
//         this.client_id = "ocelot_admin_zlq";
//         this.client_secret = "configuration_administration_secret";
//         this.redirect_uri = window.location.origin + "/signincallback";
//         this.silent_redirect_uri = window.location.origin + "/silent-callback.html";
//         this.scope = "openid profile roles ocelot_administration consul_administration";
//         this.identityServer_host = "http://192.168.84.124:8610";
//         this.identityServerAdmin_host = "http://localhost:8611";
//         this.ocelotConfig_host = "http://localhost:48969";
//         this.ocelot_host = "http://localhost:48968";
//         this.butterfly_host = "http://localhost:9618";
//     }
// }

var Env = new EnvVar();
export {
    Env
}