module.exports = {
    getUserDataAsync () {
        return new Promise((resolve, reject) => {
            const xmlData = '';
            req
                .on('data', data => {
                    xmlData += data;
                })
                .on('close', () => {
                    resolve(xmlData)
                })
        })
    }
}