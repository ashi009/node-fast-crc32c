var fs = require('fs');

module.exports = (function(loaders) {

var impls = [
  './impls/sse4_crc32c_hw',
  './impls/sse4_crc32c_sw',
  './impls/js_crc32c'
];

for (var i = 0; i < impls.length; i++) {
  try {
    var crc32 = require(impls[i]);
    if (crc32.calculate("The quick brown fox jumps over the lazy dog") == 0x22620404)
      return crc32;
  } catch(e) {
  }
}

throw new Error('Failed to find available CRC-32C implementation.');

})();
