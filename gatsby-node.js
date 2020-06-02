'use strict'
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})
const { createPages, onCreateNode } = require('./src/gatsby-node')
exports.createPages = createPages
exports.onCreateNode = onCreateNode
