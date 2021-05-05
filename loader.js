module.exports = (function() {
  const os = require('os');
  const isX86 = new Set(['ia32', 'x32', 'x64']).has(os.arch());
  const impls = [
    ...(isX86 ? ['./impls/sse4_crc32c'] : []),
    './impls/rs_crc32c',
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
