const _ = require("lodash");

const autocompletion = (module.exports = {});

(function () {
  // Autocompletion
  this.autocompletion = function (index, item, options, callback) {

    options = options || {};
    let timeout = options['timeout'] || 180000;

    this.request(
      {
        pathname: `/services/rest/index/${index}/autocompletion/${item}`,
        method: "GET",
        timeout: timeout,
        qs: _.defaults({}, _.omit(options, 'timeout'), {
          prefix: "",
          rows: 10,
        }),
      },
      callback
    );
  };
}.call(autocompletion));
