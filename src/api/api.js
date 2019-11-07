    import https from './httpApi';
    import qs from 'querystring';

    const http = https.HIKE_HTTP;

    const Api = {
        // 抽奖
        getLuckyDraw: async params => await http.post(`/draw`, params),

        // 重置奖
        resetDraw: async params => await http.post('/stock', params),

        // 查询奖励库存
        getStock: async params => await http.get(`/stock`, params),
    };

    export default Api;
