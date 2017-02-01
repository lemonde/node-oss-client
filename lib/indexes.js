const _ = require('lodash');

const indexes = module.exports = { indexes: {} };

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

    const { template } = options;
    const templateQueryString = template ? '/template/' + template : '';

    this.request({
      pathname: `/services/rest/index/${index}${templateQueryString}`,
      method: 'POST'
    }, callback);
  };

  // Test if index exists
  this.exists = function (index, callback) {
    this.request({
      pathname: `/services/rest/index/${index}`,
      method: 'GET'
    }, callback);
  };

  // Remove an existing index
  this.destroy = function (index, callback) {
    this.request({
      pathname: `/services/rest/index/${index}`,
      method: 'DELETE'
    }, callback);
  };

}).call(indexes.indexes);
