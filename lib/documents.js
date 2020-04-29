const _ = require("lodash");

const documents = (module.exports = {
  documents: {},
});

(function () {
  // Create or update documents
  this.createOrUpdate = function (index, docs, callback) {
    if (!_.isArray(docs)) docs = [docs];

    this.request(
      {
        pathname: "/services/rest/index/" + index + "/document",
        method: "PUT",
        json: docs,
      },
      callback
    );
  };

  // Aliases
  this.update = this.create = this.createOrUpdate;

  // Remove documents
  this.destroy = function (index, options, callback) {
    if (!_.isArray(options.values)) options.values = [options.values];

    this.request(
      {
        pathname:
          "/services/rest/index/" + index + "/document/" + options.field,
        method: "DELETE",
        json: options.values,
      },
      callback
    );
  };
}.call(documents.documents));
