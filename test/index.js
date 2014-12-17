'use strict';

require('should');
var mixarg = require('..');

describe('mixarg', function() {

  it('should return {} when unmatched type', function() {
    mixarg().should.eql({});
    mixarg(undefined, null).should.eql({});
    mixarg('', []).should.eql({});
    mixarg('     ').should.eql({});
    mixarg(null, []).should.eql({});
    mixarg([], undefined).should.eql({});
  });

  it('should not return the same ref', function() {
    var a = {}, b = {}, c = {};
    var d = mixarg(a, b, c);
    d.should.not.equal(a);
    d.should.not.equal(b);
    d.should.not.equal(c);
  });

  it('should mixin string', function() {
    var defaults = {
      a: 1,
      caMel: 2,
      c: false,
      d: ['a', 'b']
    };
    var arg1 = '   -a    2 --ca-mel=1 -c -d 1 -d 2';
    mixarg(defaults, arg1).should.eql({
      '_': [],
      a: 2,
      caMel: 1,
      c: true,
      d: [1, 2]
    });
  });

  it('should mixin array', function() {
    var defaults = {
      a: 1,
      caMel: 2,
      c: false,
      d: ['a', 'b']
    };
    var arg1 = '-a 2 --ca-mel=1 -c -d 1 -d 2'.split(' ');
    mixarg(defaults, arg1).should.eql({
      '_': [],
      a: 2,
      caMel: 1,
      c: true,
      d: [1, 2]
    });
  });

  it('should mixin object', function() {
    var defaults = {
      a: 1,
      b: 2,
      c: 3
    };
    var arg1 = {
      a: 3,
      d: 4
    };
    mixarg(defaults, arg1).should.eql({
      a: 3,
      b: 2,
      c: 3,
      d: 4
    });
  });

  it('should give the last argumnets high priority', function() {
    var defaults = {
      a: 1,
      b: 2
    };
    var arg1 = '-a 3 -b 4';
    var arg2 = '-b 5';
    mixarg(defaults, arg1, arg2).should.eql({
      '_': [],
      a: 3,
      b: 5
    });
  });
});
