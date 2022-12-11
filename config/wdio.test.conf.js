const baseConfig = require('../wdio.conf')
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    apiUrl: "http://api.openweathermap.org",
    specs: [
        '../features/weatherStationAPI.feature'
        // '../features/borrowingCalculator.feature'
    ]
})