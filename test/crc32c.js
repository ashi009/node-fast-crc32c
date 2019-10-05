const sets = require('./sets.json');

sets.buffer.cases.forEach(function(cs) {
  cs.input = Buffer.from(cs.input);
});

describe('crc32c.js', function() {
  describe('calculate()', testCalculate(require('../impls/js_crc32c')));
});

describe('fast-crc32c', function() {
  describe('calculate()', testCalculate(require('../')));
});

function testCalculate(crc32) {
  return function() {
    for (const type in sets) {
      const set = sets[type];
      set.cases.forEach(function(cs) {
        it(`should digest "${cs.input}" correctly`, function() {
          crc32.calculate(cs.input).should.eql(cs.want);
        });
      });
      it(`should digest all ${type} correctly`, function() {
        set.cases.reduce(function(prev, cs) {
          return crc32.calculate(cs.input, prev);
        }, 0).should.eql(set.want);
      })
    }
  };
}
