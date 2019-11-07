import axios from 'axios';
import qs from 'querystring';

class HttpApi {
    constructor(props){
        this.baseURL = props.baseURL;
        return this.init();
    }
    
    init() {
        this.http = axios.create({ baseURL: this.baseURL, timeout: 20000 });
        this.interceptorsRequest();
        this.interceptorsResponse();
        
        return this.http;
    }
    
    interceptorsRequest() {
        this.http.interceptors.request.use((config) => {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            if (config.method === 'post') {
                config.data = JSON.stringify({ ...config.data});
            } else {
                config.data = qs.stringify({ ...config.data, });
            }

            return config;
        }, error => {
            return Promise.reject(error);
        });
    }
    
    interceptorsResponse(){
        this.http.interceptors.response.use((res) => {
            return res.data;
        }, error => {
            return Promise.reject(error);
        });
    }
}

const HIKE_HTTP = new HttpApi({baseURL: 'http://192.168.154.16:8088'});

export default {
    HIKE_HTTP
};
