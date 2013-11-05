/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Indexes', function () {

  var client, rq;

  beforeEach(function () {
    client = oss.createClient();
    rq = sinon.stub(client.indexes, 'request');
  });

  describe('#create', function () {

    it('should be possible to create an index', function () {

      client.indexes.create('my_index');

      expect(rq).to.be.calledWith({
        method: 'POST',
        pathname: '/services/rest/index/my_index'
      });
    });

    it('should be possible to create an index with a template', function () {

      client.indexes.create('my_index', {
        template: 'my_template'
      });

      expect(rq).to.be.calledWith({
        method: 'POST',
        pathname: '/services/rest/index/my_index/template/my_template'
      });
    });
  });

  describe('#exists', function () {

    it('should return if an index exists', function () {

      client.indexes.exists('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index'
      });
    });
  });

  describe('#destroy', function () {

    it('should be possible to destroy an index', function () {

      client.indexes.destroy('my_index');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index'
      });
    });
  });
});