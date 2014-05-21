var crc32 = require('../crc32c.js');
var sets = require('./sets.json');

sets.buffer.tests.forEach(function(test) {
  test.input = new Buffer(test.input);
});

describe('crc32c.js', function() {

  describe('calculate()', function() {

    for (var type in sets) {

      var set = sets[type];

      set.tests.forEach(function(test) {
        it('should digest ' + JSON.stringify(test.input) + ' as ' + test.output.toString(16), function() {
          crc32.calculate(test.input).should.eql(test.output);
        });
      });

      it('should digest all ' + type + ' together as ' + set.output.toString(16), function() {
        set.tests.reduce(function(prev, test) {
          return crc32.calculate(test.input, prev);
        }, 0).should.eql(set.output);
      })

    }

  });

});
