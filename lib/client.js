const request = require("request");
const _ = require("lodash");
const _s = require("underscore.string");
const urlParser = require("url");

const { parseHtmlError } = require("./util");

// Avalable APIS
const apis = [
  "search",
  "moreLikeThis",
  "indexes",
  "fields",
  "documents",
  "templates",
  "replication",
  "autocompletion",
];

// Build API
function buildApi(name, instance) {
  _.each(require("./" + _s.dasherize(name)), (obj, name) => {
    instance[name] = _.isFunction(obj)
      ? obj.bind(instance)
      : _.merge(Object.create(instance), obj);
  });
}

// Instanciate a new client with options :
// - `hostname` (default "localhost")
// - `port` (default 9090)
function Client(options) {
  this.options = _.defaults(options || {}, {
    hostname: "localhost",
    query: _.pick(options, "login", "key"),
    port: 9090,
  });

  apis.forEach((apiName) => {
    buildApi(apiName, this);
  });
}

// Make an http request to defined endpoint
Client.prototype.request = function (options, callback) {
  const url = urlParser.format(
    _(this.options)
      .pick(["hostname", "port", "protocol", "query"])
      .defaults({
        protocol: "http",
        pathname: options.pathname,
        search: options.search,
        body: options.body,
      })
      .value()
  );

  request(
    _(options)
      .defaults({
        url,
        json: true,
      })
      .value(),
    (err, res, body) => {
      if (err) {
        let message = err.message;

        if (err.code === "ECONNREFUSED") {
          message = "Cannot connect to OpenSearchServer at " + url;
        }

        // in all cases, we generate a new complete stacktrace, otherwise
        // stack trace is too short
        callback(new Error(message));
        return;
      }

      if (res.statusCode >= 200 && res.statusCode <= 299) {
        callback(null, body);
        return;
      }

      callback(parseHtmlError(body));
    }
  );
};

module.exports = Client;
