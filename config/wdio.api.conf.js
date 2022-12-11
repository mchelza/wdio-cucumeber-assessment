const baseConfig = require('../wdio.conf')
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    specs: [
        '../features/weatherStationAPI.feature'
    ],
    headless:true
})