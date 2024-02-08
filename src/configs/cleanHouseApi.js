const axios = require('axios').default

const cleanHouseApi = axios.create({
    baseURL: 'http://192.168.1.107:8980'
})

module.exports = cleanHouseApi