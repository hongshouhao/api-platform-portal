class Redirect {
    constructor() {
        var mgr = new Oidc.UserManager({
            loadUserInfo: true,
            filterProtocolClaims: true
        });

        this.Redirect = function () {
            mgr.signinRedirectCallback().then(function (user) {
                console.log(user);
                window.history.replaceState({},
                    window.document.title,
                    window.location + "/");
                window.location = "/";
            });
        };

        this.SilentRedirect = function () {
            mgr.signinSilentCallback();
        };
    }
}