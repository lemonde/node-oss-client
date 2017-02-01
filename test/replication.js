/* globals describe, it, beforeEach */

const oss = require('../');

describe('Replication', () => {

  let client, request, searcher;

  beforeEach(() => {
    client = oss.createClient();
    request = sinon.stub(client, 'request');
    searcher = { hostname: 'searcher-oss.com', port: 8000 };
  });

  describe('#createReplicationIndex', () => {

    it('should request the API to create a replication index', () => {

      client.createReplicationIndex('my_index', searcher);

      expect(request).to.be.calledWithMatch({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/replication',
        body: {
          replicationType: 'MAIN_INDEX',
          remoteUrl: 'http://searcher-oss.com:8000',
          remoteIndexName: 'my_index',
          secTimeOut: 120
        }
      });
    });

    it('should request the API to start a replication on an index', () => {
      client.replicate('my_index', searcher);

      expect(request).to.be.calledWithMatch({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/replication/run',
        search: 'name=http://searcher-oss.com:8000/my_index'
      });
    });
  });
});
