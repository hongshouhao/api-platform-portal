class ModelTemplate {
    constructor() {
        this.getConfigSection = function () {
            return {
                name: "V1",
                sectionType: "2",
                jsonString: JSON.stringify({
                    ReRoutes: this.getOcelotConfigurationSchema().ReRoutes
                }, null, 2),
                enable: false,
                description: "",
                createTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                modifiedTime: new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
        };
        this.getOcelotConfigurationSchema = function () {
            return {
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
                    AddHeadersToRequest: [],
                    UpstreamHeaderTransform: [],
                    DownstreamHeaderTransform: [],
                    AddClaimsToRequest: [],
                    RouteClaimsRequirement: [],
                    AddQueriesToRequest: [],
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
        };
        this.getOcelotConfigurationTemplate = function () {

            return {
                jsonString: JSON.stringify(this.getOcelotConfiguration(), null, 2),
                description: "",
                version: "v1"
            }
        };
    }
}

var modelTempl = new ModelTemplate()
export {
    modelTempl
}