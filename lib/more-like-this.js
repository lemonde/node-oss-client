const _ = require("lodash");

const moreLikeThis = (module.exports = {});

(function () {
  // More like this
  this.moreLikeThis = function (index, options, callback) {
    this.request(
      {
        pathname: `/services/rest/index/${index}/morelikethis`,
        method: "POST",
        json: _.defaults({}, options || {}, {
          analyzerName: "StandardAnalyzer",
          lang: "ENGLISH",
          minWordLen: 1,
          maxWordLen: 100,
          minDocFreq: 1,
          minTermFreq: 1,
          maxNumTokensParsed: 5000,
          maxQueryTerms: 25,
          stopWords: "English stop words",
          start: 0,
          rows: 10,
        }),
      },
      callback
    );
  };
}.call(moreLikeThis));
