const sha1 = require('sha1');
const config = require('../config')

module.exports = () => {
    return (req, res) => {
        console.log('我收到的请求是：', req.query);
        const { signature, timestamp, nonce, echostr } = req.query;
        const { token } = config;
        const sha = sha1([token, timestamp, nonce].sort().join(''))
        if (req.method === 'GET') {
            if (sha === signature) {
                res.send(echostr);
            } else {
                res.end('error');
            }
        } else if (req.method === 'POST') {
            if (sha !== signature) {
                res.end('error');
            }
            console.log(req.query)

        } else {
            res.end('error');
        }
    }
}