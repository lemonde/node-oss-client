var _ = require('lodash');

var indexes = module.exports = {
  indexes: {}
};

(function () {

  // Create a new index
  this.create = function (index, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    options = _.defaults(options || {}, {
      template: ''
    });

    this.request({
      pathname: '/services/rest/index/' + index + (options.template ? '/template/' + options.template : ''),
      method: 'POST'
    }, callback);
  };

  // Remove an existing index
  this.destroy = function (index, callback) {
    this.request({
      pathname: '/services/rest/index/' + index,
      method: 'DELETE'
    }, callback);
  };

}).call(indexes.indexes);