/* globals describe, it */

var expect = require('chai').expect,
  util = require('../lib/util');

describe('Util', function () {

  describe('#convertParam', function () {

    it('should transform true and false to "YES" and "NO"', function () {
      expect(util.convertParam(true)).to.equal('YES');
      expect(util.convertParam(false)).to.equal('NO');
    });

    it('should uppercase string', function () {
      expect(util.convertParam('my_string')).to.equal('MY_STRING');
    });

    it('should do nothing on other parameters', function () {
      var object = {kung: 'foo'};
      expect(util.convertParam(object)).to.equal(object);
    });
  });
});