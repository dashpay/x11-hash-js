# x11-hash-js

> Performs the [x11 hashing](https://docs.dash.org/en/latest/introduction/features.html#x11-hash-algorithm) algorithm used in the [Dash cryptocurrency](https://dash.org) in JavaScript.

## Usage

Install the library as a Node module.

```
$ npm install --save @dashevo/x11-hash-js
```

Reference the library within a Node module.

```js
var x11 = require('x11-hash-js');

console.log(x11.digest('The great experiment continues.'));
// -> '4da3b7c5ff698c6546564ebc72204f31885cd87b75b2b3ca5a93b5d75db85b8c'
```

Download the browserified library from the [dist](https://github.com/dashpay/x11-hash-js/tree/master/dist) folder and include it in your HTML.

```html
<html>
<head>
  <script src='./dist/x11-hash.min.js'></script>
  <script>
  let x11 = require('x11hash');
  console.log(x11.digest('The great experiment continues.'));
  // -> '4da3b7c5ff698c6546564ebc72204f31885cd87b75b2b3ca5a93b5d75db85b8c'
  </script>
</head>
<body></body>
</html>
```

Call individual hash functions within the x11 digest.

```js
console.log(x11.blake('The great experiment continues.'));
// -> '8f257723af0741fb7d3d8c264a5ea86a57d4ae833557de04f5f78fad1ac17d6dfa1ae4a78a7564c08fc21d5d8cdd2793ca17d5500ecc2b43eb8aaf9c220d7b49'

console.log(x11.bmw('The great experiment continues.'));
// -> '7b30b4f1ccd83692bc6a01b1f7e374b59b81da6b21421679ae59d84c4f73afec5a0857565b6ebc1b9ddf9da5e75bf1ecd0ba6f5a75b7926ba9278385fb83533c'

console.log(x11.cubehash('The great experiment continues.'));
// -> '64394bcb9d7844070c8516480ea5f03f68386f33c3829e08bf38bea11f09eba5806aa7831cfbe8e515678b0cad7d4ac888ea2b9ea8f63f0cc918d5a6a76b7ae9'

console.log(x11.echo('The great experiment continues.'));
// -> 'b1db282b1672f3423c1e1bdf4496a8ddda0b6f483e92e9a8be2efbaab0ea230814f1f1485d919285deac13794dc215000eb39a47ac32bfc07299a0475049be2e'

console.log(x11.groestl('The great experiment continues.'));
// -> '6cea044acf31194eab7d1adb704712c34dd4f0b6a470b0f297832addab691faa459474c651efdbebddb138a2a9adb41705e0fb75741775314ddd8e5449ace986'

console.log(x11.jh('The great experiment continues.'));
// -> '90c7090e9d9a45bc79f476ae7fa3e7e4416d1c26b127d1d418ee9bd96b541933b0f144a0d4c6594944393e39fb6b98ceb54752af55198e00953d638183482521'

console.log(x11.keccak('The great experiment continues.'));
// -> '4c7e9c893fcdc87a2fd604574a4a5b9a0b6864665ed19057dedf24858314690ba45d6bbcfb86cd7182d1677e2d30dad9716ee99eb8ea267c6638f47ef20e0226'

console.log(x11.luffa('The great experiment continues.'));
// -> 'ea531ce38473fc4bd508c5396194dd6201699d47e25bd4d6b0c5dc7ab0627831e01ea027ebe33d80f608f139aa9fd0c6d923f32de9b5d714026300ed1c9a2f48'

console.log(x11.shavite('The great experiment continues.'));
// -> '6fbca2d53a26e22e6df1a8064230bdb98c0a612b64dad958f16757cf8ee8526862a0e4f56be69b98b07f0ea47db7211cf42352443fc806013374e819f26cb923'

console.log(x11.simd('The great experiment continues.'));
// -> '13ae2c08260f7d5abcfa791446800c1eaed8c5332ec437222428a28823aa2ba19a5907a2c860c12c0b894bdf9c0d64f807cb9512f1ed42980d15747ff4a26c1c'

console.log(x11.skein('The great experiment continues.'));
// -> '88a9dd727bb9b7cbd59612edbcd6b321427f473acc5673d7dffb16071dc71821d0cc1b94dccf7e5f71a0a94019a7e764d3315c3f4a40f73aee4ad98c75bcc2f7'

```

## API

### x11.digest(str)

Returns a `string` representation of the x11 hash of an input `string` ***str***.

#### str

Type: `string`

The string to be hashed.

### x11.digest(input, inputFormat, outputFormat)

Returns the x11 hash of ***input*** with the input and output types variable between a `string`, 8 bit `array` or 32 bit `array`

#### input

Type: `string` or `array`

The input data to be hashed.

#### inputFormat

Type: `number`

Specifies the format and type of the ***input*** value:

 - **0**: `string`
 - **1**: 8 bit `array`
 - **2**: 32 bit `array`

#### outputFormat

Type: `number`

Specifies the format and type of the return value:

 - **0**: `string`
 - **1**: 8 bit `array`
 - **2**: 32 bit `array`
