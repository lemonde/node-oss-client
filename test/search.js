/* globals describe, it, beforeEach */

const chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  oss = require('../');

describe('Search', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client, 'request');
  });

  it('should be possible to make a search', () => {

    client.search('my_index', {
      query: 'My query'
    });

    expect(rq).to.be.calledWith({
      json: {
        query: 'My query'
      },
      method: 'POST',
      pathname: '/services/rest/index/my_index/search/field'
    });
  });
});