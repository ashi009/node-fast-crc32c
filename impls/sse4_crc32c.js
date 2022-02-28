const bindings = require('@node-rs/crc32');

module.exports = {
  calculate: bindings.crc32c,
};
