class EnvVar {
    constructor() {
        this.client_id = "ocelot_admin_zlq";
        this.client_secret = "configuration_administration_secret";
        this.redirect_uri = window.location.origin + "/signincallback";
        this.silent_redirect_uri = window.location.origin + "/silent-callback.html";
        this.scope = "openid profile roles ocelot_administration consul_administration";
        this.identityServer_host = "http://192.168.84.124:8610";
        this.identityServerAdmin_host = "http://192.168.84.124:8611";
        this.ocelot_host = "http://192.168.84.124:8000";
        this.butterfly_host = "http://192.168.84.124:9618";
    }
}

var Env = new EnvVar();
export {
    Env
}