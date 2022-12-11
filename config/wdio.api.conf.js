const baseConfig = require('../wdio.conf')
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    logLevel: 'info',
    specs: [
        '../test/features/weatherStationAPI.feature'
    ]
})