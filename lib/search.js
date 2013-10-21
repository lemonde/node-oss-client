var _ = require('lodash');

function search(client) {
  return function (index, options, callback) {
    options = _.defaults(options || {}, {
      type: 'field'
    });

    client.request({
      pathname: '/services/rest/index/' + index + '/search/' + options.type,
      method: 'POST',
      json: _.omit(options, 'type')
    }, callback);
  };
}

module.exports = search;
