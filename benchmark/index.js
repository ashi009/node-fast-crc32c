var util = require('util');
var Benchtable = require('benchtable');

var suite = new Benchtable();

var kTesters = [{
  name: 'sse4_crc32c_hw',
  calculate: require('sse4_crc32').sse42_crc
}, {
  name: 'sse4_crc32c_sw',
  calculate: require('sse4_crc32').table_crc
}, {
  name: 'js_crc32c',
  calculate: require('../impls/js_crc32c').calculate
}, {
  name: 'js_crc32',
  calculate: require('buffer-crc32').unsigned
}];

kTesters.forEach(function(tester) {
  suite.addFunction(tester.name, function(inputs) {
    for (var i = 0; i < inputs.length; i++)
      tester.calculate(inputs[i]);
  });
});

var k1kBuffer = [generateBuffer(1024)];
var k4kBuffers = generateBuffers(4096);

suite.addInput('1024B', [k1kBuffer]);
suite.addInput(util.format('%dB, avg %dB', k4kBuffers.totalSize, parseInt(k4kBuffers.averageSize)),
    [k4kBuffers]);

suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log(this.table.toString());
    })
    .run();

function generateBuffers(maxBufferSize) {
  var bufs = [];
  bufs.totalSize = 0;
  for (var i = 0; i < maxBufferSize * 2; i++) {
    var size = parseInt(Math.random() * maxBufferSize);
    bufs.push(generateBuffer(size));
    bufs.totalSize += size;
  }
  bufs.averageSize = bufs.totalSize / maxBufferSize / 2;
  return bufs;
}

function generateBuffer(size) {
  var buf = new Buffer(size);
  for (var i = 0; i < size; i++)
    buf[i] = parseInt(Math.random() * 256);
  return buf;
}
