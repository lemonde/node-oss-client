const _ = require('lodash');

const search = module.exports = {};

(function () {

  // Search
  this.search = function (index, options, callback) {
    options = _.defaults(options || {}, {
      type: 'field'
    });

    this.request({
      pathname: '/services/rest/index/' + index + '/search/' + options.type,
      method: 'POST',
      json: _.omit(options, 'type')
    }, callback);
  };

}).call(search);