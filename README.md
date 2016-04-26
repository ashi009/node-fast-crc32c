# fast-crc32c [![NPM version](https://badge.fury.io/js/fast-crc32c.svg)](http://badge.fury.io/js/fast-crc32c) [![Build Status](https://travis-ci.org/ashi009/node-fast-crc32c.svg?branch=master)](https://travis-ci.org/ashi009/node-fast-crc32c) [![Dependency Status](https://david-dm.org/ashi009/node-fast-crc32c.svg)](https://david-dm.org/ashi009/node-fast-crc32c)

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

> fast-crc32c@1.0.2 benchmark /Users/xshi/Projects/node-fast-crc32c
> node benchmark

sse4_crc32c_hw for inputs 1024B x 1,837,024 ops/sec ±1.76% (83 runs sampled)
sse4_crc32c_hw for inputs 16856835B, avg 2057B x 203 ops/sec ±2.37% (78 runs sampled)
sse4_crc32c_sw for inputs 1024B x 911,096 ops/sec ±1.07% (85 runs sampled)
sse4_crc32c_sw for inputs 16856835B, avg 2057B x 72.74 ops/sec ±1.29% (72 runs sampled)
js_crc32c for inputs 1024B x 356,253 ops/sec ±1.07% (86 runs sampled)
js_crc32c for inputs 16856835B, avg 2057B x 22.40 ops/sec ±1.09% (41 runs sampled)
js_crc32 for inputs 1024B x 351,668 ops/sec ±0.94% (87 runs sampled)
js_crc32 for inputs 16856835B, avg 2057B x 22.25 ops/sec ±1.11% (40 runs sampled)
```

|                | 1024B             | 16856835B, avg 2057B |
|:---------------|------------------:|---------------------:|
| sse4_crc32c_hw | 1,837,024 ops/sec | 203 ops/sec          |
| sse4_crc32c_sw | 911,096 ops/sec   | 72.74 ops/sec        |
| js_crc32c      | 356,253 ops/sec   | 22.40 ops/sec        |
| js_crc32       | 351,668 ops/sec   | 22.25 ops/sec        |

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
