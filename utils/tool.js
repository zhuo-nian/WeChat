const {parseString} = require('xml2js');

module.exports = {
    getUserDataAsync (req) {
        return new Promise((resolve, reject) => {
            let xmlData = '';
            req
                .on('data', data => {
                    xmlData += data.toString();
                })
                .on('end', () => {
                    resolve(xmlData)
                })
        })
    },
    parseXMLAsync (xmlData) {
        return new Promise((resolve, reject) => {
            parseString(xmlData, {trim: true}, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },
    formatMessage (jsData) {
        let message = {};
        jsData = jsData.xml;
        if (typeof jsData === 'object') {
            for (let key in jsData) {
                let value = jsData[key];
                if (Array.isArray(value) && value.length > 0) {
                    message[key] = value[0];
                }
            }
        }
        return message;
    }
}