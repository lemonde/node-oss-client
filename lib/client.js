var request = require('request'),
  _ = require('lodash'),
  urlParser = require('url');

// Avalable APIS
var apis = ['search', 'indexes'];

// Build API
function buildApi(name) {
  _.each(require('./' + name), function (obj, name) {
    this[name] = _.isFunction(obj) ? obj.bind(this) : _.merge(Object.create(this), obj);
  }, this);
}

// Instanciate a new client with options :
// - `hostname` (default "localhost")
// - `port` (default 9090)
function Client(options) {

  this.options = _.defaults(options || {}, {
    hostname: 'localhost',
    port: 9090
  });

  _.each(apis, buildApi, this);
}

// Make an http request to defined endpoint
Client.prototype.request = function (options, callback) {

  var url = urlParser.format(_(this.options)
    .pick(['hostname', 'port', 'protocol'])
    .defaults({
      protocol: 'http',
      pathname: options.pathname
    }).value());

  request(_(options)
    .defaults({
      url: url,
      json: true
    })
    .value(), callback);
};


module.exports = Client;