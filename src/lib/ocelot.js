import {
    Env
} from './env';
import {
    Identity
} from './identity';
import {
    debug
} from 'util';

class OcelotConfigClient {
    constructor() {
        this.GetAllSections = async function (ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/getAllSections",
                    dataType: "JSON",
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
        this.GetSection = async function (name, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/getSection",
                    dataType: "JSON",
                    type: "GET",
                    data: {
                        "name": name
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
        this.SaveSection = function (json, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/saveSection",
                    contentType: "application/json",
                    data: JSON.stringify(json),
                    type: "POST",
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        var errorInfo = XMLHttpRequest.responseJSON[0].message
                        ifError ? ifError(errorInfo) : function (errorInfo) {};
                    }
                });
            });
        };
        this.DeleteSection = function (id, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/deleteSection",
                    contentType: "application/json",
                    data: JSON.stringify(id),
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        var errorInfo = XMLHttpRequest.responseJSON[0].message
                        ifError ? ifError(errorInfo) : function (errorInfo) {};
                    }
                });
            });
        };
        this.ValidateSection = function (json, ifSuccess, ifError) {
            Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/validateSections",
                    contentType: "application/json",
                    dataType: "JSON",
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var errorInfo = XMLHttpRequest.responseJSON[0].message
                        ifError ? ifError(errorInfo) : function (errorInfo) {};
                    }
                });
            });
        };
        this.BuildConfig = function (description, ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/buildConfig?description=" + description,
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        var errorInfo = XMLHttpRequest.responseJSON[0].message
                        ifError ? ifError(errorInfo) : function (errorInfo) {};
                    }
                });
            });
        };

        this.EnableConfig = function (id, ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/enableConfig?id=" + id,
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        console.log(data);
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        var errorInfo = XMLHttpRequest.responseJSON[0].message
                        ifError ? ifError(errorInfo) : function (errorInfo) {};
                    }
                });
            });
        };
        this.GetAllConfigs = async function (ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/getAllConfigs",
                    dataType: "JSON",
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
        this.DeleteConfig = async function (id, ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelotConfig_host + "/admin/configuration/deleteConfig?id=" + id,
                    type: "Post",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
        this.ReLoadConfig = async function (ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelot_host + "/admin/configuration/reLoad",
                    type: "Post",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
        this.CurrentConfig = async function (ifSuccess, ifError) {
            //Identity.ensureLogedin();
            Identity.getAccessToken().then(function (token) {
                $.ajax({
                    url: Env.ocelot_host + "/admin/configuration/get",
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    },
                    success: function (data) {
                        ifSuccess ? ifSuccess(data) : function () {};
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus + "," + errorThrown);
                        ifError ? ifError(errorThrown) : function (errorThrown) {};
                    }
                });
            });
        };
    }
}
var Ocelot = new OcelotConfigClient()
export {
    Ocelot
}