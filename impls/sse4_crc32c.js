var CRC32 = require('sse4_crc32').CRC32;

module.exports = {
  calculate: function(data, initial) {
    return new CRC32(data, initial).crc();
  }
};
