const express = require('express');
const sha1 = require('sha1');
const config = require('./config')
const app = express();


app.use((req, res) => {
    console.log('我收到的请求是：', req.query);
    const {signature, timestamp, nonce, echostr} = req.query;
    const {token} = config;
    const arr = [token, timestamp, nonce].sort();
    const str = arr.join('');
    const sha = sha1(str);
    if(sha === signature) {
        res.send(echostr);
        console.log('微信验证成功');
    } else {
        res.end('error');
        console.log('微信验证失败');
    }
})

app.listen(3000, () => { console.log('服务器启动成功~'); });