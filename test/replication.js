/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Replication', function () {

  var client, request, searcher;

  beforeEach(function () {
    client = oss.createClient();
    request = sinon.stub(client, 'request');
    searcher = {
      hostname: 'searcher-oss.com',
      port: 8000
    };
  });

  describe('#createReplicationIndex', function () {

    it('should request the API to create a replication index', function () {

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

    it('should request the API to start a replication on an index', function () {
      client.replicate('my_index', searcher);

      expect(request).to.be.calledWithMatch({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/replication/run',
        search: 'name=http://searcher-oss.com:8000/my_index'
      });
    });
  });
});
