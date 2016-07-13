/////////////////////////////////////
////////////  Shavite ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');
var aes = require('./aes');

var Shavite_BlockSize = 128;
var Simd_HSize = 4;

var IV512 = [
  0x72FCCDD8, 0x79CA4727, 0x128A077B, 0x40D55AEC,
  0xD1901A06, 0x430AE307, 0xB29F5CD1, 0xDF07FBFC,
  0x8E45D73D, 0x681AB538, 0xBDE86578, 0xDD577E47,
  0xE275EADE, 0x502D9FCD, 0xB9357178, 0x022A4B9A,
];

var AES_ROUND_NOKEY = function(x) {
  var t = new Array(4);
  op.bufferInsert(t, 0, x, 4);
  aes.AES_ROUND_NOKEY_LE(t, x);
  return x;
}

var KEY_EXPAND_ELT = function(k, start, end) {
  var kt = k.slice(start, end);
  var l = AES_ROUND_NOKEY([kt[1], kt[2], kt[3], kt[0]]);
  op.bufferInsert(k, start, l, end - start);
}

var c512 = function(ctx, msg) {
  var m = h.bytes2Int32Buffer(msg);
  var p = Array(16);
  var x = Array(4);
  var rk = Array(32);
  var r;

  op.bufferInsert(p, 0, ctx.h, 16);
  /* round 0 */
  rk[0] = op.swap32(m[0]);
  x[0] = p[4] ^ rk[0];
  rk[1] = op.swap32(m[1]);
  x[1] = p[5] ^ rk[1];
  rk[2] = op.swap32(m[2]);
  x[2] = p[6] ^ rk[2];
  rk[3] = op.swap32(m[3]);
  x[3] = p[7] ^ rk[3];
  AES_ROUND_NOKEY(x);
  rk[4] = op.swap32(m[4]);
  x[0] ^= rk[4];
  rk[5] = op.swap32(m[5]);
  x[1] ^= rk[5];
  rk[6] = op.swap32(m[6]);
  x[2] ^= rk[6];
  rk[7] = op.swap32(m[7]);
  x[3] ^= rk[7];
  AES_ROUND_NOKEY(x);
  rk[8] = op.swap32(m[8]);
  x[0] ^= rk[8];
  rk[9] = op.swap32(m[9]);
  x[1] ^= rk[9];
  rk[10] = op.swap32(m[10]);
  x[2] ^= rk[10];
  rk[11] = op.swap32(m[11]);
  x[3] ^= rk[11];
  AES_ROUND_NOKEY(x);
  rk[12] = op.swap32(m[12]);
  x[0] ^= rk[12];
  rk[13] = op.swap32(m[13]);
  x[1] ^= rk[13];
  rk[14] = op.swap32(m[14]);
  x[2] ^= rk[14];
  rk[15] = op.swap32(m[15]);
  x[3] ^= rk[15];
  AES_ROUND_NOKEY(x);
  p[0] ^= x[0];
  p[1] ^= x[1];
  p[2] ^= x[2];
  p[3] ^= x[3];
  rk[16] = op.swap32(m[16]);
  x[0] = p[12] ^ rk[16];
  rk[17] = op.swap32(m[17]);
  x[1] = p[13] ^ rk[17];
  rk[18] = op.swap32(m[18]);
  x[2] = p[14] ^ rk[18];
  rk[19] = op.swap32(m[19]);
  x[3] = p[15] ^ rk[19];
  AES_ROUND_NOKEY(x);
  rk[20] = op.swap32(m[20]);
  x[0] ^= rk[20];
  rk[21] = op.swap32(m[21]);
  x[1] ^= rk[21];
  rk[22] = op.swap32(m[22]);
  x[2] ^= rk[22];
  rk[23] = op.swap32(m[23]);
  x[3] ^= rk[23];
  AES_ROUND_NOKEY(x);
  rk[24] = op.swap32(m[24]);
  x[0] ^= rk[24];
  rk[25] = op.swap32(m[25]);
  x[1] ^= rk[25];
  rk[26] = op.swap32(m[26]);
  x[2] ^= rk[26];
  rk[27] = op.swap32(m[27]);
  x[3] ^= rk[27];
  AES_ROUND_NOKEY(x);
  rk[28] = op.swap32(m[28]);
  x[0] ^= rk[28];
  rk[29] = op.swap32(m[29]);
  x[1] ^= rk[29];
  rk[30] = op.swap32(m[30]);
  x[2] ^= rk[30];
  rk[31] = op.swap32(m[31]);
  x[3] ^= rk[31];
  AES_ROUND_NOKEY(x);
  p[8] ^= x[0];
  p[9] ^= x[1];
  p[10] ^= x[2];
  p[11] ^= x[3];

  for (r = 0; r < 3; r++) {
    /* round 1, 5, 9 */
    KEY_EXPAND_ELT(rk, 0, 4);
    rk[0] ^= rk[28];
    rk[1] ^= rk[29];
    rk[2] ^= rk[30];
    rk[3] ^= rk[31];
    if (r == 0) {
      rk[0] ^= ctx.count[0];
      rk[1] ^= ctx.count[1];
      rk[2] ^= ctx.count[2];
      rk[3] ^= op.t32(~ctx.count[3]);
    }
    x[0] = p[0] ^ rk[0];
    x[1] = p[1] ^ rk[1];
    x[2] = p[2] ^ rk[2];
    x[3] = p[3] ^ rk[3];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 4, 8);
    rk[4] ^= rk[0];
    rk[5] ^= rk[1];
    rk[6] ^= rk[2];
    rk[7] ^= rk[3];
    if (r == 1) {
      rk[4] ^= ctx.count[3];
      rk[5] ^= ctx.count[2];
      rk[6] ^= ctx.count[1];
      rk[7] ^= op.t32(~ctx.count[0]);
    }
    x[0] ^= rk[4];
    x[1] ^= rk[5];
    x[2] ^= rk[6];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 8, 12);
    rk[8] ^= rk[4];
    rk[9] ^= rk[5];
    rk[10] ^= rk[6];
    rk[11] ^= rk[7];
    x[0] ^= rk[8];
    x[1] ^= rk[9];
    x[2] ^= rk[10];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 12, 16);
    rk[12] ^= rk[8];
    rk[13] ^= rk[9];
    rk[14] ^= rk[10];
    rk[15] ^= rk[11];
    x[0] ^= rk[12];
    x[1] ^= rk[13];
    x[2] ^= rk[14];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[12] ^= x[0];
    p[13] ^= x[1];
    p[14] ^= x[2];
    p[15] ^= x[3];
    KEY_EXPAND_ELT(rk, 16, 20);
    rk[16] ^= rk[12];
    rk[17] ^= rk[13];
    rk[18] ^= rk[14];
    rk[19] ^= rk[15];
    x[0] = p[8] ^ rk[16];
    x[1] = p[9] ^ rk[17];
    x[2] = p[10] ^ rk[18];
    x[3] = p[11] ^ rk[19];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 20, 24);
    rk[20] ^= rk[16];
    rk[21] ^= rk[17];
    rk[22] ^= rk[18];
    rk[23] ^= rk[19];
    x[0] ^= rk[20];
    x[1] ^= rk[21];
    x[2] ^= rk[22];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 24, 28);
    rk[24] ^= rk[20];
    rk[25] ^= rk[21];
    rk[26] ^= rk[22];
    rk[27] ^= rk[23];
    x[0] ^= rk[24];
    x[1] ^= rk[25];
    x[2] ^= rk[26];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 28, 32);
    rk[28] ^= rk[24];
    rk[29] ^= rk[25];
    rk[30] ^= rk[26];
    rk[31] ^= rk[27];
    if (r == 2) {
      rk[28] ^= ctx.count[2];
      rk[29] ^= ctx.count[3];
      rk[30] ^= ctx.count[0];
      rk[31] ^= op.t32(~ctx.count[1]);
    }
    x[0] ^= rk[28];
    x[1] ^= rk[29];
    x[2] ^= rk[30];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[4] ^= x[0];
    p[5] ^= x[1];
    p[6] ^= x[2];
    p[7] ^= x[3];
    /* round 2, 6, 10 */
    rk[0] ^= rk[25];
    x[0] = p[12] ^ rk[0];
    rk[1] ^= rk[26];
    x[1] = p[13] ^ rk[1];
    rk[2] ^= rk[27];
    x[2] = p[14] ^ rk[2];
    rk[3] ^= rk[28];
    x[3] = p[15] ^ rk[3];
    AES_ROUND_NOKEY(x);
    rk[4] ^= rk[29];
    x[0] ^= rk[4];
    rk[5] ^= rk[30];
    x[1] ^= rk[5];
    rk[6] ^= rk[31];
    x[2] ^= rk[6];
    rk[7] ^= rk[0];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    rk[8] ^= rk[1];
    x[0] ^= rk[8];
    rk[9] ^= rk[2];
    x[1] ^= rk[9];
    rk[10] ^= rk[3];
    x[2] ^= rk[10];
    rk[11] ^= rk[4];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    rk[12] ^= rk[5];
    x[0] ^= rk[12];
    rk[13] ^= rk[6];
    x[1] ^= rk[13];
    rk[14] ^= rk[7];
    x[2] ^= rk[14];
    rk[15] ^= rk[8];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[8] ^= x[0];
    p[9] ^= x[1];
    p[10] ^= x[2];
    p[11] ^= x[3];
    rk[16] ^= rk[9];
    x[0] = p[4] ^ rk[16];
    rk[17] ^= rk[10];
    x[1] = p[5] ^ rk[17];
    rk[18] ^= rk[11];
    x[2] = p[6] ^ rk[18];
    rk[19] ^= rk[12];
    x[3] = p[7] ^ rk[19];
    AES_ROUND_NOKEY(x);
    rk[20] ^= rk[13];
    x[0] ^= rk[20];
    rk[21] ^= rk[14];
    x[1] ^= rk[21];
    rk[22] ^= rk[15];
    x[2] ^= rk[22];
    rk[23] ^= rk[16];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    rk[24] ^= rk[17];
    x[0] ^= rk[24];
    rk[25] ^= rk[18];
    x[1] ^= rk[25];
    rk[26] ^= rk[19];
    x[2] ^= rk[26];
    rk[27] ^= rk[20];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    rk[28] ^= rk[21];
    x[0] ^= rk[28];
    rk[29] ^= rk[22];
    x[1] ^= rk[29];
    rk[30] ^= rk[23];
    x[2] ^= rk[30];
    rk[31] ^= rk[24];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[0] ^= x[0];
    p[1] ^= x[1];
    p[2] ^= x[2];
    p[3] ^= x[3];
    /* round 3, 7, 11 */
    KEY_EXPAND_ELT(rk, 0, 4);
    rk[0] ^= rk[28];
    rk[1] ^= rk[29];
    rk[2] ^= rk[30];
    rk[3] ^= rk[31];
    x[0] = p[8] ^ rk[0];
    x[1] = p[9] ^ rk[1];
    x[2] = p[10] ^ rk[2];
    x[3] = p[11] ^ rk[3];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 4, 8);
    rk[4] ^= rk[0];
    rk[5] ^= rk[1];
    rk[6] ^= rk[2];
    rk[7] ^= rk[3];
    x[0] ^= rk[4];
    x[1] ^= rk[5];
    x[2] ^= rk[6];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 8, 12);
    rk[8] ^= rk[4];
    rk[9] ^= rk[5];
    rk[10] ^= rk[6];
    rk[11] ^= rk[7];
    x[0] ^= rk[8];
    x[1] ^= rk[9];
    x[2] ^= rk[10];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 12, 16);
    rk[12] ^= rk[8];
    rk[13] ^= rk[9];
    rk[14] ^= rk[10];
    rk[15] ^= rk[11];
    x[0] ^= rk[12];
    x[1] ^= rk[13];
    x[2] ^= rk[14];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[4] ^= x[0];
    p[5] ^= x[1];
    p[6] ^= x[2];
    p[7] ^= x[3];
    KEY_EXPAND_ELT(rk, 16, 20);
    rk[16] ^= rk[12];
    rk[17] ^= rk[13];
    rk[18] ^= rk[14];
    rk[19] ^= rk[15];
    x[0] = p[0] ^ rk[16];
    x[1] = p[1] ^ rk[17];
    x[2] = p[2] ^ rk[18];
    x[3] = p[3] ^ rk[19];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 20, 24);
    rk[20] ^= rk[16];
    rk[21] ^= rk[17];
    rk[22] ^= rk[18];
    rk[23] ^= rk[19];
    x[0] ^= rk[20];
    x[1] ^= rk[21];
    x[2] ^= rk[22];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 24, 28);
    rk[24] ^= rk[20];
    rk[25] ^= rk[21];
    rk[26] ^= rk[22];
    rk[27] ^= rk[23];
    x[0] ^= rk[24];
    x[1] ^= rk[25];
    x[2] ^= rk[26];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 28, 32);
    rk[28] ^= rk[24];
    rk[29] ^= rk[25];
    rk[30] ^= rk[26];
    rk[31] ^= rk[27];
    x[0] ^= rk[28];
    x[1] ^= rk[29];
    x[2] ^= rk[30];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[12] ^= x[0];
    p[13] ^= x[1];
    p[14] ^= x[2];
    p[15] ^= x[3];
    /* round 4, 8, 12 */
    rk[0] ^= rk[25];
    x[0] = p[4] ^ rk[0];
    rk[1] ^= rk[26];
    x[1] = p[5] ^ rk[1];
    rk[2] ^= rk[27];
    x[2] = p[6] ^ rk[2];
    rk[3] ^= rk[28];
    x[3] = p[7] ^ rk[3];
    AES_ROUND_NOKEY(x);
    rk[4] ^= rk[29];
    x[0] ^= rk[4];
    rk[5] ^= rk[30];
    x[1] ^= rk[5];
    rk[6] ^= rk[31];
    x[2] ^= rk[6];
    rk[7] ^= rk[0];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    rk[8] ^= rk[1];
    x[0] ^= rk[8];
    rk[9] ^= rk[2];
    x[1] ^= rk[9];
    rk[10] ^= rk[3];
    x[2] ^= rk[10];
    rk[11] ^= rk[4];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    rk[12] ^= rk[5];
    x[0] ^= rk[12];
    rk[13] ^= rk[6];
    x[1] ^= rk[13];
    rk[14] ^= rk[7];
    x[2] ^= rk[14];
    rk[15] ^= rk[8];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[0] ^= x[0];
    p[1] ^= x[1];
    p[2] ^= x[2];
    p[3] ^= x[3];
    rk[16] ^= rk[9];
    x[0] = p[12] ^ rk[16];
    rk[17] ^= rk[10];
    x[1] = p[13] ^ rk[17];
    rk[18] ^= rk[11];
    x[2] = p[14] ^ rk[18];
    rk[19] ^= rk[12];
    x[3] = p[15] ^ rk[19];
    AES_ROUND_NOKEY(x);
    rk[20] ^= rk[13];
    x[0] ^= rk[20];
    rk[21] ^= rk[14];
    x[1] ^= rk[21];
    rk[22] ^= rk[15];
    x[2] ^= rk[22];
    rk[23] ^= rk[16];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    rk[24] ^= rk[17];
    x[0] ^= rk[24];
    rk[25] ^= rk[18];
    x[1] ^= rk[25];
    rk[26] ^= rk[19];
    x[2] ^= rk[26];
    rk[27] ^= rk[20];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    rk[28] ^= rk[21];
    x[0] ^= rk[28];
    rk[29] ^= rk[22];
    x[1] ^= rk[29];
    rk[30] ^= rk[23];
    x[2] ^= rk[30];
    rk[31] ^= rk[24];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[8] ^= x[0];
    p[9] ^= x[1];
    p[10] ^= x[2];
    p[11] ^= x[3];
  }
  /* round 13 */
  KEY_EXPAND_ELT(rk, 0, 4);
  rk[0] ^= rk[28];
  rk[1] ^= rk[29];
  rk[2] ^= rk[30];
  rk[3] ^= rk[31];
  x[0] = p[0] ^ rk[0];
  x[1] = p[1] ^ rk[1];
  x[2] = p[2] ^ rk[2];
  x[3] = p[3] ^ rk[3];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 4, 8);
  rk[4] ^= rk[0];
  rk[5] ^= rk[1];
  rk[6] ^= rk[2];
  rk[7] ^= rk[3];
  x[0] ^= rk[4];
  x[1] ^= rk[5];
  x[2] ^= rk[6];
  x[3] ^= rk[7];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 8, 12);
  rk[8] ^= rk[4];
  rk[9] ^= rk[5];
  rk[10] ^= rk[6];
  rk[11] ^= rk[7];
  x[0] ^= rk[8];
  x[1] ^= rk[9];
  x[2] ^= rk[10];
  x[3] ^= rk[11];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 12, 16);
  rk[12] ^= rk[8];
  rk[13] ^= rk[9];
  rk[14] ^= rk[10];
  rk[15] ^= rk[11];
  x[0] ^= rk[12];
  x[1] ^= rk[13];
  x[2] ^= rk[14];
  x[3] ^= rk[15];
  AES_ROUND_NOKEY(x);
  p[12] ^= x[0];
  p[13] ^= x[1];
  p[14] ^= x[2];
  p[15] ^= x[3];
  KEY_EXPAND_ELT(rk, 16, 20);
  rk[16] ^= rk[12];
  rk[17] ^= rk[13];
  rk[18] ^= rk[14];
  rk[19] ^= rk[15];
  x[0] = p[8] ^ rk[16];
  x[1] = p[9] ^ rk[17];
  x[2] = p[10] ^ rk[18];
  x[3] = p[11] ^ rk[19];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 20, 24);
  rk[20] ^= rk[16];
  rk[21] ^= rk[17];
  rk[22] ^= rk[18];
  rk[23] ^= rk[19];
  x[0] ^= rk[20];
  x[1] ^= rk[21];
  x[2] ^= rk[22];
  x[3] ^= rk[23];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 24, 28);
  rk[24] ^= rk[20] ^ ctx.count[1];
  rk[25] ^= rk[21] ^ ctx.count[0];
  rk[26] ^= rk[22] ^ ctx.count[3];
  rk[27] ^= rk[23] ^ op.t32(~ctx.count[2]);
  x[0] ^= rk[24];
  x[1] ^= rk[25];
  x[2] ^= rk[26];
  x[3] ^= rk[27];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 28, 32);
  rk[28] ^= rk[24];
  rk[29] ^= rk[25];
  rk[30] ^= rk[26];
  rk[31] ^= rk[27];
  x[0] ^= rk[28];
  x[1] ^= rk[29];
  x[2] ^= rk[30];
  x[3] ^= rk[31];
  AES_ROUND_NOKEY(x);
  p[4] ^= x[0];
  p[5] ^= x[1];
  p[6] ^= x[2];
  p[7] ^= x[3];
  ctx.h[0] ^= p[8];
  ctx.h[1] ^= p[9];
  ctx.h[2] ^= p[10];
  ctx.h[3] ^= p[11];
  ctx.h[4] ^= p[12];
  ctx.h[5] ^= p[13];
  ctx.h[6] ^= p[14];
  ctx.h[7] ^= p[15];
  ctx.h[8] ^= p[0];
  ctx.h[9] ^= p[1];
  ctx.h[10] ^= p[2];
  ctx.h[11] ^= p[3];
  ctx.h[12] ^= p[4];
  ctx.h[13] ^= p[5];
  ctx.h[14] ^= p[6];
  ctx.h[15] ^= p[7];
}

var shavite = function(ctx, data) {
  var len = data.length;
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  while (len > 0) {
    var clen = ctx.buffer.length - ctx.ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      if ((ctx.count[0] = op.t32(ctx.count[0] + 1024)) == 0) {
        ctx.count[1] = op.t32(ctx.count[1] + 1);
        if (ctx.count[1] == 0) {
          ctx.count[2] = op.t32(ctx.count[2] + 1);
          if (ctx.count[2] == 0) {
            ctx.count[3] = op.t32(ctx.count[3] + 1);
          }
        }
      }
      c512(ctx, buf);
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
}

var shaviteClose = function(ctx, ub, n) {
  var buf;
  var ptr, u;
  var z;
  var count = new Array(4);

  buf = ctx.buffer;
  ptr = ctx.ptr;
  count[0] = (ctx.count[0] += (ptr << 3) + n);
  count[1] = ctx.count[1];
  count[2] = ctx.count[2];
  count[3] = ctx.count[3];
  z = 0x80 >> n;
  z = ((ub & -z) | z) & 0xFF;
  if (ptr == 0 && n == 0) {
    buf[0] = 0x80;
    op.bufferSet(buf, 1, 0, 109);
    op.bufferSet(ctx.count, 0, 0, 4);
  }
  else if (ptr < 110) {
    buf[ptr++] = z;
    op.bufferSet(buf, ptr, 0, 110 - ptr);
  }
  else {
    buf[ptr++] = z;
    op.bufferSet(buf, ptr, 0, 128 - ptr);
    c512(ctx, buf);
    op.bufferSet(buf, 0, 0, 110);
    op.bufferSet(ctx.count, 0, 0, 4);
  }

  var countSwapped = op.swap32Array(count);
  var countBytes = h.int32Buffer2Bytes(countSwapped);
  op.bufferInsert(buf, 110, countBytes, 16);
  buf[126] = (16 << 5) & 0xFF; //just to copy the spec (doesn't make sense)
  buf[127] = 16 >>> 3;
  c512(ctx, buf);

  var out = new Array(16);
  for (u = 0; u < 16; u++)
    out[u] = op.swap32(ctx.h[u]);
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
  ctx.ptr = 0;
  ctx.count = new Array(4);
  op.bufferSet(ctx.count, 0, 0, 4);
  ctx.h = IV512.slice();
  ctx.buffer = new Array(Shavite_BlockSize);
  shavite(ctx, msg);
  var r = shaviteClose(ctx, 0, 0);
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