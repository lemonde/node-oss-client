'use strict';

/* globals describe, it, beforeEach */

var oss = require('../');
var chai = require('chai').use(require('sinon-chai'));
var sinon = require('sinon');
var expect = chai.expect;

describe('More like this', function () {

  var client, rq;

  beforeEach(function () {
    client = oss.createClient();
    rq = sinon.stub(client, 'request');
  });

  it('should be possible to request more like this', function () {

    client.moreLikeThis('my_index', {
      minWordLen: 2
    });

    expect(rq).to.be.calledWith({
      json: {
        analyzerName: 'StandardAnalyzer',
        lang: 'ENGLISH',
        minWordLen: 2,
        maxWordLen: 100,
        minDocFreq: 1,
        minTermFreq: 1,
        maxNumTokensParsed: 5000,
        maxQueryTerms: 25,
        stopWords: 'English stop words',
        start: 0,
        rows: 10
      },
      method: 'POST',
      pathname: '/services/rest/index/my_index/morelikethis'
    });
  });
});