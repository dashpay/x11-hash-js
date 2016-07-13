/////////////////////////////////////
///////////////  Blake //////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var CB = [
  new op.u64(0x243f6a88, 0x85a308d3),
  new op.u64(0x13198a2e, 0x03707344),
  new op.u64(0xa4093822, 0x299f31d0),
  new op.u64(0x082efa98, 0xec4e6c89),
  new op.u64(0x452821e6, 0x38d01377),
  new op.u64(0xbe5466cf, 0x34e90c6c),
  new op.u64(0xc0ac29b7, 0xc97c50dd),
  new op.u64(0x3f84d5b5, 0xb5470917),
  new op.u64(0x9216d5d9, 0x8979fb1b),
  new op.u64(0xd1310ba6, 0x98dfb5ac),
  new op.u64(0x2ffd72db, 0xd01adfb7),
  new op.u64(0xb8e1afed, 0x6a267e96),
  new op.u64(0xba7c9045, 0xf12c7f99),
  new op.u64(0x24a19947, 0xb3916cf7),
  new op.u64(0x0801f2e2, 0x858efc16),
  new op.u64(0x636920d8, 0x71574e69)
];

var Z = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]
];

var Mx = function(M, r, i) {
  return M[Z[r][i]];
}

var CBx = function(r, i) {
  return CB[Z[r][i]];
}

var initialValues = [
  new op.u64(0x6a09e667, 0xf3bcc908),
  new op.u64(0xbb67ae85, 0x84caa73b),
  new op.u64(0x3c6ef372, 0xfe94f82b),
  new op.u64(0xa54ff53a, 0x5f1d36f1),
  new op.u64(0x510e527f, 0xade682d1),
  new op.u64(0x9b05688c, 0x2b3e6c1f),
  new op.u64(0x1f83d9ab, 0xfb41bd6b),
  new op.u64(0x5be0cd19, 0x137e2179)
];

var GB = function(m0, m1, c0, c1, a, b, c, d) {
  a.add(b.plus(m0.xor(c1)));
  var l = d.xor(a);
  d.set(d.xor(a).rotateRight(32));
  c.add(d);
  b.set(b.xor(c).rotateRight(25));
  a.add(b.plus(m1.xor(c0)));
  d.set(d.xor(a).rotateRight(16));
  c.add(d);
  b.set(b.xor(c).rotateRight(11));
}

var round = function(r, V, M) {
  GB(Mx(M, r, 0), Mx(M, r, 1), CBx(r, 0), CBx(r, 1), V[0], V[4], V[8], V[0xC]);
  GB(Mx(M, r, 2), Mx(M, r, 3), CBx(r, 2), CBx(r, 3), V[1], V[5], V[9], V[0xD]);
  GB(Mx(M, r, 4), Mx(M, r, 5), CBx(r, 4), CBx(r, 5), V[2], V[6], V[0xA], V[0xE]);
  GB(Mx(M, r, 6), Mx(M, r, 7), CBx(r, 6), CBx(r, 7), V[3], V[7], V[0xB], V[0xF]);
  GB(Mx(M, r, 8), Mx(M, r, 9), CBx(r, 8), CBx(r, 9), V[0], V[5], V[0xA], V[0xF]);
  GB(Mx(M, r, 0xA), Mx(M, r, 0xB), CBx(r, 0xA), CBx(r, 0xB), V[1], V[6], V[0xB], V[0xC]);
  GB(Mx(M, r, 0xC), Mx(M, r, 0xD), CBx(r, 0xC), CBx(r, 0xD), V[2], V[7], V[8], V[0xD]);
  GB(Mx(M, r, 0xE), Mx(M, r, 0xF), CBx(r, 0xE), CBx(r, 0xF), V[3], V[4], V[9], V[0xE]);
}

var compress = function(M, H, S, T0, T1) {
  var V = new Array(16);
  op.bufferInsert64(V, 0, H, 8);
  V[8] = S[0].xor(CB[0]);
  V[9] = S[1].xor(CB[1]);
  V[10] = S[2].xor(CB[2]);
  V[11] = S[3].xor(CB[3]);
  V[12] = T0.xor(CB[4]);
  V[13] = T0.xor(CB[5]);
  V[14] = T1.xor(CB[6]);
  V[15] = T1.xor(CB[7]);
  for (var i = 0; i < 16; i++) {
    round(i % 10, V, M);
  }
  for (var i = 0; i < 8; i++) {
    H[i] = op.xor64(H[i], S[i % 4], V[i], V[8 + i]);
  }
}

var blake = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  var H = new Array(8);
  var S = new Array(4);
  var T0 = ctx.T0.clone();
  var T1 = ctx.T1.clone();
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  op.bufferInsert(H, 0, ctx.state, 8);
  op.bufferInsert(S, 0, ctx.salt, 4);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      T0.add(new op.u64(0, 1024));
      if (T0.hi < 0 || T0.lo < 1024)
        T1.addOne();
      var int64Buf = h.bytes2Int64Buffer(buf);
      compress(int64Buf, H, S, T0, T1);
      ptr = 0;
    }
  }
  ctx.state = H;
  ctx.salt = S;
  ctx.T0 = T0;
  ctx.T1 = T1;
  ctx.ptr = ptr;
}

var blakeClose = function(ctx) {
  var buf = new Array(128);
  var ptr = ctx.ptr;
  var bitLen = (new op.u64(0, ptr)).shiftLeft(3);
  var len = buf.length;
  var padLen;
  var count;
  var tl = ctx.T0.plus(bitLen);
  var th = ctx.T1.clone();
  buf[ptr] = 0x80;
  if (ptr === 0) {
    ctx.T0 = new op.u64(0xFFFFFFFF, 0xFFFFFC00);
    ctx.T1 = new op.u64(0xFFFFFFFF, 0xFFFFFFFF);
  }
  else if (ctx.T0.isZero()) {
    ctx.T0 = new op.u64(0xFFFFFFFF, 0xFFFFFC00).plus(bitLen);
    ctx.T1 = ctx.T1.minus(new op.u64(0, 1));
  }
  else {
    ctx.T0 = ctx.T0.minus(new op.u64(0, 1024).minus(bitLen));
  }
  if (bitLen.lo <= 894) {
    op.bufferSet(buf, ptr + 1, 0, 111 - ptr);
    buf[111] |= 1;
    h.bufferEncode64(buf, 112, th);
    h.bufferEncode64(buf, 120, tl);
    blake(ctx, buf.slice(ptr), 128 - ptr);
  }
  else {
    op.bufferSet(u.buf, ptr + 1, 0, 127 - ptr);
    blake(ctx, buf.slice(ptr), 128 - ptr);
    ctx.T0 = new op.u64(0xFFFFFFFFFFFFFC00);
    ctx.T1 = new op.u64(0xFFFFFFFFFFFFFFFF);
    op.bufferSet(buf, 0, 0, 112);
    buf[111] = 1;
    h.bufferEncode64(buf, 112, th);
    h.bufferEncode64(buf, 120, tl);
    blake(ctx, buf, 128);
  }
  var out = new Array(16);
  for (var u = 0; u < 8; u++) {
    out[2 * u] = ctx.state[u].hi;
    out[2 * u + 1] = ctx.state[u].lo;
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
  ctx.state = op.clone64Array(initialValues);
  ctx.salt = [op.u64.prototype.zero(), op.u64.prototype.zero(), op.u64.prototype.zero(), op.u64.prototype.zero()];
  ctx.T0 = op.u64.prototype.zero();
  ctx.T1 = op.u64.prototype.zero();
  ctx.ptr = 0;
  ctx.buffer = new Array(128);
  blake(ctx, msg, msg.length);
  var r = blakeClose(ctx, 0, 0);
  var out;
  if (output === 1) {
    out = r;
  }
  else if (output === 2) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}