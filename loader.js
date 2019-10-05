module.exports = (function() {
  const impls = [
    './impls/sse4_crc32c',
    './impls/js_crc32c',
  ];
  for (const impl of impls) {
    try {
      const crc32 = require(impl);
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
