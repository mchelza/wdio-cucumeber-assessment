const baseConfig = require('../wdio.conf')
// import baseConfig from '../wdio.conf.js';
// import merge from 'deepmerge';
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    apiUrl: "http://api.openweathermap.org",
    specs: [
        // '../features/weatherStationAPI.feature'
        '../features/borrowingCalculator.feature'
    ]
})