/* globals describe, it, beforeEach */

var expect = require('chai').expect,
  nock = require('nock'),
  Client = require('../lib/client');

describe('Client', function () {

  it('should have default options', function () {
    var client = new Client();
    expect(client.options).to.have.property('hostname');
    expect(client.options).to.have.property('port');
  });

  it('should work with privileges too', function() {
    var client = new Client({
      login: 'mylogin',
      key: 'MYKEY1811LKJA120918230129de7c77'
    });
    nock('http://localhost:9090')
      .post('/my-path')
      .reply(200, {
        foo: 'bar'
      });
    nock('http://localhost:9090')
      .post('/my-error-path')
      .reply(400, 'My error');

    nock('http://localhost:9090')
      .post('/my-internal-error-path')
      .reply(500);
  });

  describe('#request', function () {
    var client;

    beforeEach(function () {
      client = new Client();

      nock('http://localhost:9090')
        .post('/my-path')
        .reply(200, {
          foo: 'bar'
        });

      nock('http://localhost:9090')
        .post('/my-error-path')
        .reply(400, 'My error');

      nock('http://localhost:9090')
        .post('/my-internal-error-path')
        .reply(500);

    });


    it('should be possible to make a request', function (done) {

      client.request({
        pathname: '/my-path',
        method: 'POST'
      }, function (err, res) {
        if (err) return done(err);

        expect(res).to.deep.equal({
          foo: 'bar'
        });

        done();
      });
    });

    it('should handle error correctly', function (done) {

      client.request({
        pathname: '/my-error-path',
        method: 'POST'
      }, function (err, res) {
        expect(err instanceof Error).to.be.true;
        expect(err.message).to.be.equal('My error');
        expect(res).to.be.undefined;

        done();
      });
    });

    it('should handle OSS internal error correctly', function (done) {

      client.request({
        pathname: '/my-internal-error-path',
        method: 'POST'
      }, function (err, res) {
        expect(err instanceof Error).to.be.true;
        expect(err.message).to.be.equal('');
        expect(res).to.be.undefined;

        done();
      });
    });

    describe('when the server is not reachable', function() {

      beforeEach(function() {
        client = new Client({
          hostname: 'localhost',
          port: 99999999
        });
      });

      it('gives a usefull error message', function(done) {
        client.request({
          pathname: '/my-path',
          method: 'POST'
        }, function(err) {
          var msg = 'Cannot connect to OpenSearchServer at http://localhost:99999999/my-path';
          expect(err.message).to.equals(msg);
          done();
        });
      });
    });

  });

  describe('instances', function () {

    beforeEach(function () {
      nock('http://host1:9090')
        .get('/x')
        .reply(200, {
          host: 1
        });

      nock('http://host2:9090')
        .get('/x')
        .reply(200, {
          host: 2
        });
    });

    it('must be independent', function () {
      var client1 = new Client({
        hostname: 'host1'
      });

      var client2 = new Client({
        hostname: 'host2'
      });

      client1.indexes.request({
        pathname: 'x'
      }, function (err, res) {
        expect(res).to.deep.equal({
          host: 1
        });
      });

      client2.indexes.request({
        pathname: 'x'
      }, function (err, res) {
        expect(res).to.deep.equal({
          host: 2
        });
      });
    });
  });
});