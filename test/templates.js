/* globals describe, it, beforeEach */

const oss = require('../');

describe('Templates', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client.templates, 'request');
  });

  describe('#createOrUpdate', () => {
    it('should be possible to create a field', () => {

      client.templates.createOrUpdate('my_index', 'my_template', {
        returnedFields: ['my_field']
      });

      expect(rq).to.be.calledWith({
        method: 'PUT',
        pathname: '/services/rest/index/my_index/search/field/my_template',
        json: { returnedFields: ['my_field'] }
      });
    });
  });

  describe('#destroy', () => {
    it('should be possible to destroy an index', () => {

      client.templates.destroy('my_index', 'my_template');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index/search/template/my_template'
      });
    });
  });

  describe('#list', () => {
    it('should be possible to list templates', () => {

      client.templates.list('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/search/template/'
      });
    });
  });

  describe('#get', () => {
    it('should be possible to get a template', () => {

      client.templates.get('my_index', 'my_template');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index/search/template/my_template'
      });
    });
  });
});
