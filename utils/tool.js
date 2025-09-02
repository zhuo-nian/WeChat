module.exports = {
    getUserDataAsync (req) {
        return new Promise((resolve, reject) => {
            const xmlData = '';
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