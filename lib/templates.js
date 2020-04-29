const _ = require("lodash");

const templates = (module.exports = { templates: {} });

(function () {
  // Get a search template.
  this.get = function (index, name, callback) {
    this.request(
      {
        pathname: `/services/rest/index/${index}/search/template/${name}`,
        method: "GET",
      },
      callback
    );
  };

  // List all search templates.
  this.list = function (index, callback) {
    this.request(
      {
        pathname: `/services/rest/index/${index}/search/template/`,
        method: "GET",
      },
      callback
    );
  };

  // Create a new search template.
  this.createOrUpdate = function (index, name, options, callback) {
    options = _.defaults(options || {}, {
      type: "field",
    });

    this.request(
      {
        pathname: `/services/rest/index/${index}/search/${options.type}/${name}`,
        method: "PUT",
        json: _.omit(options, "type"),
      },
      callback
    );
  };

  // Aliases
  this.update = this.create = this.createOrUpdate;

  // Remove an existing template.
  this.destroy = function (index, name, callback) {
    this.request(
      {
        pathname: `/services/rest/index/${index}/search/template/${name}`,
        method: "DELETE",
      },
      callback
    );
  };
}.call(templates.templates));
