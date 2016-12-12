/* globals describe, it */

const expect = require('chai').expect,
  util = require('../lib/util');

describe('Util', () => {

  describe('#convertParam', () => {

    it('should transform true and false to "YES" and "NO"', () => {
      expect(util.convertParam(true)).to.equal('YES');
      expect(util.convertParam(false)).to.equal('NO');
    });

    it('should uppercase string', () => {
      expect(util.convertParam('my_string')).to.equal('MY_STRING');
    });

    it('should do nothing on other parameters', () => {
      var object = {kung: 'foo'};
      expect(util.convertParam(object)).to.equal(object);
    });
  });
});