/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Documents', function () {

  var client, rq;

  beforeEach(function () {
    client = oss.createClient();
    rq = sinon.stub(client.documents, 'request');
  });

  describe('#createOrUpdate', function () {

    it('should be possible to create a single document', function () {

      client.documents.createOrUpdate('my_index', {
        fields: [
          {name: 'id', value: 1},
          {name: 'text', value: 'my value'}
        ]
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              {name: 'id', value: 1},
              {name: 'text', value: 'my value'}
            ]
          }
        ]
      });
    });

    it('should be possible to create multiple documents', function () {

      client.documents.createOrUpdate('my_index', [
        {
          fields: [
            {name: 'id', value: 1},
            {name: 'text', value: 'my value'}
          ]
        },
        {
          fields: [
            {name: 'id', value: 2},
            {name: 'text', value: 'my second value'}
          ]
        }
      ]);

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              {name: 'id', value: 1},
              {name: 'text', value: 'my value'}
            ]
          },
          {
            fields: [
              {name: 'id', value: 2},
              {name: 'text', value: 'my second value'}
            ]
          }
        ]
      });
    });

    it('should be possible to update a single document', function () {

      client.documents.createOrUpdate('my_index', {
        fields: [
          {name: 'id', value: 1},
          {name: 'text', value: 'my new value'}
        ]
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              {name: 'id', value: 1},
              {name: 'text', value: 'my new value'}
            ]
          }
        ]
      });
    });
  });

  describe('#destroy', function () {

    it('should be possible to destroy an index', function () {

      client.documents.destroy('my_index', {
        field: 'id',
        values: 1
      });

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/document/id',
        json: [1]
      });
    });
  });
});