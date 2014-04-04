/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Templates', function () {

  var client, rq;

  beforeEach(function () {
    client = oss.createClient();
    rq = sinon.stub(client.templates, 'request');
  });

  describe('#createOrUpdate', function () {
    it('should be possible to create a field', function () {

      client.templates.createOrUpdate('my_index', 'my_template', {
        returnedFields: ['my_field']
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/search/field/my_template',
        json: {
          returnedFields: ['my_field']
        }
      });
    });
  });

  describe('#destroy', function () {
    it('should be possible to destroy an index', function () {

      client.templates.destroy('my_index', 'my_template');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/search/template/my_template'
      });
    });
  });

  describe('#list', function () {
    it('should be possible to list templates', function () {

      client.templates.list('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/search/template/'
      });
    });
  });

  describe('#get', function () {
    it('should be possible to get a template', function () {

      client.templates.get('my_index', 'my_template');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/search/template/my_template'
      });
    });
  });
});