const sse4_crc32c = require('./impls/sse4_crc32c');
const js_crc32c = require('./impls/js_crc32c');

module.exports = (function() {
  const impls = [sse4_crc32c, js_crc32c];
  for (const crc32 of impls) {
    try {
      if (crc32.calculate('The quick brown fox jumps over the lazy dog') === 0x22620404) {
        return crc32;
      }
    } catch(e) {
      // ignore the error and try next implementation.
    }
  }
  return {
    calculate() {
      throw new Error('no CRC-32C implementation is available');
    },
  };
})();
