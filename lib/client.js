var request = require('request'),
  _ = require('lodash'),
  urlParser = require('url');

// Avalable APIS
var apis = ['search', 'indexes', 'fields', 'documents', 'templates'];

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
    .value(), function (err, res, body) {
      if (err) {
        var message = err.message;

        if (err.code === 'ECONNREFUSED') {
          message = 'Cannot connect to OpenSearchServer at ' + url;
        }

        // in all cases, we generate a new complete stacktrace, otherwise
        // stack trace is too short
        return callback(new Error(message));
      }

      if (res.statusCode >= 200 && res.statusCode <= 299)
        return callback(null, body);

      callback(new Error(body));
    });
};


module.exports = Client;