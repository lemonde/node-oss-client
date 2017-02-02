/* globals describe, it, beforeEach */

const nock = require('nock');
const Client = require('../lib/client');

nock.enableNetConnect();

describe('Client', () => {

  it('should have default options', () => {
    const client = new Client();
    expect(client.options).to.have.property('hostname');
    expect(client.options).to.have.property('port');
  });

  describe('#request', () => {
    describe('without credentials', () => {
      let client;

      beforeEach(() => {
        client = new Client();

        nock('http://localhost:9090')
          .post('/my-path')
          .reply(200, { foo: 'bar' });

        nock('http://localhost:9090')
          .post('/my-error-path')
          .reply(400, 'My error');

        nock('http://localhost:9090')
          .post('/my-internal-error-path')
          .reply(500);

      });

      it('should be possible to make a request', done => {

        client.request({ pathname: '/my-path', method: 'POST' }, (err, res) => {
          if (err) return done(err);

          expect(res).to.deep.equal({ foo: 'bar' });
          done();
        });
      });

      it('should handle error correctly', done => {

        client.request({ pathname: '/my-error-path', method: 'POST' }, (err, res) => {
          expect(err instanceof Error).to.be.true;
          expect(err.message).to.be.equal('My error');
          expect(res).to.be.undefined;

          done();
        });
      });

      it('should handle OSS internal error correctly', done => {

        client.request({ pathname: '/my-internal-error-path', method: 'POST' }, (err, res) => {
          expect(err instanceof Error).to.be.true;
          expect(err.message).to.be.equal('');
          expect(res).to.be.undefined;

          done();
        });
      });

      describe('when the server is not reachable', () => {

        beforeEach(() => {
          client = new Client({ hostname: 'localhost', port: 8080 });
        });

        it('gives a usefull error message', done => {
          client.request({ pathname: '/my-path', method: 'POST' }, err => {
            const msg = 'Cannot connect to OpenSearchServer at http://localhost:8080/my-path';
            expect(err.message).to.equals(msg);
            done();
          });
        });
      });
    });

    describe('with credentials', () => {
      let client;

      beforeEach(() => {
        client = new Client({ login: 'mylogin', key: 'mykey' });

        nock('http://localhost:9090')
          .post('/my-path?login=mylogin&key=mykey')
          .reply(200, { foo: 'bar' });
      });

      it('should be possible to make a request', done => {
        client.request({ pathname: '/my-path', method: 'POST' }, (err, res) => {
          if (err) return done(err);
          expect(res).to.deep.equal({ foo: 'bar' });
          done();
        });
      });
    });
  });

  describe('instances', () => {

    beforeEach(() => {
      nock('http://host1:9090')
        .get('/x')
        .reply(200, { host: 1 });

      nock('http://host2:9090')
        .get('/x')
        .reply(200, { host: 2 });
    });

    it('must be independent', () => {
      const client1 = new Client({ hostname: 'host1' });
      const client2 = new Client({ hostname: 'host2' });

      client1.indexes.request({ pathname: 'x' }, (err, res) => {
        expect(res).to.deep.equal({ host: 1 });
      });

      client2.indexes.request({ pathname: 'x' }, function (err, res) {
        expect(res).to.deep.equal({ host: 2 });
      });
    });
  });
});
