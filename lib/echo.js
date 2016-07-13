/////////////////////////////////////
///////////////  Echo ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');
var aes = require('./aes');

var ECHO_BlockSize = 128;

var subWords = function(W, pK) {
  for (var n = 0; n < 16; n++) {
    var X = W[n];
    var Y = new Array(4);
    aes.AES_ROUND_LE(X, pK, Y);
    aes.AES_ROUND_NOKEY_LE(Y, X);
    if ((pK[0] = op.t32(pK[0] + 1)) === 0) {
      if ((pK[1] = op.t32(pK[1] + 1)) === 0)
        if ((pK[2] = op.t32(pK[2] + 1)) === 0)
          pK[3] = op.t32(pK[3] + 1);
    }
  }
}

var shiftRow1 = function(W, a, b, c, d) {
  var tmp;
  tmp = W[a][0];
  W[a][0] = W[b][0];
  W[b][0] = W[c][0];
  W[c][0] = W[d][0];
  W[d][0] = tmp;
  tmp = W[a][1];
  W[a][1] = W[b][1];
  W[b][1] = W[c][1];
  W[c][1] = W[d][1];
  W[d][1] = tmp;
  tmp = W[a][2];
  W[a][2] = W[b][2];
  W[b][2] = W[c][2];
  W[c][2] = W[d][2];
  W[d][2] = tmp;
  tmp = W[a][3];
  W[a][3] = W[b][3];
  W[b][3] = W[c][3];
  W[c][3] = W[d][3];
  W[d][3] = tmp;
}

var shiftRow2 = function(W, a, b, c, d) {
  var tmp;
  tmp = W[a][0];
  W[a][0] = W[c][0];
  W[c][0] = tmp;
  tmp = W[b][0];
  W[b][0] = W[d][0];
  W[d][0] = tmp;
  tmp = W[a][1];
  W[a][1] = W[c][1];
  W[c][1] = tmp;
  tmp = W[b][1];
  W[b][1] = W[d][1];
  W[d][1] = tmp;
  tmp = W[a][2];
  W[a][2] = W[c][2];
  W[c][2] = tmp;
  tmp = W[b][2];
  W[b][2] = W[d][2];
  W[d][2] = tmp;
  tmp = W[a][3];
  W[a][3] = W[c][3];
  W[c][3] = tmp;
  tmp = W[b][3];
  W[b][3] = W[d][3];
  W[d][3] = tmp;
}

var shiftRow3 = function(W, a, b, c, d) {
  shiftRow1(W, d, c, b, a);
}

var shiftRows = function(W) {
  shiftRow1(W, 1, 5, 9, 13);
  shiftRow2(W, 2, 6, 10, 14);
  shiftRow3(W, 3, 7, 11, 15);
}

var mixColumn = function(W, ia, ib, ic, id) {
  for (var n = 0; n < 4; n++) {
    var a = W[ia][n];
    var b = W[ib][n];
    var c = W[ic][n];
    var d = W[id][n];
    var ab = a ^ b;
    var bc = b ^ c;
    var cd = c ^ d;
    var abx = ((ab & (0x80808080)) >>> 7) * 27 ^
      ((ab & (0x7F7F7F7F)) << 1);
    var bcx = ((bc & (0x80808080)) >>> 7) * 27 ^
      ((bc & (0x7F7F7F7F)) << 1);
    var cdx = ((cd & (0x80808080)) >>> 7) * 27 ^
      ((cd & (0x7F7F7F7F)) << 1);
    W[ia][n] = abx ^ bc ^ d;
    W[ib][n] = bcx ^ a ^ cd;
    W[ic][n] = cdx ^ ab ^ d;
    W[id][n] = abx ^ bcx ^ cdx ^ ab ^ c;
  }
}

var finalize = function(ctx, W) {
  var int32Buf = op.swap32Array(h.bytes2Int32Buffer(ctx.buffer));
  for (var u = 0; u < 8; u++) {
    for (var v = 0; v < 4; v++) {
      ctx.state[u][v] ^= int32Buf[u * 4 + v] ^ W[u][v] ^ W[u + 8][v];
    }
  }
}

var inputBlock = function(ctx, W) {
  op.buffer2Insert(W, 0, 0, ctx.state, 8, 4);
  var int32Buf = op.swap32Array(h.bytes2Int32Buffer(ctx.buffer));
  for (var u = 0; u < 8; u++) {
    W[u + 8][0] = (int32Buf[4 * u]);
    W[u + 8][1] = (int32Buf[4 * u + 1]);
    W[u + 8][2] = (int32Buf[4 * u + 2]);
    W[u + 8][3] = (int32Buf[4 * u + 3]);
  }
}

var mixColumns = function(W) {
  mixColumn(W, 0, 1, 2, 3);
  mixColumn(W, 4, 5, 6, 7);
  mixColumn(W, 8, 9, 10, 11);
  mixColumn(W, 12, 13, 14, 15);
}

var ROUND = function(W,K) {
  subWords(W,K);
  shiftRows(W);
  mixColumns(W);
}

var compress = function(ctx) {
  var W = new Array(16);
  for (var i = 0; i < 16; i++) {
    W[i] = new Array(4);
  }
  var K = new Array(4);
  op.bufferInsert(K,0,ctx.C,4);
  inputBlock(ctx, W);
  for (var u = 0; u < 10; u++) {
    ROUND(W,K);
  }
  finalize(ctx,W);
}

var incrCounter = function(ctx, val) {
  ctx.C[0] = op.t32(ctx.C[0] + op.t32(val));
  if (ctx.C[0] < op.t32(val)) {
    if ((ctx.C[1] = op.t32(ctx.C[1] + 1)) === 0) {
      if ((ctx.C[2] = op.t32(ctx.C[2] + 1)) === 0) {
        ctx.C[3] = op.t32(ctx.C[3] + 1);
      }
    }
  }
}

var echoInit = function(ctx) {
  ctx.state = new Array(8);
  for (var i = 0; i < 8; i++) {
    ctx.state[i] = new Array(4);
  }
  ctx.state[0][0] = 512;
  ctx.state[0][1] = ctx.state[0][2] = ctx.state[0][3] = 0;
  ctx.state[1][0] = 512;
  ctx.state[1][1] = ctx.state[1][2] = ctx.state[1][3] = 0;
  ctx.state[2][0] = 512;
  ctx.state[2][1] = ctx.state[2][2] = ctx.state[2][3] = 0;
  ctx.state[3][0] = 512;
  ctx.state[3][1] = ctx.state[3][2] = ctx.state[3][3] = 0;
  ctx.state[4][0] = 512;
  ctx.state[4][1] = ctx.state[4][2] = ctx.state[4][3] = 0;
  ctx.state[5][0] = 512;
  ctx.state[5][1] = ctx.state[5][2] = ctx.state[5][3] = 0;
  ctx.state[6][0] = 512;
  ctx.state[6][1] = ctx.state[6][2] = ctx.state[6][3] = 0;
  ctx.state[7][0] = 512;
  ctx.state[7][1] = ctx.state[7][2] = ctx.state[7][3] = 0;
  ctx.ptr = 0;
  ctx.C = new Array(4);
  op.bufferSet(ctx.C,0,0,4);
  ctx.buffer = new Array(ECHO_BlockSize);
}

var echo = function(ctx, data) {
  var buf, ptr;
  buf = ctx.buffer;
  ptr = ctx.ptr;
  var len = data.length;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int32Buf = h.bytes2Int32Buffer(buf);
      incrCounter(ctx, 1024);
      compress(ctx);
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
}

var echoClose = function(ctx) {
  var out = new Array(16);
  var buf = ctx.buffer;
  var len = ctx.buffer.length;
  var ptr = ctx.ptr;
  var elen = (ptr << 3);
  incrCounter(ctx, elen);
  var cBytes = h.int32Buffer2Bytes(op.swap32Array(ctx.C));
  /*
   * If elen is zero, then this block actually contains no message
   * bit, only the first padding bit.
   */
  if (elen === 0) {
    ctx.C[0] = ctx.C[1] = ctx.C[2] = ctx.C[3] = 0;
  }
  buf[ptr++] = 0x80;
  
  op.bufferSet(buf,ptr, 0, len - ptr);
  if (ptr > (len - 18)) {
    compress(ctx);
    op.bufferSet(ctx.C,0,0,4);
    op.bufferSet(buf, 0, 0,len);
  }
  buf[len - 17] = 2;
  op.bufferInsert(buf,len - 16, cBytes, 16);
  compress(ctx);
  for (var u = 0; u < 4; u++) {
    for (var v = 0; v < 4; v++) {
      out[u*4 + v] = op.swap32(ctx.state[u][v]);
    }
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
  echoInit(ctx);
  echo(ctx, msg);
  var r = echoClose(ctx);
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