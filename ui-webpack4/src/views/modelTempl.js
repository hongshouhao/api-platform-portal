class ModelTemplate {
  constructor() {
    this.getOcelotConfigSection = function () {
      var templ = {
        name: new Date().getTime(),
        jsonString: JSON.stringify(this.getOcelotConfigurationSchema(), null, 2),
        enable: false,
        description: '',
        createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
        modifiedTime: new Date().format("yyyy-MM-dd hh:mm:ss")
      }

      return JSON.parse(JSON.stringify(templ))
    }
    this.getOcelotConfigurationSchema = function () {
      var templ = {
        GlobalConfiguration: {
          RequestIdKey: '',
          ServiceDiscoveryProvider: {
            Host: '',
            Port: 9000,
            Type: '',
            Token: '',
            ConfigurationKey: '',
            PollingInterval: 0
          },
          RateLimitOptions: {
            ClientIdHeader: '',
            QuotaExceededMessage: '',
            RateLimitCounterPrefix: '',
            DisableRateLimitHeaders: false,
            HttpStatusCode: 0
          },
          QoSOptions: {
            ExceptionsAllowedBeforeBreaking: 0,
            DurationOfBreak: 0,
            TimeoutValue: 0
          },
          BaseUrl: '',
          LoadBalancerOptions: {
            Type: '',
            Key: '',
            Expiry: 0
          },
          DownstreamScheme: '',
          HttpHandlerOptions: {
            AllowAutoRedirect: false,
            UseCookieContainer: false,
            UseTracing: false,
            UseProxy: false
          }
        },
        ReRoutes: [{
          DownstreamPathTemplate: '/',
          UpstreamPathTemplate: '/',
          UpstreamHttpMethod: ['get', 'post'],
          AddHeadersToRequest: {},
          UpstreamHeaderTransform: {},
          DownstreamHeaderTransform: {},
          AddClaimsToRequest: {},
          RouteClaimsRequirement: {},
          AddQueriesToRequest: {},
          RequestIdKey: '',
          FileCacheOptions: {
            TtlSeconds: 0,
            Region: ''
          },
          ReRouteIsCaseSensitive: false,
          ServiceName: '',
          DownstreamScheme: '',
          QoSOptions: {
            ExceptionsAllowedBeforeBreaking: 0,
            DurationOfBreak: 0,
            TimeoutValue: 0
          },
          LoadBalancerOptions: {
            Type: '',
            Key: '',
            Expiry: 0
          },
          RateLimitOptions: {
            ClientWhitelist: [],
            EnableRateLimiting: false,
            Period: '',
            PeriodTimespan: 0.0,
            Limit: 0
          },
          AuthenticationOptions: {
            AuthenticationProviderKey: '',
            AllowedScopes: []
          },
          HttpHandlerOptions: {
            AllowAutoRedirect: false,
            UseCookieContainer: false,
            UseTracing: false,
            UseProxy: false
          },
          DownstreamHostAndPorts: [{
            Host: '',
            Port: 8001
          }],
          UpstreamHost: '',
          Key: '',
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
          UpstreamPathTemplate: '',
          UpstreamHost: '',
          ReRouteIsCaseSensitive: false,
          Aggregator: '',
          UpstreamHttpMethod: [],
          Priority: 0
        }],
        DynamicReRoutes: [{
          ServiceName: '',
          RateLimitRule: {
            ClientWhitelist: [],
            EnableRateLimiting: false,
            Period: '',
            PeriodTimespan: 0,
            Limit: 0
          }
        }]
      }
      return JSON.parse(JSON.stringify(templ))
    }
    this.getConsulServiceSchema = function () {
      return {
        name: '',
        id: '',
        tags: [],
        address: '127.0.0.1',
        port: 80,
        check: {
          ttl: '15s'
        }
      }
    }
    this.getOcelotTemplate = function () {
      var templ = {
        jsonString: JSON.stringify(this.getOcelotConfigurationSchema(), null, 2),
        description: '',
        version: new Date().getTime().toString()
      }
      return JSON.parse(JSON.stringify(templ))
    }
    this.getIdentityAuthOptions = function () {
      return {
        AuthScheme: 'Default',
        Authority: '',
        ApiName: '',
        ApiSecret: '',
        RoleClaimType: 'role',
        NameClaimType: 'name',
        EnableCaching: false,
        ClaimsIssuer: '',
        CacheDuration: 0,
        RequireHttpsMetadata: false,
        ForwardDefault: '',
        ForwardAuthenticate: '',
        ForwardChallenge: '',
        ForwardForbid: '',
        ForwardSignIn: '',
        ForwardSignOut: '',
        SupportedTokens: 'Both',
        TokenRetrievalOptions: {
          Source: 'FromAuthorizationHeader',
          NameOrSchema: 'Bearer'
        }
      }
    }
  }
}

export default new ModelTemplate()
