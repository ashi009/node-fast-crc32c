# fast-crc32c [![NPM version](https://badge.fury.io/js/fast-crc32c.png)](http://badge.fury.io/js/fast-crc32c) [![Build Status](https://travis-ci.org/ashi009/node-fast-crc32c.svg?branch=master)](https://travis-ci.org/ashi009/node-fast-crc32c)

fast-crc32c is a CRC-32C algorithm implementation for node.js, which uses
hardware acceleration (via [voxer/sse4_crc32][sse4_crc32] by Anand Suresh), and
fallback to software implementation when hardware acceleration fails.

## Performance

CRC-32C is faster then CRC-32, which could take advantage of full CPU operand
register width (64bit) instead of CRC-32's 8bit.

When using hardware acceleration, CRC-32C is about 7x ~ 9x faster than software
implemented CRC-32C.

**Benchmark**

The 3 tested implementations are:

- **sse4\_crc32c** Hardware accelerated CRC-32C from [sse4_crc32][sse4_crc32]
- **js_crc32c** Javascript implemented CRC-32C
- **js_crc32** Javascript implemented CRC-32 from [buffer-crc32][buffer-crc32]

```
$ npm run-script benchmark

> fast-crc32c@0.1.4 benchmark /Users/xiaoyi/Projects/node-fast-crc32c
> node benchmark

sse4_crc32c_hw for inputs 1024B x 1,351,894 ops/sec ±0.99% (95 runs sampled)
sse4_crc32c_hw for inputs 16669544B, avg 2034B x 168 ops/sec ±0.53% (88 runs sampled)
sse4_crc32c_sw for inputs 1024B x 819,588 ops/sec ±0.55% (99 runs sampled)
sse4_crc32c_sw for inputs 16669544B, avg 2034B x 67.50 ops/sec ±0.54% (72 runs sampled)
js_crc32c for inputs 1024B x 376,878 ops/sec ±0.65% (99 runs sampled)
js_crc32c for inputs 16669544B, avg 2034B x 23.03 ops/sec ±1.68% (43 runs sampled)
js_crc32 for inputs 1024B x 375,614 ops/sec ±0.33% (102 runs sampled)
js_crc32 for inputs 16669544B, avg 2034B x 21.06 ops/sec ±2.32% (40 runs sampled)
```

| Impl           | 1024B             | 16669544B, avg 2034B |
|:---------------|------------------:|---------------------:|
| sse4_crc32c_hw | 1,351,894 ops/sec | 168 ops/sec          |
| sse4_crc32c_sw | 819,588 ops/sec   | 67.50 ops/sec        |
| js_crc32c      | 376,878 ops/sec   | 23.03 ops/sec        |
| js_crc32       | 375,614 ops/sec   | 21.06 ops/sec        |

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
