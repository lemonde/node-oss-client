var _ = require('lodash');

var documents = module.exports = {
  documents: {}
};

(function () {

  // Create documents
  this.create = function (index, docs, callback) {
    if (! _.isArray(docs)) docs = [docs];

    this.request({
      pathname: '/services/rest/index/' + index + '/document',
      method: 'PUT',
      json: docs
    }, callback);
  };

  // Update documents
  this.update = this.create;

  // Remove documents
  this.destroy = function (index, options, callback) {
    if (! _.isArray(options.values)) options.values = [options.values];

    this.request({
      pathname: '/services/rest/index/' + index + '/document/' + options.field,
      method: 'DELETE',
      json: options.values
    }, callback);
  };

}).call(documents.documents);