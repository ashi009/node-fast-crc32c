const Benchtable = require('benchtable');

const suite = new Benchtable();

const kTesters = [{
  name: '@node-rs/crc32c',
  calculate: require('../impls/sse4_crc32c').calculate,
},
{
  name: 'sse4_crc32c_hw',
  calculate: require('sse4_crc32').sse42_crc,
}, {
  name: 'sse4_crc32c_sw',
  calculate: require('sse4_crc32').table_crc,
}, {
  name: 'js_crc32c',
  calculate: require('../impls/js_crc32c').calculate,
}, {
  name: 'js_crc32',
  calculate: require('buffer-crc32').unsigned,
}];

kTesters.forEach(function(tester) {
  suite.addFunction(tester.name, function(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      tester.calculate(inputs[i]);
    }
  });
});

const k1kBuffer = [generateBuffer(1024)];
const k4kBuffers = generateBuffers(4096);

suite.addInput('1024B', [k1kBuffer]);
suite.addInput(`${k4kBuffers.totalSize}B, avg ${Math.trunc(k4kBuffers.averageSize)}B`,
    [k4kBuffers]);

suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log(this.table.toString());
    })
    .run();

function generateBuffers(maxBufferSize) {
  const bufs = [];
  bufs.totalSize = 0;
  for (let i = 0; i < maxBufferSize * 2; i++) {
    const size = parseInt(Math.random() * maxBufferSize);
    bufs.push(generateBuffer(size));
    bufs.totalSize += size;
  }
  bufs.averageSize = bufs.totalSize / maxBufferSize / 2;
  return bufs;
}

function generateBuffer(size) {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++)
    buf[i] = parseInt(Math.random() * 256);
  return buf;
}
