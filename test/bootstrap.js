// chai
global.chai = require("chai");
global.expect = global.chai.expect;
global.chai.config.includeStack = true;

// sinon
global.sinon = require("sinon");
global.chai.use(require("sinon-chai"));
