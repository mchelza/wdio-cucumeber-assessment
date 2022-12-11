const baseConfig = require('../wdio.conf')
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    baseUrl: "https://www.anz.com.au",
    specs: [
        // '../features/weatherStationAPI.feature'
        '../features/borrowingCalculator.feature'
    ]
})