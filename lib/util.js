var _ = require('lodash');

function convertParam(val) {
  return val === true ? 'YES' :
    val === false ? 'NO' :
    _.isString(val) ? val.toUpperCase() :
    val;
}

exports.convertParam = convertParam;