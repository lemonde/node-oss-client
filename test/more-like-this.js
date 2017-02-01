/* globals describe, it, beforeEach */

const oss = require('../');

describe('More like this', () => {

  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client, 'request');
  });

  it('should be possible to request more like this', () => {

    client.moreLikeThis('my_index', { minWordLen: 2 });

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
