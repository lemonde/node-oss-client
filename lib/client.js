var request = require('request'),
  _ = require('lodash'),
  urlParser = require('url');

var Client = function (options) {
  this.options = _.defaults(options || {}, {
    hostname: 'localhost',
    port: 9090
  });
};

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


var searchFactory = require('./search');

Client.prototype.search = function () {
  searchFactory(this).apply(this, arguments);
};


module.exports = Client;