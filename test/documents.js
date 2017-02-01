/* globals describe, it, beforeEach */

const oss = require('../');

describe('Documents', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client.documents, 'request');
  });

  describe('#createOrUpdate', () => {

    it('should be possible to create a single document', () => {

      client.documents.createOrUpdate('my_index', {
        fields: [
          { name: 'id', value: 1 },
          { name: 'text', value: 'my value' }
        ]
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              { name: 'id', value: 1 },
              { name: 'text', value: 'my value' }
            ]
          }
        ]
      });
    });

    it('should be possible to create multiple documents', () => {

      client.documents.createOrUpdate('my_index', [
        {
          fields: [
            { name: 'id', value: 1 },
            { name: 'text', value: 'my value' }
          ]
        },
        {
          fields: [
            { name: 'id', value: 2 },
            { name: 'text', value: 'my second value' }
          ]
        }
      ]);

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              { name: 'id', value: 1 },
              { name: 'text', value: 'my value' }
            ]
          },
          {
            fields: [
              { name: 'id', value: 2 },
              { name: 'text', value: 'my second value' }
            ]
          }
        ]
      });
    });

    it('should be possible to update a single document', () => {

      client.documents.createOrUpdate('my_index', {
        fields: [
          { name: 'id', value: 1 },
          { name: 'text', value: 'my new value' }
        ]
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/document',
        json: [
          {
            fields: [
              { name: 'id', value: 1 },
              { name: 'text', value: 'my new value' }
            ]
          }
        ]
      });
    });
  });

  describe('#destroy', () => {

    it('should be possible to destroy an index', () => {

      client.documents.destroy('my_index', { field: 'id', values: 1 });

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/document/id',
        json: [1]
      });
    });
  });
});
