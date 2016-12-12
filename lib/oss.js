const Client = require('./client');
const util = require('./util');

// Create a new client
function createClient(options) {
  return new Client(options);
}

exports.Client = Client;
exports.createClient = createClient;
exports.util = util;