const axios = require('axios');
const fs = require('fs').promises

const { appID, appsecret } = require('../config');

class WeChat {

    constructor() {

    }

    async getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
        try {
            const res = await axios.get(url)
            console.log('获取accessionToken成功：', res.data);
            res.data.expires_in = Date.now() + (res.data.expires_in - 20) * 1000;
            return res.data
        } catch (error) {
            console.log('获取accessionToken失败：', error);
            throw error
        }
    }

    async saveAccessToken(accessToken) {
        try {
            await fs.writeFile('./accessToken.txt', JSON.stringify(accessToken));
            console.log('文件保存成功~');
        } catch (error) {
            console.log('获取accessionToken失败：', error);
            throw error
        }
    }

    async readAccessToken() {
        try {
            const data = await fs.readFile('./accessToken.txt');
            console.log('文件读取成功~')
            return JSON.parse(data);
        } catch (error) {
            console.log('readAccessToken出了问题：', error);
            throw error
        }
    }

    isValidAccessToken(data) {
        if (!data || !data.access_token || !data.expires_in) {
            return false;
        }
        return data.expires_in > Date.now();
    }

    async fetchAccessToken() {
        try {
            const data = await this.readAccessToken();
            if (this.isValidAccessToken(data)) {
                return data.access_token
            } else {
                data = await this.getAccessToken();
                await this.saveAccessToken(data);
                return data.access_token
            }
        } catch (error) {
            const data = await this.getAccessToken();
            await this.saveAccessToken(data);
            return data.access_token
        }
    }
}