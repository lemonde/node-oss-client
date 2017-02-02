/* globals describe, it, beforeEach */

const oss = require('../');

describe('Indexes', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client.indexes, 'request');
  });

  describe('#create', () => {

    it('should be possible to create an index', () => {

      client.indexes.create('my_index');

      expect(rq).to.be.calledWith({
        method: 'POST',
        pathname: '/services/rest/index/my_index'
      });
    });

    it('should be possible to create an index with a template', () => {

      client.indexes.create('my_index', { template: 'my_template' });

      expect(rq).to.be.calledWith({
        method: 'POST',
        pathname: '/services/rest/index/my_index/template/my_template'
      });
    });
  });

  describe('#exists', () => {

    it('should return if an index exists', () => {

      client.indexes.exists('my_index');

      expect(rq).to.be.calledWith({
        method: 'GET',
        pathname: '/services/rest/index/my_index'
      });
    });
  });

  describe('#destroy', () => {

    it('should be possible to destroy an index', () => {

      client.indexes.destroy('my_index');

      expect(rq).to.be.calledWith({
        method: 'DELETE',
        pathname: '/services/rest/index/my_index'
      });
    });
  });
});
