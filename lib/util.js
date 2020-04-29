const _ = require("lodash");

function convertParam(val) {
  return val === true
    ? "YES"
    : val === false
    ? "NO"
    : _.isString(val)
    ? val.toUpperCase()
    : val;
}

function parseHtmlError(message) {
  if (typeof message !== "string") return new Error(message);

  const match = message.match(/(?<=h1>)(.+?)(?=<\/h1>)/);
  if (!match) return new Error(message);

  return new Error(match[0]);
}

exports.convertParam = convertParam;
exports.parseHtmlError = parseHtmlError;
