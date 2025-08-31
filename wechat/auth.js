const sha1 = require('sha1');
const config = require('../config')

module.exports = () => {
    return (req, res) => {
        console.log('我收到的请求是：', req.query);
        const { signature, timestamp, nonce, echostr } = req.query;
        const { token } = config;
        const arr = [token, timestamp, nonce].sort();
        const str = arr.join('');
        const sha = sha1(str);
        if (sha === signature) {
            res.send(echostr);
            console.log('微信验证成功');
        } else {
            res.end('error');
            console.log('微信验证失败');
        }
    }
}