var Client = require('./client');

function createClient(options) {
  return new Client(options);
}

exports.Client = Client;
exports.createClient = createClient;