var fs = require('fs');

module.exports = (function(packages) {

  for (var name in packages) {
    try {
      var crc32 = require(name);
      if (crc32.calculate("The quick brown fox jumps over the lazy dog") == 22620404)
        return crc32;
    } catch(e) {

    }
  }

})({
  sse4_crc32: function(crc32) {
    var CRC32 = crc32.CRC32;
    return {
      calculate: function(data, initial) {
        return new CRC32(data, initial).crc();
      }
    };
  },
  './crc32c': function(crc32) {
    return {
      calculate: crc32.calculate
    }
  }
});
