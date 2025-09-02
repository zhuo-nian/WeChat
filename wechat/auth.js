const sha1 = require('sha1');
const config = require('../config')
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils/tool')

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
            console.log(message);
            res.end('success');
        } else {
            res.end('error');
        }
    }
}