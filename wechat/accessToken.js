const { appId, appsecret } = require('../config');
const axios = require('axios');

class WeChat {

    constructor() {

    }

    getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`;
        return axios.get(url).then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
            console.log(err);
            return Promise.reject(err);
        });

    }

}