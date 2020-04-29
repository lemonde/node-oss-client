const _ = require("lodash");

const autocompletion = (module.exports = {});

(function () {
  // Autocompletion
  this.autocompletion = function (index, item, options, callback) {
    this.request(
      {
        pathname: `/services/rest/index/${index}/autocompletion/${item}`,
        method: "GET",
        qs: _.defaults({}, options || {}, {
          prefix: "",
          rows: 10,
        }),
      },
      callback
    );
  };
}.call(autocompletion));
