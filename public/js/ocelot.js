var Ocelot = function () {};

Ocelot.GetAllSections = async function (ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/getAllSections",
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

Ocelot.GetSection = async function (name, ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/getSection",
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

Ocelot.SaveSection = function (json, ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/saveSection",
            contentType: "application/json",
            data: JSON.stringify(json),
            type: "POST",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (data) {
                debugger;
                console.log(data);
                ifSuccess ? ifSuccess(data) : function () {};
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                debugger;
                console.log(textStatus + "," + errorThrown);
                ifError ? ifError(errorThrown) : function (errorThrown) {};
            }
        });
    });
};

Ocelot.DeleteSection = function (id, ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/deleteSection",
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
                ifError ? ifError(errorThrown) : function (errorThrown) {};
            }
        });
    });
};

Ocelot.ValidateSection = function (json, ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/validateSection",
            contentType: "application/json",
            dataType: "JSON",
            data: json,
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
                ifError ? ifError(errorThrown) : function (errorThrown) {};
            }
        });
    });
};

Ocelot.ValidateConfiguration = function (ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/validateConfiguration",
            dataType: "JSON",
            type: "GET",
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

Ocelot.GetConfiguration = function (ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/getConfiguration",
            dataType: "JSON",
            type: "GET",
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

Ocelot.ReBuiltConfiguration = function (ifSuccess, ifError) {
    Identity.getAccessToken().then(function (token) {
        $.ajax({
            url: env.ocelot_host + "/admin/configuration/rebuiltConfiguration",
            type: "GET",
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

var codeobj = $("#jsonTxt");

$("#btnRefresh").click(function () {
    Ocelot.GetAllSections(
        function (json) {
            var jsonText = JSON.stringify(json, null, 2);
            codeobj.text(jsonText);
            hljs.highlightBlock(codeobj.get(0));
        },
        function (errorThrown) {});
});

$("#btnSave").click(function () {
    Ocelot.SaveSection(codeobj.text(),
        function () {
            $("#btnRefresh").click();
        },
        function (errorThrown) {});
});

$("#btnReBuild").click(function () {
    Ocelot.ReBuiltConfiguration(
        function (json) {
            var jsonText = JSON.stringify(json, null, 2);
            codeobj.text(jsonText);
            hljs.highlightBlock(codeobj.get(0));
        },
        function (errorThrown) {});
});

$("#btnCurrentMapping").click(function () {
    Ocelot.GetConfiguration(
        function (json) {
            var jsonText = JSON.stringify(json, null, 2);
            codeobj.text(jsonText);
            hljs.highlightBlock(codeobj.get(0));
        },
        function (errorThrown) {});
});