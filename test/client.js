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

  describe('#request', function () {

    beforeEach(function () {
      nock('http://localhost:9090')
        .post('/my-path')
        .reply(200, {
          foo: 'bar'
        });
    });

    it('should be possible to make a request', function (done) {
      var client = new Client();

      client.request({
        pathname: '/my-path',
        method: 'POST',
        json: {
          kung: 'foo'
        }
      }, function (err, res) {
        if (err) return done(err);

        expect(res.body).to.deep.equal({
          foo: 'bar'
        });

        done();
      });
    });
  });
});