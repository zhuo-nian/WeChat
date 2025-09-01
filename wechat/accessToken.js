const { appID, appsecret } = require('../config');
const axios = require('axios');

class WeChat {

    constructor() {

    }

    getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
        return axios.get(url).then(res => {
            console.log('获取accession——token成功：', res.data);
            return res.data;
        }).catch(err => {
            console.log(err);
            return Promise.reject('获取accession——token失败：', err);
        });

    }

}

const weChat = new WeChat();
weChat.getAccessToken();