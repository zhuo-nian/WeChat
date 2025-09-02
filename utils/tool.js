module.exports = {
    getUserDataAsync (req) {
        return new Promise((resolve, reject) => {
            const xmlData = '';
            req
                .on('data', data => {
                    xmlData += data.tostring();
                })
                .on('close', () => {
                    resolve(xmlData)
                })
        })
    }
}