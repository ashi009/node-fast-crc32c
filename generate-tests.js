var rndstr = require('random-string');
var fs = require('fs');
var crc32 = require('sse4_crc32').calculate;

var tests = {
  string: {
    tests: []
  },
  buffer: {
    tests: []
  }
};

for (var i = 0; i < 10; i++) {
  var str = rndstr({
    length: 1024,
    // numeric: true,
    // letters: true,
    // // special: true
  });
  tests.string.tests.push({
    input: str,
    output: crc32(str)
  });
}

for (var i = 0; i < 10; i++) {
  var buf = new Buffer(1024);
  for (var j = 0; j < 1024; j++)
    buf.writeUInt8(parseInt(Math.random() * 256), j);
  tests.buffer.tests.push({
    input: buf,
    output: crc32(buf)
  });
}

var strs = ['', '\0'];
strs.forEach(function(str) {
  tests.string.tests.push({
    input: str,
    output: crc32(str)
  });
  var buf = new Buffer(str);
  tests.buffer.tests.push({
    input: buf,
    output: crc32(buf)
  });
});

for (var type in tests) {
  tests[type].output = tests[type].tests.reduce(function(prev, test) {
    return crc32(test.input, prev);
  }, 0);
}

fs.writeFileSync('./test/sets.json', JSON.stringify(tests));
