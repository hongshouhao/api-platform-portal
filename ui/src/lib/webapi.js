import IdentityClient from './identity'
import OcelotClient from './ocelot'
export default class WebAPI {
    constructor(axios) {
        axios.defaults.crossDomain = true;
        // axios.defaults.withCredentials = true;

        this.identity = new IdentityClient(axios);
        this.ocelot = new OcelotClient(axios, this.identity);
        // axios.interceptors.request.use(config => {
        //     return config;
        // }, error => {
        //     return Promise.reject(error);
        // });

        // // 配置响应拦截器 
        // axios.interceptors.response.use(res => {
        //     if (res.status >= 400) {
        //         if (res.status === 401) {
        //             //handleUnauthorized()
        //         } else if (res.status === 403) {
        //             //handleForbidden()
        //         } else {
        //             Vue.$Notice.error({
        //                 title: "服务访问失败!",
        //                 desc: error
        //             });
        //         }
        //     }
        //     else {
        //         return Promise.resolve(res);
        //     }
        // }, error => {
        //     Vue.$Notice.error({
        //         title: "服务访问失败!",
        //         desc: error
        //     });
        //     return Promise.reject(error);
        // });

    }
}

