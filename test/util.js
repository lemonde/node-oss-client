/* globals describe, it */

const util = require('../lib/util');

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
      const object = { kung: 'foo' };
      expect(util.convertParam(object)).to.equal(object);
    });
  });

  describe('#parseHtmlError', () => {
    it('should return erro if not a string', () => {
      const err = util.parseHtmlError(500)
      expect(err instanceof Error).to.be.true;
      expect(err.message).to.be.equal('500');
    });

    it('should extract message from html', () => {
      const htmlError = '<html><body><h1>My error</h1></body></html>'
      const err = util.parseHtmlError(htmlError)
      expect(err instanceof Error).to.be.true;
      expect(err.message).to.be.equal('My error');
    });

    it('should return raw message if not html', () => {
      const err = util.parseHtmlError('My error')
      expect(err instanceof Error).to.be.true;
      expect(err.message).to.be.equal('My error');
    });
  });
});
