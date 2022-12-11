const baseConfig = require('../wdio.conf')
const merge = require('deepmerge')

exports.config= merge(baseConfig.config,{
    specs: [
        '../test/features/borrowingCalculator.feature'
    ]
})