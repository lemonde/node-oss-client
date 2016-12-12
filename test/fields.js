/* globals describe, it, beforeEach */

const chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Fields', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client.fields, 'request');
  });

  describe('#createOrUpdate', () => {

    it('should be possible to create a field', () => {

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

    it('should be possible to update a field', () => {

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

  describe('#destroy', () => {

    it('should be possible to destroy an index', () => {

      client.fields.destroy('my_index', 'my_field');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/field/my_field'
      });
    });
  });

  describe('#setUniqueDefault', () => {

    it('should be possible to define unique and default field', () => {

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

  describe('#list', () => {

    it('should be possible to list the fileds of an index', () => {

      client.fields.list('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/field/'
      });
    });
  });
});