import axios from "axios"
import { Env } from './env';
import { Identity } from './identity';
import { debug } from "util";

class OcelotConfigClient {
    constructor() {
        this.GetAllSections = async function (ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.get(Env.ocelotConfig_host + "/admin/configuration/getAllSections")
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        console.log(error);
                        ifError(error);
                    })
            });
        };
        this.GetSection = async function (name, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.get(Env.ocelotConfig_host + "/admin/configuration/getSection")
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.SaveSection = function (json, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/saveSection", json)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.DeleteSection = function (sectionName, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/deleteSection?name=" + sectionName)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.ValidateSection = function (json, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/validateSections", json)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.BuildConfig = function (description, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/buildConfig?description=" + description)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };

        this.EnableConfig = function (id, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/enableConfig?id=" + id)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.GetAllConfigs = async function (ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.get(Env.ocelotConfig_host + "/admin/configuration/getAllConfigs")
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.DeleteConfig = async function (id, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelotConfig_host + "/admin/configuration/deleteConfig?id=" + id)
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.ReLoadConfig = async function (ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.post(Env.ocelot_host + "/admin/configuration/reLoad")
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
        this.CurrentConfig = async function (ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                axios.get(Env.ocelot_host + "/admin/configuration/get")
                    .then(response =>
                        ifSuccess(response.data)
                    ).catch(error => {
                        ifError(error);
                    })
            });
        };
    }
}
var Ocelot = new OcelotConfigClient()
export {
    Ocelot
}