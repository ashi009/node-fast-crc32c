# fast-crc32c [![NPM version](https://badge.fury.io/js/fast-crc32c.png)](http://badge.fury.io/js/fast-crc32c) [![Build Status](https://travis-ci.org/ashi009/node-fast-crc32c.svg?branch=master)](https://travis-ci.org/ashi009/node-fast-crc32c)

fast-crc32c is a CRC-32C algorithm implementation for node.js, which uses
hardware acceleration (via [voxer/sse4_crc32][sse4_crc32] by Anand Suresh), and
fallback to software implementation when hardware acceleration fails.

## Performance

CRC-32C is faster then CRC-32, which could take advantage of full CPU operand
register width (64bit) instead of CRC-32's 8bit.

When using hardware acceleration, CRC-32C is about 7x ~ 9x faster than software
implemented CRC-32C.

_Note: Current software implementation didn't reflect that. But no slower than
other tabled based CRC-32._

**Benchmark**

The 3 tested implementations are:

- **sse4\_crc32c** Hardware accelerated CRC-32C from [sse4_crc32][sse4_crc32]
- **js_crc32c** Javascript implemented CRC-32C
- **js_crc32** Javascript implemented CRC-32 from [buffer-crc32][buffer-crc32]

```
$ npm run-script benchmark
sse4_crc32c for inputs 1024B x 1,882,511 ops/sec ±0.91% (96 runs sampled)
sse4_crc32c for inputs 16696054B, avg 2038B x 161 ops/sec ±0.80% (85 runs sampled)
js_crc32c for inputs 1024B x 357,426 ops/sec ±1.09% (93 runs sampled)
js_crc32c for inputs 16696054B, avg 2038B x 21.91 ops/sec ±1.64% (41 runs sampled)
js_crc32 for inputs 1024B x 360,304 ops/sec ±0.94% (93 runs sampled)
js_crc32 for inputs 16696054B, avg 2038B x 23.17 ops/sec ±0.49% (43 runs sampled)
```

| Impl        | 1024B             | 16696054B, avg 2038B |
|:------------|------------------:|---------------------:|
| sse4_crc32c | 1,882,511 ops/sec | 161 ops/sec          |
| js_crc32c   | 357,426 ops/sec   | 21.91 ops/sec        |
| js_crc32    | 360,304 ops/sec   | 23.17 ops/sec        |

## Install

```shell
npm install fast-crc32c --save
```

### Usage

```javascript
var crc32 = require('fast-crc32c');
var result = crc32.calculate(data, initial);
```

- **data** required, String|Buffer, data to digest
- **initial** optional, Number, initial CRC-32C digest

[sse4_crc32]: https://github.com/Voxer/sse4_crc32
[buffer-crc32]: https://github.com/brianloveswords/buffer-crc32
