var util = require('./util');

var fields = module.exports = {
  fields: {}
};

(function () {

  // Create or update a new field
  this.createOrUpdate = function (index, options, callback) {
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

  // Aliases
  this.update = this.create = this.createOrUpdate;

  // Remove an existing field
  this.destroy = function (index, field, callback) {
    this.request({
      pathname: '/services/rest/index/' + index + '/field/' + field,
      method: 'DELETE'
    }, callback);
  };

  // Set the unique and the default fields
  this.setUniqueDefault = function (index, options, callback) {
    this.request({
      pathname: '/services/rest/index/' + index + '/field',
      method: 'POST',
      qs: options
    }, callback);
  };

  // list fields
  this.list = function (index, callback) {
    this.request({
      pathname: '/services/rest/index/' + index + '/field/',
      method: 'GET'
    }, callback);
  };

}).call(fields.fields);