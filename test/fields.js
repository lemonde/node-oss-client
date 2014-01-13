/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Fields', function () {

  var client, rq;

  beforeEach(function () {
    client = oss.createClient();
    rq = sinon.stub(client.fields, 'request');
  });

  describe('#createOrUpdate', function () {

    it('should be possible to create a field', function () {

      client.fields.createOrUpdate('my_index', {
        name: 'my_field',
        stored: true
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/field/my_field',
        json: {
          name: 'my_field',
          stored: 'YES'
        }
      });
    });

    it('should be possible to update a field', function () {

      client.fields.createOrUpdate('my_index', {
        name: 'my_field',
        stored: true
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/field/my_field',
        json: {
          name: 'my_field',
          stored: 'YES'
        }
      });
    });
  });

  describe('#destroy', function () {

    it('should be possible to destroy an index', function () {

      client.fields.destroy('my_index', 'my_field');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/field/my_field'
      });
    });
  });

  describe('#setUniqueDefault', function () {

    it('should be possible to define unique and default field', function () {

      client.fields.setUniqueDefault('my_index', {
        default: 'my_default_field',
        unique: 'my_unique_field'
      });

      expect(rq).to.be.calledWith({
        method: 'POST',
        pathname: '/services/rest/index/my_index/field',
        qs: {
          default: 'my_default_field',
          unique: 'my_unique_field'
        }
      });
    });
  });

  describe('#list', function () {

    it('should be possible to list the fileds of an index', function () {

      client.fields.list('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/field/'
      });
    });
  });
});