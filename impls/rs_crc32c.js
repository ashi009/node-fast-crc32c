const {crc32c} = require('@node-rs/crc32');

module.exports = {
  calculate: crc32c,
};
