/* globals describe, it, beforeEach */

var chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  sinon = require('sinon'),
  searchFactory = require('../lib/search');

describe('Search', function () {

  var client, search;

  beforeEach(function () {
    client = {
      request: sinon.spy()
    };

    search = searchFactory(client);
  });

  it('should be possible to make a search', function () {

    var callback = function () {};

    search('my_index', {
      query: 'My query'
    }, callback);

    expect(client.request).to.be.calledWith({
      json: {
        query: 'My query'
      },
      method: 'POST',
      pathname: '/services/rest/index/my_index/search/field'
    }, callback);
  });
});