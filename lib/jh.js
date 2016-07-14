/////////////////////////////////////
///////////////  Jh /////////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var he = require('./helper');

var Jh_BlockSize = 64;
var Jh_StateSize = 32;

var JH_HX = 8;
var JH_HY = 4;

var IV512 = he.bytes2Int32Buffer(he.b64Decode("b9FLlj4Aqhdjai4FehXVQ4oiXo0Ml+8L6TQSWfKzw2GJHaDBU2+AHiqpBWvqK22AWI7M2yB1uqapDzp2uvg79wFp5gVB40ppRrWKji5v5loQR6fQwYQ8JDtucbEtWsGZz1f27J2x+FanBoh8VxaxVuPC/N/mhRf7VFpGeMyM3Us="));

var C = he.bytes2Int32Buffer(he.b64Decode("ctXeot8V+Gd7hBUKtyMVV4Gr1pBNWof2Tp9PxcPRK0DqmDrgXEX6nAPF0plmspmaZgKWtPK7U4q1VhQaiNuiMQOjWlyaGQ7bQD+yCofBRBAcBRmAhJ6VHW8z661e583cELoTkgK/a0HceGUV97sn0AosgTk3qnhQPxq/0kEAkdNCLVoN9sx+kN1in5ySwJfOGFynC8crRKzR32XWY8b8I5dubAOe4LgaIQVFfkRs7Kju8QO7XY5h+v2Wl7KUg4GXSo6FN9sDMC8qZ40t+59qlYr+c4H4uGlsisdyRsB/QhTF9BWPvcdexHVEb6ePEbuAUt51t67kiLyCuAAemKaj9I70jzOpo2MVql9WJNW3+Ym28e0gfFrg/TbK6VoGQiw2zik1Q07+mD1TOvl0c5pLp9D1H1lvToGGDp2tga/YWp+nBQZn7jRiaosLKL5uuRcnR3QHJsaAED/goH5vxn5Iew1VCqVK+KTAkePnn5eO8Z6GdnKBUGCN1H6eWkHz5bBi/J8f7EBUIHrj5BoAzvTJhE/XlPWd+pXYVS5+ESTDVKVb33Iovf5uKHj1f+IPpcSyBYl87+5J0y5EfpOF6yhZf3BfaTezJDFKXoYo8R3W5GXHG3cEUbkg53T+Q+gj1IeKfSnoo5J2lPLdy3oJmzDZwR0bMPtb3Bvg2iRJT/Kcgr+k57oxtHC//w0yRAXe+LxIO678MlO70zlFn8PB4CmLoOXJBf33rgkPlHA0EkKQ8TSicbcB40Ttlek7jjZPL5hKiEAdY6Bs9hVHwURLh1Kv/367SvHiCsYwRnC2xcxujOak1aRWvU/KANqdhEvIPhiuc1fORTBk0a3ops5oFFwlZ6PajPLLDuEWM+kGWJqUmZofYLIgwm+Ee9HOrH+g0YUYMllboY3dGdNQmhzAqqW0Rp89Y2fkBGu69soZqwtW7n4fsXnqqSghdOm99zU7NlHuHVesWnVQ03Y6RsL+o31wAfc1wa+YpNhCeO3sIJ5rZ3lBg2MV6jrbqPrDO00ygyyDp0A7HxwnR/NZQPA0ty12muc+TmzSIU/9uP2NOdxXWe+NmwxJK0nr2lui10lo83ANfTuu0HqNVYT1penw5PiOZaC4ovQ2EDtTDKgHnnU+7FqRaJSSVuiIT1uwXFX4urxM47s7mfOHlHt12vTWcmscXWSurCjcNLNtbDSlULgo23H4YeLyEI1RKuPbZDNZ3XX8HKy88UPOP6Jnu9E8AuhDsDMKW8qIKaF1fzQZTbQWU1ySO5TDDnlNHnl0dde27q8/6qjU974aOSFc9H4JTCMnUSajJFO6MjzSRKMXSm2m1a21HT6mr/LJCINZPZiRazxWTPh8oXKGYE1G4j7MCG7H9i+YM7OxvHZeK9Zmpe/E5ioG9LbovsHUNnTughW87yFj/cFODfRTyWmnfVrEBlhYJn7BFBYG4PoWfpCvPShjnT/SyfLjAJvSDF+qzjC31AwwdCpRFvLgMpgN6zDY4874mkvFnnu18XmS/1HmbgSGaNObI01X5pZnMczmpvMXCnUFsXaB2RMybM48F1KE+AWiYvQry7N4RxVH/0ZUgiOTakg431gHTl5lZfL8fIn8hlCOMXAuRNALyobwQAmiMHhHTmWg7jnR9ziD917pN+QsOr0hl7ImARP4b6NE7dHvn97ni6DfFXYlktk8hff2EtxCvtin7HyrJ7B+U4192qo+qN6qJc6TvQJp2Fr2Q/0acwj5wF/v2hdKGaWXTWYzTP0hajW0mDHbQRVw6h4Pu+3NVJua0GOhUZdAcvZ1nb+RR2/i"));

// var IV512 = [
//   (0x6fd14b96), (0x3e00aa17), (0x636a2e05), (0x7a15d543),
//   (0x8a225e8d), (0x0c97ef0b), (0xe9341259), (0xf2b3c361),
//   (0x891da0c1), (0x536f801e), (0x2aa9056b), (0xea2b6d80),
//   (0x588eccdb), (0x2075baa6), (0xa90f3a76), (0xbaf83bf7),
//   (0x0169e605), (0x41e34a69), (0x46b58a8e), (0x2e6fe65a),
//   (0x1047a7d0), (0xc1843c24), (0x3b6e71b1), (0x2d5ac199),
//   (0xcf57f6ec), (0x9db1f856), (0xa706887c), (0x5716b156),
//   (0xe3c2fcdf), (0xe68517fb), (0x545a4678), (0xcc8cdd4b)
// ];

// var C = [
//   (0x72d5dea2), (0xdf15f867), (0x7b84150a),
//   (0xb7231557), (0x81abd690), (0x4d5a87f6),
//   (0x4e9f4fc5), (0xc3d12b40), (0xea983ae0),
//   (0x5c45fa9c), (0x03c5d299), (0x66b2999a),
//   (0x660296b4), (0xf2bb538a), (0xb556141a),
//   (0x88dba231), (0x03a35a5c), (0x9a190edb),
//   (0x403fb20a), (0x87c14410), (0x1c051980),
//   (0x849e951d), (0x6f33ebad), (0x5ee7cddc),
//   (0x10ba1392), (0x02bf6b41), (0xdc786515),
//   (0xf7bb27d0), (0x0a2c8139), (0x37aa7850),
//   (0x3f1abfd2), (0x410091d3), (0x422d5a0d),
//   (0xf6cc7e90), (0xdd629f9c), (0x92c097ce),
//   (0x185ca70b), (0xc72b44ac), (0xd1df65d6),
//   (0x63c6fc23), (0x976e6c03), (0x9ee0b81a),
//   (0x2105457e), (0x446ceca8), (0xeef103bb),
//   (0x5d8e61fa), (0xfd9697b2), (0x94838197),
//   (0x4a8e8537), (0xdb03302f), (0x2a678d2d),
//   (0xfb9f6a95), (0x8afe7381), (0xf8b8696c),
//   (0x8ac77246), (0xc07f4214), (0xc5f4158f),
//   (0xbdc75ec4), (0x75446fa7), (0x8f11bb80),
//   (0x52de75b7), (0xaee488bc), (0x82b8001e),
//   (0x98a6a3f4), (0x8ef48f33), (0xa9a36315),
//   (0xaa5f5624), (0xd5b7f989), (0xb6f1ed20),
//   (0x7c5ae0fd), (0x36cae95a), (0x06422c36),
//   (0xce293543), (0x4efe983d), (0x533af974),
//   (0x739a4ba7), (0xd0f51f59), (0x6f4e8186),
//   (0x0e9dad81), (0xafd85a9f), (0xa7050667),
//   (0xee34626a), (0x8b0b28be), (0x6eb91727),
//   (0x47740726), (0xc680103f), (0xe0a07e6f),
//   (0xc67e487b), (0x0d550aa5), (0x4af8a4c0),
//   (0x91e3e79f), (0x978ef19e), (0x86767281),
//   (0x50608dd4), (0x7e9e5a41), (0xf3e5b062),
//   (0xfc9f1fec), (0x4054207a), (0xe3e41a00),
//   (0xcef4c984), (0x4fd794f5), (0x9dfa95d8),
//   (0x552e7e11), (0x24c354a5), (0x5bdf7228),
//   (0xbdfe6e28), (0x78f57fe2), (0x0fa5c4b2),
//   (0x05897cef), (0xee49d32e), (0x447e9385),
//   (0xeb28597f), (0x705f6937), (0xb324314a),
//   (0x5e8628f1), (0x1dd6e465), (0xc71b7704),
//   (0x51b920e7), (0x74fe43e8), (0x23d4878a),
//   (0x7d29e8a3), (0x927694f2), (0xddcb7a09),
//   (0x9b30d9c1), (0x1d1b30fb), (0x5bdc1be0),
//   (0xda24494f), (0xf29c82bf), (0xa4e7ba31),
//   (0xb470bfff), (0x0d324405), (0xdef8bc48),
//   (0x3baefc32), (0x53bbd339), (0x459fc3c1),
//   (0xe0298ba0), (0xe5c905fd), (0xf7ae090f),
//   (0x94703412), (0x4290f134), (0xa271b701),
//   (0xe344ed95), (0xe93b8e36), (0x4f2f984a),
//   (0x88401d63), (0xa06cf615), (0x47c1444b),
//   (0x8752afff), (0x7ebb4af1), (0xe20ac630),
//   (0x4670b6c5), (0xcc6e8ce6), (0xa4d5a456),
//   (0xbd4fca00), (0xda9d844b), (0xc83e18ae),
//   (0x7357ce45), (0x3064d1ad), (0xe8a6ce68),
//   (0x145c2567), (0xa3da8cf2), (0xcb0ee116),
//   (0x33e90658), (0x9a94999a), (0x1f60b220),
//   (0xc26f847b), (0xd1ceac7f), (0xa0d18518),
//   (0x32595ba1), (0x8ddd19d3), (0x509a1cc0),
//   (0xaaa5b446), (0x9f3d6367), (0xe4046bba),
//   (0xf6ca19ab), (0x0b56ee7e), (0x1fb179ea),
//   (0xa9282174), (0xe9bdf735), (0x3b3651ee),
//   (0x1d57ac5a), (0x7550d376), (0x3a46c2fe),
//   (0xa37d7001), (0xf735c1af), (0x98a4d842),
//   (0x78edec20), (0x9e6b6779), (0x41836315),
//   (0xea3adba8), (0xfac33b4d), (0x32832c83),
//   (0xa7403b1f), (0x1c2747f3), (0x5940f034),
//   (0xb72d769a), (0xe73e4e6c), (0xd2214ffd),
//   (0xb8fd8d39), (0xdc5759ef), (0x8d9b0c49),
//   (0x2b49ebda), (0x5ba2d749), (0x68f3700d),
//   (0x7d3baed0), (0x7a8d5584), (0xf5a5e9f0),
//   (0xe4f88e65), (0xa0b8a2f4), (0x36103b53),
//   (0x0ca8079e), (0x753eec5a), (0x91689492),
//   (0x56e8884f), (0x5bb05c55), (0xf8babc4c),
//   (0xe3bb3b99), (0xf387947b), (0x75daf4d6),
//   (0x726b1c5d), (0x64aeac28), (0xdc34b36d),
//   (0x6c34a550), (0xb828db71), (0xf861e2f2),
//   (0x108d512a), (0xe3db6433), (0x59dd75fc),
//   (0x1cacbcf1), (0x43ce3fa2), (0x67bbd13c),
//   (0x02e843b0), (0x330a5bca), (0x8829a175),
//   (0x7f34194d), (0xb416535c), (0x923b94c3),
//   (0x0e794d1e), (0x797475d7), (0xb6eeaf3f),
//   (0xeaa8d4f7), (0xbe1a3921), (0x5cf47e09),
//   (0x4c232751), (0x26a32453), (0xba323cd2),
//   (0x44a3174a), (0x6da6d5ad), (0xb51d3ea6),
//   (0xaff2c908), (0x83593d98), (0x916b3c56),
//   (0x4cf87ca1), (0x7286604d), (0x46e23ecc),
//   (0x086ec7f6), (0x2f9833b3), (0xb1bc765e),
//   (0x2bd666a5), (0xefc4e62a), (0x06f4b6e8),
//   (0xbec1d436), (0x74ee8215), (0xbcef2163),
//   (0xfdc14e0d), (0xf453c969), (0xa77d5ac4),
//   (0x06585826), (0x7ec11416), (0x06e0fa16),
//   (0x7e90af3d), (0x28639d3f), (0xd2c9f2e3),
//   (0x009bd20c), (0x5faace30), (0xb7d40c30),
//   (0x742a5116), (0xf2e03298), (0x0deb30d8),
//   (0xe3cef89a), (0x4bc59e7b), (0xb5f17992),
//   (0xff51e66e), (0x048668d3), (0x9b234d57),
//   (0xe6966731), (0xcce6a6f3), (0x170a7505),
//   (0xb17681d9), (0x13326cce), (0x3c175284),
//   (0xf805a262), (0xf42bcbb3), (0x78471547),
//   (0xff465482), (0x23936a48), (0x38df5807),
//   (0x4e5e6565), (0xf2fc7c89), (0xfc86508e),
//   (0x31702e44), (0xd00bca86), (0xf04009a2),
//   (0x3078474e), (0x65a0ee39), (0xd1f73883),
//   (0xf75ee937), (0xe42c3abd), (0x2197b226),
//   (0x0113f86f), (0xa344edd1), (0xef9fdee7),
//   (0x8ba0df15), (0x762592d9), (0x3c85f7f6),
//   (0x12dc42be), (0xd8a7ec7c), (0xab27b07e),
//   (0x538d7dda), (0xaa3ea8de), (0xaa25ce93),
//   (0xbd0269d8), (0x5af643fd), (0x1a7308f9),
//   (0xc05fefda), (0x174a19a5), (0x974d6633),
//   (0x4cfd216a), (0x35b49831), (0xdb411570),
//   (0xea1e0fbb), (0xedcd549b), (0x9ad063a1),
//   (0x51974072), (0xf6759dbf), (0x91476fe2)
// ];

var Sb = function(x, c) {
  x[3] = ~x[3];
  x[0] ^= (c) & ~x[2];
  var tmp = (c) ^ (x[0] & x[1]);
  x[0] ^= x[2] & x[3];
  x[3] ^= ~x[1] & x[2];
  x[1] ^= x[0] & x[2];
  x[2] ^= x[0] & ~x[3];
  x[0] ^= x[1] | x[3];
  x[3] ^= x[1] & x[2];
  x[1] ^= tmp & x[0];
  x[2] ^= tmp;
  return x;
}

var Lb = function(x) {
  x[4] ^= x[1];
  x[5] ^= x[2];
  x[6] ^= x[3] ^ x[0];
  x[7] ^= x[0];
  x[0] ^= x[5];
  x[1] ^= x[6];
  x[2] ^= x[7] ^ x[4];
  x[3] ^= x[4];
  return x;
}

var Ceven = function(n, r) {
  return op.swap32(C[((r) << 3) + 3 - n]);
}

var Codd = function(n, r) {
  return op.swap32(C[((r) << 3) + 7 - n]);
}

var S = function(x0, x1, x2, x3, cb, r) {
  var x = Sb([x0[3], x1[3], x2[3], x3[3]], cb(3, r));
  x0[3] = x[0];
  x1[3] = x[1];
  x2[3] = x[2];
  x3[3] = x[3];
  x = Sb([x0[2], x1[2], x2[2], x3[2]], cb(2, r));
  x0[2] = x[0];
  x1[2] = x[1];
  x2[2] = x[2];
  x3[2] = x[3];
  x = Sb([x0[1], x1[1], x2[1], x3[1]], cb(1, r));
  x0[1] = x[0];
  x1[1] = x[1];
  x2[1] = x[2];
  x3[1] = x[3];
  x = Sb([x0[0], x1[0], x2[0], x3[0]], cb(0, r));
  x0[0] = x[0];
  x1[0] = x[1];
  x2[0] = x[2];
  x3[0] = x[3];
}

var L = function(x0, x1, x2, x3, x4, x5, x6, x7) {
  var x = Lb([x0[3], x1[3], x2[3], x3[3], x4[3], x5[3], x6[3], x7[3]]);
  x0[3] = x[0];
  x1[3] = x[1];
  x2[3] = x[2];
  x3[3] = x[3];
  x4[3] = x[4];
  x5[3] = x[5];
  x6[3] = x[6];
  x7[3] = x[7];
  x = Lb([x0[2], x1[2], x2[2], x3[2], x4[2], x5[2], x6[2], x7[2]]);
  x0[2] = x[0];
  x1[2] = x[1];
  x2[2] = x[2];
  x3[2] = x[3];
  x4[2] = x[4];
  x5[2] = x[5];
  x6[2] = x[6];
  x7[2] = x[7];
  x = Lb([x0[1], x1[1], x2[1], x3[1], x4[1], x5[1], x6[1], x7[1]]);
  x0[1] = x[0];
  x1[1] = x[1];
  x2[1] = x[2];
  x3[1] = x[3];
  x4[1] = x[4];
  x5[1] = x[5];
  x6[1] = x[6];
  x7[1] = x[7];
  x = Lb([x0[0], x1[0], x2[0], x3[0], x4[0], x5[0], x6[0], x7[0]]);
  x0[0] = x[0];
  x1[0] = x[1];
  x2[0] = x[2];
  x3[0] = x[3];
  x4[0] = x[4];
  x5[0] = x[5];
  x6[0] = x[6];
  x7[0] = x[7];
}

var Wz = function(x, c, n) {
  var t = (x[3] & (c)) << (n);
  x[3] = ((x[3] >> (n)) & (c)) | t;
  t = (x[2] & (c)) << (n);
  x[2] = ((x[2] >> (n)) & (c)) | t;
  t = (x[1] & (c)) << (n);
  x[1] = ((x[1] >> (n)) & (c)) | t;
  t = (x[0] & (c)) << (n);
  x[0] = ((x[0] >> (n)) & (c)) | t;
}

var W = function(ro, x) {
  switch (ro) {
    case 0:
      return Wz(x, (0x55555555), 1);
    case 1:
      return Wz(x, (0x33333333), 2);
    case 2:
      return Wz(x, (0x0F0F0F0F), 4);
    case 3:
      return Wz(x, (0x00FF00FF), 8);
    case 4:
      return Wz(x, (0x0000FFFF), 16);
    case 5:
      {
        var t = x[3];
        x[3] = x[2];
        x[2] = t;
        t = x[1];
        x[1] = x[0];
        x[0] = t;
        return;
      }
    case 6:
      {
        var t = x[3];
        x[3] = x[1];
        x[1] = t;
        t = x[2];
        x[2] = x[0];
        x[0] = t;
        return;
      }
  }
}

var SL = function(h, r, ro) {
  S(h[0], h[2], h[4], h[6], Ceven, r);
  S(h[1], h[3], h[5], h[7], Codd, r);
  L(h[0], h[2], h[4], h[6], h[1], h[3], h[5], h[7]);
  W(ro, h[1]);
  W(ro, h[3]);
  W(ro, h[5]);
  W(ro, h[7]);
}

var READ_STATE = function(h, state) {
  h[0][3] = state[0];
  h[0][2] = state[1];
  h[0][1] = state[2];
  h[0][0] = state[3];
  h[1][3] = state[4];
  h[1][2] = state[5];
  h[1][1] = state[6];
  h[1][0] = state[7];
  h[2][3] = state[8];
  h[2][2] = state[9];
  h[2][1] = state[10];
  h[2][0] = state[11];
  h[3][3] = state[12];
  h[3][2] = state[13];
  h[3][1] = state[14];
  h[3][0] = state[15];
  h[4][3] = state[16];
  h[4][2] = state[17];
  h[4][1] = state[18];
  h[4][0] = state[19];
  h[5][3] = state[20];
  h[5][2] = state[21];
  h[5][1] = state[22];
  h[5][0] = state[23];
  h[6][3] = state[24];
  h[6][2] = state[25];
  h[6][1] = state[26];
  h[6][0] = state[27];
  h[7][3] = state[28];
  h[7][2] = state[29];
  h[7][1] = state[30];
  h[7][0] = state[31];
}

var WRITE_STATE = function(h, state) {
  state[0] = h[0][3];
  state[1] = h[0][2];
  state[2] = h[0][1];
  state[3] = h[0][0];
  state[4] = h[1][3];
  state[5] = h[1][2];
  state[6] = h[1][1];
  state[7] = h[1][0];
  state[8] = h[2][3];
  state[9] = h[2][2];
  state[10] = h[2][1];
  state[11] = h[2][0];
  state[12] = h[3][3];
  state[13] = h[3][2];
  state[14] = h[3][1];
  state[15] = h[3][0];
  state[16] = h[4][3];
  state[17] = h[4][2];
  state[18] = h[4][1];
  state[19] = h[4][0];
  state[20] = h[5][3];
  state[21] = h[5][2];
  state[22] = h[5][1];
  state[23] = h[5][0];
  state[24] = h[6][3];
  state[25] = h[6][2];
  state[26] = h[6][1];
  state[27] = h[6][0];
  state[28] = h[7][3];
  state[29] = h[7][2];
  state[30] = h[7][1];
  state[31] = h[7][0];
}

var E8 = function(h) {
  for (var r = 0; r < 42; r += 7) {
    SL(h, r + 0, 0);
    SL(h, r + 1, 1);
    SL(h, r + 2, 2);
    SL(h, r + 3, 3);
    SL(h, r + 4, 4);
    SL(h, r + 5, 5);
    SL(h, r + 6, 6);
  }
}

var bufferXORInsertBackwards = function(buffer, data, x, y, bufferOffsetX, bufferOffsetY) {
  if (!bufferOffsetX) bufferOffsetX = 0;
  if (!bufferOffsetY) bufferOffsetY = 0;
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < x; j++) {
      var m = i + bufferOffsetX;
      var n = bufferOffsetY + y - 1 - j;
      var xOr = buffer[m][n] ^ data[i * 4 + j];
      buffer[m][n] = xOr;
    }
  }
}

var jh = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (!len) len = data.length;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  var V = new Array(JH_HX);
  for (var i = 0; i < JH_HX; i++) {
    V[i] = new Array(JH_HY);
  }
  READ_STATE(V, ctx.state);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int32Buf = op.swap32Array(he.bytes2Int32Buffer(buf));

      bufferXORInsertBackwards(V, int32Buf, 4, 4);
      E8(V);
      bufferXORInsertBackwards(V, int32Buf, 4, 4, 4, 0);
      if ((ctx.blockCountLow = op.t32(ctx.blockCountLow + 1)) == 0)
        ctx.blockCountHigh++;
      ptr = 0;
    }
  }
  WRITE_STATE(V, ctx.state);
  ctx.ptr = ptr;
}

var jhClose = function(ctx) {
  var z;
  var buf = new Array(128);
  var numz, u;
  var l = new Array(4);
  buf[0] = 0x80;
  if (ctx.ptr == 0) {
    numz = 47;
  }
  else {
    numz = 111 - ctx.ptr;
  }
  op.bufferSet(buf, 1, 0, numz);
  l[0] = op.t32(ctx.blockCountLow << 9) + (ctx.ptr << 3);
  l[1] = op.t32(ctx.blockCountLow >> 23) + op.t32(ctx.blockCountHigh << 9);
  l[2] = op.t32(ctx.blockCountHigh >> 23);
  l[3] = 0;
  var lBytes = he.int32Buffer2Bytes(op.swap32Array(l));
  op.bufferInsertBackwards(buf, 1 + numz, lBytes, 16);
  jh(ctx, buf, numz + 17);
  var out = new Array(16);
  for (u = 0; u < 16; u++)
    out[u] = op.swap32(ctx.state[u + 16]);
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = he.int32Buffer2Bytes(input);
  }
  else {
    msg = he.string2bytes(input);
  }
  var ctx = {};
  ctx.state = op.swap32Array(IV512);
  ctx.ptr = 0;
  ctx.buffer = new Array(Jh_BlockSize);
  ctx.blockCountHigh = 0;
  ctx.blockCountLow = 0;
  jh(ctx, msg);
  var r = jhClose(ctx);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = he.int32Buffer2Bytes(r)
  }
  else {
    out = he.int32ArrayToHexString(r)
  }
  return out;
}