const _ = require("lodash");
const cheerio = require('cheerio');

function convertParam(val) {
  return val === true
    ? "YES"
    : val === false
      ? "NO"
      : _.isString(val)
        ? val.toUpperCase()
        : val;
}

function parseHtmlError(htmlError) {
  const $ = cheerio.load(htmlError);

  const match = $("h1")
    .text()
    .match(/([\d]{3})/);
  const status = parseInt(match, 10);

  return new Error({
    status,
    message: $("b:contains('message')")
      .siblings("u")
      .text(),
    stack: $("pre").text()
  });
}

exports.convertParam = convertParam;
exports.parseHtmlError = parseHtmlError;
