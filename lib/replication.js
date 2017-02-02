const _ = require('lodash');

const replication = module.exports = {};

(function () {

  this.createReplicationIndex = function(index, searcher, callback) {
    this.request({
      pathname: `/services/rest/index/${index}/replication`,
      method: 'PUT',
      body: {
        replicationType: 'MAIN_INDEX',
        remoteUrl: buildUrl(searcher),
        remoteIndexName: index,
        secTimeOut: 120
      }
    }, callback);
  };

  this.replicate = function(index, searcher, callback) {
    const searcherUrl = buildUrl(searcher);
    this.request({
      pathname: `/services/rest/index/${index}/replication/run`,
      method: 'PUT',
      search: `name=${searcherUrl}/${index}`
    }, callback);
  };

  function buildUrl({ protocol = 'http', hostname, port }) {
    return `${protocol}://${hostname}:${port}`;
  }

}).call(replication);
