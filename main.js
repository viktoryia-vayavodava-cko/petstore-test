var chai = require("chai"),
request = require("supertest"),
config = require("./configs/config.js");

// Configure chai
global.should = chai.should();
chai.use(require('chai-json-schema'));
chai.use(require('chai-arrays'));
chai.use(require('chai-string'));
chai.use(require('chai-datetime'));

// Make available globally
global.request = request;
global.config = config;
global.noop = function () { };
global.expect = chai.expect;