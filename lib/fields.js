var util = require('./util');

var fields = module.exports = {
  fields: {}
};

(function () {

  // Create a new field
  this.create = function (index, options, callback) {
    options = options || {};

    ['indexed', 'stored', 'termVector'].forEach(function (param) {
      if (typeof options[param] !== 'undefined')
        options[param] = util.convertParam(options[param]);
    });

    this.request({
      pathname: '/services/rest/index/' + index + '/field/' + options.name,
      method: 'PUT',
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