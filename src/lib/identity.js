import {
    Env
} from './env'
import Oidc from 'oidc-client'
import {
    debug
} from 'util';

class IdentityClass {
    constructor() {
        Oidc.Log.logger = window.console;
        Oidc.Log.level = Oidc.Log.DEBUG;
        var settings = {
            authority: Env.identityServer_host,
            client_id: Env.client_id,
            client_secret: Env.client_secret,
            redirect_uri: Env.redirect_uri,
            post_logout_redirect_uri: window.location,
            response_type: "id_token token",
            scope: Env.scope,
            loadUserInfo: true,
            revokeAccessTokenOnSignout: true,
            silent_redirect_uri: Env.silent_redirect_uri,
            automaticSilentRenew: true,
        };

        var mgr = new Oidc.UserManager(settings);

        function handleCallback() {
            mgr.signinRedirectCallback().then(function (user) {
                var hash = window.location.hash.substr(1);
                var result = hash.split('&').reduce(function (result, item) {
                    var parts = item.split('=');
                    result[parts[0]] = parts[1];
                    return result;
                }, {});
                window.history.replaceState({}, window.document.title, window.location + window.location.pathname);
            }, function (error) {
                console.log(error);
            });
        }

        this.login = function () {
            mgr.signinRedirect();
        };
        this.logout = function () {
            mgr.signoutRedirect();
        };
        this.revoke = function () {
            mgr.revokeAccessToken();
        };
        this.getUser = function () {
            var user = mgr.getUser();
            return user;
        };
        this.ensureLogedin = function () {
            if (window.location.hash) {
                handleCallback();
            } else {
                mgr.getUser().then(function (user) {
                    if (!user) {
                        mgr.signinRedirect();
                    } else if (user.expired) {
                        mgr.signinRedirect();
                    }
                });
            }
        };
        this.getAccessToken = async function () {
            var user = await mgr.getUser();
            if (user) {
                return user.access_token;
            }
        };
        this.redirect = function () {
            mgr.signinRedirectCallback().then(function (user) {
                window.history.replaceState({},
                    window.document.title,
                    window.location + "/");
                window.location = "/";
            });
        };
        this.silentRedirect = function () {
            mgr.signinSilentCallback();
        };
        mgr.events.addUserLoaded(function (user) {});
        mgr.events.addUserUnloaded(function () {});
        mgr.events.addAccessTokenExpiring(function () {});
        mgr.events.addUserSignedOut(function () {});
    }
}

var Identity = new IdentityClass()
export {
    Identity
}