var _ = require('lodash');

var replication = module.exports = {};

(function () {

  this.createReplicationIndex = function(index, searcher, callback) {
    this.request({
      pathname: '/services/rest/index/' + index + '/replication',
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
    var searcherUrl = buildUrl(searcher);
    this.request({
      pathname: '/services/rest/index/' + index + '/replication/run',
      method: 'PUT',
      search: 'name=' + searcherUrl + '/' + index
    }, callback);
  };

  function buildUrl(searcher) {
    return searcher.protocol || 'http' + '://' + searcher.hostname + ':' + searcher.port;
  }

}).call(replication);
