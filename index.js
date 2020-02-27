/**
 * First file of the server
 * Loading esm for ESNext features
 */
require = require('esm')(module)
module.exports = require('./App.js')
