const sha1 = require('sha1');
const axios = require('axios');
const config = require('../config')
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils/tool')
const template = require('./template');

const url = 'https://v3.alapi.cn/api/zaobao';
const requestData = {
  token: '0AlVLGpjYqgCD0mP',
  format: 'json'
};

module.exports = () => {
    return async (req, res) => {
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
                return res.end('error');
            }
            const xmlData = await getUserDataAsync(req);
            const jsData = await parseXMLAsync(xmlData);
            const message = formatMessage(jsData);
            let options = {
                toUserName: message.ToUserName,
                fromUserName: message.FromUserName,
                createTime: Date.now(),
                msgType: 'text',
            }
            let content = '你说的 ' + message.Content + ' 太复杂了，我还不太懂。';
            if (message.MsgType === 'text') {
                if (message.Content === '每日新闻') {
                    const a = await axios.post(url, requestData);
                    console.log(a.data);
                    content = '我将发送每日新闻图片';
                }
            }
            options.content = content;
            const replyMessage = template(options);
            console.log(replyMessage);
            res.send(replyMessage);
        } else {
            res.end('error');
        }
    }
}