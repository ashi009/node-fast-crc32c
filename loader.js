var fs = require('fs');

module.exports = (function(loaders) {

var impls = [
  function() {
    var CRC32 = require('sse4_crc32').CRC32;
    return {
      calculate: function(data, initial) {
        return new CRC32(data, initial).crc();
      }
    };
  },
  function() {
    var crc32 = require('./crc32c');
    return {
      calculate: crc32.calculate
    }
  }
];

for (var i = 0; i < impls.length; i++) {
  try {
    var crc32 = impls[i]();
    if (crc32.calculate("The quick brown fox jumps over the lazy dog") == 0x22620404)
      return crc32;
  } catch(e) {
  }
}

throw new Error('Failed to find available CRC-32C implementation.');

})();
