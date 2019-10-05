const rndstr = require('random-string');
const fs = require('fs');
const crc32 = require('sse4_crc32').calculate;

const tests = {
  string: {
    cases: [],
  },
  buffer: {
    cases: [],
  }
};

for (let i = 0; i < 10; i++) {
  const str = rndstr({
    length: 1024,
  });
  tests.string.cases.push({
    input: str,
    want: crc32(str)
  });
}

for (let i = 0; i < 10; i++) {
  const buf = Buffer.alloc(1024);
  for (let j = 0; j < 1024; j++) {
    buf.writeUInt8(parseInt(Math.random() * 256), j);
  }
  tests.buffer.cases.push({
    input: buf,
    want: crc32(buf)
  });
}

const strs = ['', '\0'];
strs.forEach(function(str) {
  tests.string.cases.push({
    input: str,
    want: crc32(str),
  });
  const buf = Buffer.from(str, 'utf-8');
  tests.buffer.cases.push({
    input: buf,
    want: crc32(buf),
  });
});

for (const type in tests) {
  tests[type].want = tests[type].cases.reduce(function(prev, cs) {
    return crc32(cs.input, prev);
  }, 0);
}

fs.writeFileSync('./test/sets.json', JSON.stringify(tests));
