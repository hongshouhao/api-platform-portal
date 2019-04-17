class EnvVar {
    constructor() {
        this.client_id = "apigateway_admin_js";
        this.client_secret = "secret";
        this.redirect_uri = window.location.origin + "/signincallback";
        this.silent_redirect_uri = window.location.origin + "/silentcallback";
        this.scope = "openid roles ocelot_config.write";
        this.identityServer_host = "http://192.168.84.24:8610";
        this.identityServerAdmin_host = "http://192.168.84.24:8611";
        this.ocelotConfig_host = "http://192.168.84.24:9001";
        this.ocelot_host = "http://192.168.84.24:9000";
        this.butterfly_host = "http://192.168.84.24:9618";
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