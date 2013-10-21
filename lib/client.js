var request = require('request'),
  _ = require('lodash'),
  urlParser = require('url');

// Avalaible APIS
var apis = ['search', 'indexes'];

// Build API
function buildApi(name) {
  var api = require('./' + name);

  _.each(api, function (obj) {
    if (_.isFunction(obj)) return ;
    obj.request = this.request.bind(this);
  }, this);

  _.extend(this, api);
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

// Make an http request on defined endpoint
Client.prototype.request = function (options, callback) {

  var url = urlParser.format(_(this.options)
    .pick(['hostname', 'port', 'protocol'])
    .defaults({
      protocol: 'http',
      pathname: options.pathname
    }).value());

  request(_(options)
    .omit(['hostname', 'port', 'protocol'])
    .defaults({
      url: url,
      json: true
    })
    .value(), callback);
};


module.exports = Client;