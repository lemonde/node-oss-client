const request = require('request'),
  _ = require('lodash'),
  _s = require('underscore.string'),
  urlParser = require('url');

// Avalable APIS
const apis = ['search', 'moreLikeThis', 'indexes', 'fields', 'documents', 'templates'];

// Build API
function buildApi(name) {
  _.each(require('./' + _s.dasherize(name)), (obj, name) => {
    this[name] = _.isFunction(obj) ? obj.bind(this) : _.merge(Object.create(this), obj);
  }, this);
}

class Client {
  // Instanciate a new client with options :
  // - `hostname` (default "localhost")
  // - `port` (default 9090)
  constructor(options) {
    this.options = _.defaults(options || {}, {
      hostname: 'localhost',
      query: _.pick(options, 'login', 'key'),
      port: 9090
    });

    _.each(apis, buildApi, this);
  }

  // Make an http request to defined endpoint
  request(options, callback) {
    const url = urlParser.format(
      _(this.options)
      .pick(['hostname', 'port', 'protocol', 'query'])
      .defaults({
        protocol: 'http',
        pathname: options.pathname
      })
      .value()
    );

    request(
      _(options)
      .defaults({
        url: url,
        json: true
      })
      .value(), (err, res, body) => {
        if (err) {
          let message = err.message;

          if (err.code === 'ECONNREFUSED') {
            message = 'Cannot connect to OpenSearchServer at ' + url;
          }

          // in all cases, we generate a new complete stacktrace, otherwise
          // stack trace is too short
          return callback(new Error(message));
        }

        if (res.statusCode >= 200 && res.statusCode <= 299) {
          return callback(null, body);
        }

        callback(new Error(body));
      }
    );
  }
}


module.exports = Client;