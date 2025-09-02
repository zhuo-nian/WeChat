module.exports = {
    getUserDataAsync (req) {
        return new Promise((resolve, reject) => {
            let xmlData = '';
            req
                .on('data', data => {
                    xmlData += data.toString();
                })
                .on('close', () => {
                    resolve(xmlData)
                })
        })
    }
}