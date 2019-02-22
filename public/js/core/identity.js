function IdentityClass() {
    Oidc.Log.logger = window.console;
    Oidc.Log.level = Oidc.Log.DEBUG;

    var settings = {
        authority: env.identityServer_host,
        client_id: env.client_id,
        client_secret: env.client_secret,
        redirect_uri: env.redirect_uri,
        post_logout_redirect_uri: env.client_root,
        response_type: "id_token token",
        scope: env.scope,
        loadUserInfo: true,
        revokeAccessTokenOnSignout: true,
        silent_redirect_uri: env.silent_redirect_uri,
        automaticSilentRenew: true
    };

    function handleCallback() {
        mgr.signinRedirectCallback().then(function (user) {
            var hash = window.location.hash.substr(1);
            var result = hash.split('&').reduce(function (result, item) {
                var parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});

            console.log(result);

            window.history.replaceState({},
                window.document.title,
                env.client_root + window.location.pathname);

        }, function (error) {
            console.log(error);
        });
    }

    mgr = new Oidc.UserManager(settings);

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

    mgr.events.addUserLoaded(function (user) {});
    mgr.events.addUserUnloaded(function () {});
    mgr.events.addAccessTokenExpiring(function () {});
    mgr.events.addUserSignedOut(function () {});
}

var Identity = new IdentityClass();