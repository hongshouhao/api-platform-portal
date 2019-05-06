Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class ModelTemplate {
    constructor() {
        this.getOcelotConfigSection = function () {
            var templ = {
                name: new Date().getTime(),
                jsonString: JSON.stringify(this.getOcelotConfigurationSchema(), null, 2),
                enable: false,
                description: "",
                createTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                modifiedTime: new Date().Format("yyyy-MM-dd hh:mm:ss")
            }

            return JSON.parse(JSON.stringify(templ));
        };
        this.getOcelotConfigurationSchema = function () {
            var templ = {
                GlobalConfiguration: {
                    RequestIdKey: "",
                    ServiceDiscoveryProvider: {
                        Host: "",
                        Port: 9000,
                        Type: "",
                        Token: "",
                        ConfigurationKey: "",
                        PollingInterval: 0
                    },
                    RateLimitOptions: {
                        ClientIdHeader: "",
                        QuotaExceededMessage: "",
                        RateLimitCounterPrefix: "",
                        DisableRateLimitHeaders: false,
                        HttpStatusCode: 0
                    },
                    QoSOptions: {
                        ExceptionsAllowedBeforeBreaking: 0,
                        DurationOfBreak: 0,
                        TimeoutValue: 0
                    },
                    BaseUrl: "",
                    LoadBalancerOptions: {
                        Type: "",
                        Key: "",
                        Expiry: 0
                    },
                    DownstreamScheme: "",
                    HttpHandlerOptions: {
                        AllowAutoRedirect: false,
                        UseCookieContainer: false,
                        UseTracing: false,
                        UseProxy: false
                    }
                },
                ReRoutes: [{
                    DownstreamPathTemplate: "/",
                    UpstreamPathTemplate: "/",
                    UpstreamHttpMethod: ["get", "post"],
                    AddHeadersToRequest: {},
                    UpstreamHeaderTransform: {},
                    DownstreamHeaderTransform: {},
                    AddClaimsToRequest: {},
                    RouteClaimsRequirement: {},
                    AddQueriesToRequest: {},
                    RequestIdKey: "",
                    FileCacheOptions: {
                        TtlSeconds: 0,
                        Region: ""
                    },
                    ReRouteIsCaseSensitive: false,
                    ServiceName: "",
                    DownstreamScheme: "",
                    QoSOptions: {
                        ExceptionsAllowedBeforeBreaking: 0,
                        DurationOfBreak: 0,
                        TimeoutValue: 0
                    },
                    LoadBalancerOptions: {
                        Type: "",
                        Key: "",
                        Expiry: 0
                    },
                    RateLimitOptions: {
                        ClientWhitelist: [],
                        EnableRateLimiting: false,
                        Period: "",
                        PeriodTimespan: 0.0,
                        Limit: 0
                    },
                    AuthenticationOptions: {
                        AuthenticationProviderKey: "",
                        AllowedScopes: []
                    },
                    HttpHandlerOptions: {
                        AllowAutoRedirect: false,
                        UseCookieContainer: false,
                        UseTracing: false,
                        UseProxy: false
                    },
                    DownstreamHostAndPorts: [{
                        Host: "",
                        Port: 8001
                    }],
                    UpstreamHost: "",
                    Key: "",
                    DelegatingHandlers: [],
                    Priority: 0,
                    Timeout: 30,
                    DangerousAcceptAnyServerCertificateValidator: false,
                    SecurityOptions: {
                        IpAllowedList: [],
                        IpBlockedList: []
                    }
                }],
                Aggregates: [{
                    DelegatingHandlers: [],
                    UpstreamPathTemplate: "",
                    UpstreamHost: "",
                    ReRouteIsCaseSensitive: false,
                    Aggregator: "",
                    UpstreamHttpMethod: [],
                    Priority: 0
                }],
                DynamicReRoutes: [{
                    ServiceName: "",
                    RateLimitRule: {
                        ClientWhitelist: [],
                        EnableRateLimiting: false,
                        Period: "",
                        PeriodTimespan: 0,
                        Limit: 0
                    }
                }]
            }
            return JSON.parse(JSON.stringify(templ));
        };
        this.getConsulServiceSchema = function () {
            return {
                name: "",
                id: "",
                tags: [],
                address: "127.0.0.1",
                port: 80,
                check: {
                    ttl: '15s'
                }
            }
        };
        this.getOcelotTemplate = function () {
            var templ = {
                jsonString: JSON.stringify(this.getOcelotConfigurationSchema(), null, 2),
                description: "",
                version: new Date().getTime().toString()
            }
            return JSON.parse(JSON.stringify(templ));
        };
    }
}

var modelTempl = new ModelTemplate()
export {
    modelTempl
}