/////////////////////////////////////
//////////////  BMW /////////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var o = require('./op');
var h = require('./helper');

// var V_INIT = [
//   o.u(0x80818283, 0x84858687), o.u(0x88898A8B, 0x8C8D8E8F),
//   o.u(0x90919293, 0x94959697), o.u(0x98999A9B, 0x9C9D9E9F),
//   o.u(0xA0A1A2A3, 0xA4A5A6A7), o.u(0xA8A9AAAB, 0xACADAEAF),
//   o.u(0xB0B1B2B3, 0xB4B5B6B7), o.u(0xB8B9BABB, 0xBCBDBEBF),
//   o.u(0xC0C1C2C3, 0xC4C5C6C7), o.u(0xC8C9CACB, 0xCCCDCECF),
//   o.u(0xD0D1D2D3, 0xD4D5D6D7), o.u(0xD8D9DADB, 0xDCDDDEDF),
//   o.u(0xE0E1E2E3, 0xE4E5E6E7), o.u(0xE8E9EAEB, 0xECEDEEEF),
//   o.u(0xF0F1F2F3, 0xF4F5F6F7), o.u(0xF8F9FAFB, 0xFCFDFEFF)
// ];

var V_INIT = h.bytes2Int64Buffer(h.b64Decode("gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8="));

// var final = [
//   o.u(0xaaaaaaaa, 0xaaaaaaa0), o.u(0xaaaaaaaa, 0xaaaaaaa1),
//   o.u(0xaaaaaaaa, 0xaaaaaaa2), o.u(0xaaaaaaaa, 0xaaaaaaa3),
//   o.u(0xaaaaaaaa, 0xaaaaaaa4), o.u(0xaaaaaaaa, 0xaaaaaaa5),
//   o.u(0xaaaaaaaa, 0xaaaaaaa6), o.u(0xaaaaaaaa, 0xaaaaaaa7),
//   o.u(0xaaaaaaaa, 0xaaaaaaa8), o.u(0xaaaaaaaa, 0xaaaaaaa9),
//   o.u(0xaaaaaaaa, 0xaaaaaaaa), o.u(0xaaaaaaaa, 0xaaaaaaab),
//   o.u(0xaaaaaaaa, 0xaaaaaaac), o.u(0xaaaaaaaa, 0xaaaaaaad),
//   o.u(0xaaaaaaaa, 0xaaaaaaae), o.u(0xaaaaaaaa, 0xaaaaaaaf)
// ];

var final = h.bytes2Int64Buffer(h.b64Decode("qqqqqqqqqqCqqqqqqqqqoaqqqqqqqqqiqqqqqqqqqqOqqqqqqqqqpKqqqqqqqqqlqqqqqqqqqqaqqqqqqqqqp6qqqqqqqqqoqqqqqqqqqqmqqqqqqqqqqqqqqqqqqqqrqqqqqqqqqqyqqqqqqqqqraqqqqqqqqquqqqqqqqqqq8="));

var sb_a = [1, 1, 2, 2, 1, 2];
var sb_b = [3, 2, 1, 2];
var sb_c = [4, 13, 19, 28];
var sb_d = [37, 43, 53, 59];

var I16 = new Array(16); //we are trying to start at 16;

I16.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
I16.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
I16.push([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
I16.push([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
I16.push([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
I16.push([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
I16.push([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
I16.push([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
I16.push([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
I16.push([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
I16.push([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
I16.push([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
I16.push([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
I16.push([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
I16.push([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
I16.push([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);

var M16 = new Array(16);

M16.push([0, 1, 3, 4, 7, 10, 11]);
M16.push([1, 2, 4, 5, 8, 11, 12]);
M16.push([2, 3, 5, 6, 9, 12, 13]);
M16.push([3, 4, 6, 7, 10, 13, 14]);
M16.push([4, 5, 7, 8, 11, 14, 15]);
M16.push([5, 6, 8, 9, 12, 15, 16]);
M16.push([6, 7, 9, 10, 13, 0, 1]);
M16.push([7, 8, 10, 11, 14, 1, 2]);
M16.push([8, 9, 11, 12, 15, 2, 3]);
M16.push([9, 10, 12, 13, 0, 3, 4]);
M16.push([10, 11, 13, 14, 1, 4, 5]);
M16.push([11, 12, 14, 15, 2, 5, 6]);
M16.push([12, 13, 15, 16, 3, 6, 7]);
M16.push([13, 14, 0, 1, 4, 7, 8]);
M16.push([14, 15, 1, 2, 5, 8, 9]);
M16.push([15, 16, 2, 3, 6, 9, 10]);

var sb = function(n, x) {
  //xOriginal must be of type u64
  if (n < 4) {
    return o.xor64(x.shiftRight(sb_a[n]), x.shiftLeft(sb_b[n]), x.rotateLeft(sb_c[n]), x.rotateLeft(sb_d[n]));
  }
  else {
    return x.shiftRight(sb_a[n]).xor(x);
  }
}


var rbn = [0, 5, 11, 27, 32, 37, 43, 53];

var rb = function(n, x) {
  //x must be of type u64
  return x.rotateLeft(rbn[n]);
}

var makeW = function(M,H,i, op) {
  var a = M[i[0]].xor(H[i[0]]);
  var b = M[i[1]].xor(H[i[1]]);
  var c = M[i[2]].xor(H[i[2]]);
  var d = M[i[3]].xor(H[i[3]]);
  var e = M[i[4]].xor(H[i[4]]);
  var w = op[3](op[2](op[1](op[0](a,b),c),d),e);

  return w;
}

var wbn = [
  [5, 7, 10, 13, 14],
  [6, 8, 11, 14, 15],
  [0, 7, 9, 12, 15],
  [0, 1, 8, 10, 13],
  [1, 2, 9, 11, 14],
  [3, 2, 10, 12, 15],
  [4, 0, 3, 11, 13],
  [1, 4, 5, 12, 14],
  [2, 5, 6, 13, 15],
  [0, 3, 6, 7, 14],
  [8, 1, 4, 7, 15],
  [8, 0, 2, 5, 9],
  [1, 3, 6, 9, 10],
  [2, 4, 7, 10, 11],
  [3, 5, 8, 11, 12],
  [12, 4, 6, 9, 13],
];

var plus = function(a,b) {
  return a.plus(b);
}

var minus = function(a,b) {
  return a.minus(b);
}

var wboperators = [
  [minus, plus, plus, plus],
  [minus, plus, plus, minus],
  [plus, plus, minus, plus],
  [minus, plus, minus, plus],
  [plus, plus, minus, minus],
  [minus, plus, minus, plus],
  [minus, minus, minus, plus],
  [minus, minus, minus, minus],
  [minus, minus, plus, minus],
  [minus, plus, minus, plus],
  [minus, minus, minus, plus],
  [minus, minus, minus, plus],
  [plus, minus, minus, plus],
  [plus, plus, plus, plus],
  [minus, plus, minus, minus],
  [minus, minus, minus, plus],
]

var wb = function(M,H,i) {
  return makeW(M,H,wbn[i],wboperators[i]);
}

var kb = function(j) {
  var fives = o.u(0x05555555, 0x55555555);
  return fives.multiply(j);
}


var addElt = function(buffer64, state, mVars, i) {
  var k = kb(i);
  var elt =  buffer64[mVars[0]].rotateLeft(mVars[1])
     .add(buffer64[mVars[2]].rotateLeft(mVars[3]))
     .minus(buffer64[mVars[5]].rotateLeft(mVars[6]))
     .add(k)
     .xor(state[mVars[4]]);
    return elt;
}

var expand2Inner = function(qt, mf, state, i, iVars, mVars) {
  return qt[iVars[0]]
    .plus(rb(1, qt[iVars[1]]))
    .add(qt[iVars[2]])
    .add(rb(2, qt[iVars[3]]))
    .add(qt[iVars[4]])
    .add(rb(3, qt[iVars[5]]))
    .add(qt[iVars[6]])
    .add(rb(4, qt[iVars[7]]))
    .add(qt[iVars[8]])
    .add(rb(5, qt[iVars[9]]))
    .add(qt[iVars[10]])
    .add(rb(6, qt[iVars[11]]))
    .add(qt[iVars[12]])
    .add(rb(7, qt[iVars[13]]))
    .add(sb(4, qt[iVars[14]]))
    .add(sb(5, qt[iVars[15]]))
    .add(addElt(mf, state, mVars, i));
}

var expand1Inner = function(qt, mf, state, i, iVars, mVars) {
  return sb(1, qt[iVars[0]])
    .add(sb(2, qt[iVars[1]]))
    .add(sb(3, qt[iVars[2]]))
    .add(sb(0, qt[iVars[3]]))
    .add(sb(1, qt[iVars[4]]))
    .add(sb(2, qt[iVars[5]]))
    .add(sb(3, qt[iVars[6]]))
    .add(sb(0, qt[iVars[7]]))
    .add(sb(1, qt[iVars[8]]))
    .add(sb(2, qt[iVars[9]]))
    .add(sb(3, qt[iVars[10]]))
    .add(sb(0, qt[iVars[11]]))
    .add(sb(1, qt[iVars[12]]))
    .add(sb(2, qt[iVars[13]]))
    .add(sb(3, qt[iVars[14]]))
    .add(sb(0, qt[iVars[15]]))
    .add(addElt(mf, state, mVars, i));
}

var expand1b = function(qt, mf, state, i) {
  var iVars = I16[i];
  var mVars = M16[i];
  return expand1Inner(qt, mf, state, i, iVars, mVars);
}

var expand2b = function(qt, mf, state, i) {
  var iVars = I16[i];
  var mVars = M16[i];
  return expand2Inner(qt, mf, state, i, iVars, mVars);
}

var makeQ = function(mf, state) {
  var qt = new Array(32);
  for (var i = 0; i < 16; i++) {
    var w = wb(mf,state,i);
    var s = sb(i % 5, w);
    qt[i] = s.plus(state[(i + 1) % 16]);
  }
  qt[16] = expand1b(qt, mf, state, 16);
  qt[17] = expand1b(qt, mf, state, 17);
  for (var i = 18; i < 32; i++) {
    qt[i] = expand2b(qt, mf, state, i);
  }
  return qt;
}

var fold = function(int64Buffer, state) {
  var out = new Array(16);
  var qt = makeQ(int64Buffer, state);
  var xl = o.xor64(qt[16], qt[17], qt[18], qt[19], qt[20], qt[21], qt[22], qt[23]);
  var xh = o.xor64(xl, qt[24], qt[25], qt[26], qt[27], qt[28], qt[29], qt[30], qt[31]);
  out[0] = o.xor64(xh.shiftLeft(5), qt[16].shiftRight(5), int64Buffer[0]).add(o.xor64(xl, qt[24], qt[0]));
  out[1] = o.xor64(xh.shiftRight(7), qt[17].shiftLeft(8), int64Buffer[1]).add(o.xor64(xl, qt[25], qt[1]));
  out[2] = o.xor64(xh.shiftRight(5), qt[18].shiftLeft(5), int64Buffer[2]).add(o.xor64(xl, qt[26], qt[2]));
  out[3] = o.xor64(xh.shiftRight(1), qt[19].shiftLeft(5), int64Buffer[3]).add(o.xor64(xl, qt[27], qt[3]));
  out[4] = o.xor64(xh.shiftRight(3), qt[20], int64Buffer[4]).add(o.xor64(xl, qt[28], qt[4]));
  out[5] = o.xor64(xh.shiftLeft(6), qt[21].shiftRight(6), int64Buffer[5]).add(o.xor64(xl, qt[29], qt[5]));
  out[6] = o.xor64(xh.shiftRight(4), qt[22].shiftLeft(6), int64Buffer[6]).add(o.xor64(xl, qt[30], qt[6]));
  out[7] = o.xor64(xh.shiftRight(11), qt[23].shiftLeft(2), int64Buffer[7]).add(o.xor64(xl, qt[31], qt[7]));
  out[8] = out[4].rotateLeft(9).add(o.xor64(xh, qt[24], int64Buffer[8])).add(o.xor64(xl.shiftLeft(8), qt[23], qt[8]));
  out[9] = out[5].rotateLeft(10).add(o.xor64(xh, qt[25], int64Buffer[9])).add(o.xor64(xl.shiftRight(6), qt[16], qt[9]));
  out[10] = out[6].rotateLeft(11).add(o.xor64(xh, qt[26], int64Buffer[10])).add(o.xor64(xl.shiftLeft(6), qt[17], qt[10]));
  out[11] = out[7].rotateLeft(12).add(o.xor64(xh, qt[27], int64Buffer[11])).add(o.xor64(xl.shiftLeft(4), qt[18], qt[11]));
  out[12] = out[0].rotateLeft(13).add(o.xor64(xh, qt[28], int64Buffer[12])).add(o.xor64(xl.shiftRight(3), qt[19], qt[12]));
  out[13] = out[1].rotateLeft(14).add(o.xor64(xh, qt[29], int64Buffer[13])).add(o.xor64(xl.shiftRight(4), qt[20], qt[13]));
  out[14] = out[2].rotateLeft(15).add(o.xor64(xh, qt[30], int64Buffer[14])).add(o.xor64(xl.shiftRight(7), qt[21], qt[14]));
  out[15] = out[3].rotateLeft(16).add(o.xor64(xh, qt[31], int64Buffer[15])).add(o.xor64(xl.shiftRight(2), qt[22], qt[15]));
  return out;
}

var compress = function(buf, state) {
  var int64Buf = h.bytes2Int64BufferLeAligned(buf);
  return fold(int64Buf, state);
}

var bmw = function(ctx, data) {
  var htmp = new Array(16);
  var len = data.length;
  var lenL3 = o.u(0, len);
  lenL3 = lenL3.shiftLeft(3);
  ctx.bitCount.add(lenL3);
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var h1 = ctx.state;
  var h2 = htmp;
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len)
      clen = len;
    o.bufferInsert(buf, ptr, data, clen);
    data = data.slice(clen);
    len -= clen;
    ptr += clen;
    if (ptr === ctx.buffer.length) {
      var ht;
      h2 = compress(buf, h1);
      ht = h1;
      h1 = h2;
      h2 = ht;
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
  if (h1 !== ctx.state)
    o.bufferInsert(ctx.state, 0, h1, ctx.state.length);
}

var bmwClose = function(ctx) {
  var h1;
  var h2 = new Array(16);

  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var len = buf.length;
  buf[ptr++] = 0x80;
  var hState = ctx.state;
  if (ptr > len - 8) {
    o.bufferSet(buf, ptr, 0, len - ptr);
    hState = compress(buf, hState);
    ptr = 0;
  }
  o.bufferSet(buf, ptr, 0, len - 8 - ptr);
  h.bufferEncode64leAligned(buf, len - 8, ctx.bitCount);
  h2 = compress(buf, hState);
  for (u = 0; u < 16; u++)
    h.bufferEncode64leAligned(buf, 8 * u, h2[u]);
  h1 = compress(buf, final);
  var out = new Array(16);
  for (var u = 0, v = 8; u < 8; u++, v++) {
    out[2 * u] = o.swap32(h1[v].lo);
    out[2 * u + 1] = o.swap32(h1[v].hi);
  }
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = o.clone64Array(V_INIT);
  ctx.ptr = 0;
  ctx.bitCount = o.u(0,0);
  ctx.buffer = new Array(128);
  bmw(ctx, msg);
  var r = bmwClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}