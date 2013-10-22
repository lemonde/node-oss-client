var util = require('./util');

var fields = module.exports = {
  fields: {}
};

(function () {

  // Create a new field
  this.create = function (index, options, callback) {
    options = options || {};

    ['indexed', 'stored', 'termVector'].forEach(function (param) {
      if (options[param])
        options[param] = util.convertParam(options[param]);
    });

    this.request({
      pathname: '/services/rest/index/' + index + '/field',
      method: 'POST',
      json: options
    }, callback);
  };

  // Update an existing field
  this.update = this.create;

  // Remove an existing field
  this.destroy = function (index, field, callback) {
    this.request({
      pathname: '/services/rest/index/' + index + '/field/' + field,
      method: 'DELETE'
    }, callback);
  };

}).call(fields.fields);