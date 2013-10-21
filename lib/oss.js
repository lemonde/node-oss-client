var Client = require('./client');

// Create a new client
function createClient(options) {
  return new Client(options);
}

exports.Client = Client;
exports.createClient = createClient;