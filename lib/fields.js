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

}).call(fields.fields);