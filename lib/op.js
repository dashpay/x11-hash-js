'use strict';
//the right shift is important, it has to do with 32 bit operations in javascript, it will make things faster
function u64(h, l) {
  this.hi = h >>> 0;
  this.lo = l >>> 0;
}

u64.prototype.set = function(oWord) {
  this.lo = oWord.lo;
  this.hi = oWord.hi;
}

u64.prototype.add = function(oWord) {
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (this.lo & 0XFFFF) + (oWord.lo & 0XFFFF);
  lowMid = (this.lo >>> 16) + (oWord.lo >>> 16) + (lowest >>> 16);
  highMid = (this.hi & 0XFFFF) + (oWord.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (this.hi >>> 16) + (oWord.hi >>> 16) + (highMid >>> 16);

  //now set the hgih and the low accordingly..
  this.lo = (lowMid << 16) | (lowest & 0XFFFF);
  this.hi = (highest << 16) | (highMid & 0XFFFF);

  return this; //for chaining..
};

u64.prototype.addOne = function() {
  if (this.lo === -1 || this.lo === 0xFFFFFFFF) {
    this.lo = 0;
    this.hi++;
  } else {
    this.lo++;
  }
}

u64.prototype.plus = function(oWord) {
  var c = new u64(0, 0);
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (this.lo & 0XFFFF) + (oWord.lo & 0XFFFF);
  lowMid = (this.lo >>> 16) + (oWord.lo >>> 16) + (lowest >>> 16);
  highMid = (this.hi & 0XFFFF) + (oWord.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (this.hi >>> 16) + (oWord.hi >>> 16) + (highMid >>> 16);

  //now set the hgih and the low accordingly..
  c.lo = (lowMid << 16) | (lowest & 0XFFFF);
  c.hi = (highest << 16) | (highMid & 0XFFFF);

  return c; //for chaining..
};

u64.prototype.not = function() {
  return new u64(~this.hi, ~this.lo);
}

u64.prototype.one = function() {
  return new u64(0x0, 0x1);
}

u64.prototype.zero = function() {
  return new u64(0x0, 0x0);
}

u64.prototype.neg = function() {
  return this.not().plus(this.one());
}

u64.prototype.minus = function(oWord) {
  return this.plus(oWord.neg());
};

u64.prototype.isZero = function() {
  return (this.lo === 0) && (this.hi === 0);
}

function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}

function fromNumber(value) {
  if (isNaN(value) || !isFinite(value))
    return this.zero();
  var pow32 = (1 << 32);
  return new u64((value % pow32) | 0, (value / pow32) | 0);
}

u64.prototype.multiply = function(multiplier) {
  if (this.isZero())
    return this.zero();
  if (!isLong(multiplier))
    multiplier = fromNumber(multiplier);
  if (multiplier.isZero())
    return this.zero();

  // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.hi >>> 16;
  var a32 = this.hi & 0xFFFF;
  var a16 = this.lo >>> 16;
  var a00 = this.lo & 0xFFFF;

  var b48 = multiplier.hi >>> 16;
  var b32 = multiplier.hi & 0xFFFF;
  var b16 = multiplier.lo >>> 16;
  var b00 = multiplier.lo & 0xFFFF;

  var c48 = 0,
    c32 = 0,
    c16 = 0,
    c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xFFFF;
  return new u64((c48 << 16) | c32, (c16 << 16) | c00);
};

u64.prototype.shiftLeft = function(bits) {
  bits = bits % 64;
  var c = new u64(0, 0);
  if (bits === 0) {
    return this.clone();
  } else if (bits >= 32) {
    c.lo = 0;
    c.hi = this.lo << (bits - 32);
  }
  else {
    var toMoveUp = this.lo >>> 32 - bits;
    c.lo = this.lo << bits;
    c.hi = (this.hi << bits) | toMoveUp;
  }
  return c; //for chaining..
};
//Shifts this word by the given number of bits to the right (max 32)..
u64.prototype.shiftRight = function(bits) {
  bits = bits % 64;
  var c = new u64(0, 0);
  if (bits === 0) {
    return this.clone();
  } else if (bits >= 32) {
    c.hi = 0;
    c.lo = this.hi >>> (bits - 32);
  }
  else {
    var bitsOff32 = 32 - bits,
      toMoveDown = this.hi << bitsOff32 >>> bitsOff32;
    c.hi = this.hi >>> bits;
    c.lo = this.lo >>> bits | (toMoveDown << bitsOff32);
  }
  return c; //for chaining..
};
//Rotates the bits of this word round to the left (max 32)..
u64.prototype.rotateLeft = function(bits) {
  if (bits > 32) {
    return this.rotateRight(64 - bits);
  }
  var c = new u64(0, 0);
  var newHigh;
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  } else if (bits === 32) { //just switch high and low over in this case..
    newHigh = this.lo;
    c.lo = this.hi;
    c.hi = newHigh;
  }
  else {
    newHigh = (this.hi << bits) | (this.lo >>> (32 - bits));
    c.lo = (this.lo << bits) | (this.hi >>> (32 - bits));
    c.hi = newHigh;
  }
  return c; //for chaining..
};
//Rotates the bits of this word round to the right (max 32)..
u64.prototype.rotateRight = function(bits) {
  if (bits > 32) {
    return this.rotateLeft(64 - bits);
  }
  var c = new u64(0, 0);
  var newHigh;
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  } else if (bits === 32) { //just switch high and low over in this case..
    newHigh = this.lo;
    c.lo = this.hi;
    c.hi = newHigh;
  }
  else {
    newHigh = (this.lo << (32 - bits)) | (this.hi >>> bits);
    c.lo = (this.hi << (32 - bits)) | (this.lo >>> bits);
    c.hi = newHigh;
  }
  return c; //for chaining..
};
//Xors this word with the given other..
u64.prototype.xor = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi ^ oWord.hi;
  c.lo = this.lo ^ oWord.lo;
  return c; //for chaining..
};
//Ands this word with the given other..
u64.prototype.and = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi & oWord.hi;
  c.lo = this.lo & oWord.lo;
  return c; //for chaining..
};
//Converts this word to a string representing it's encoding as 4 UTF2 16 bit
//characters..
u64.prototype.toString = function() {
  var str = "",
    high = this.hi,
    low = this.lo;
  str += String.fromCharCode(high >>> 16);
  str += String.fromCharCode(high << 16 >>> 16);
  str += String.fromCharCode(low >>> 16);
  str += String.fromCharCode(low << 16 >>> 16);
  return str;
};

u64.prototype.toBinaryString = function(sep) {
  var str = "",
    high = this.hi,
    low = this.lo;
  var a = new Array(4);
  a[0] = (high >>> 16).toString(2);
  a[1] = (high << 16 >>> 16).toString(2);
  a[2] = (low >>> 16).toString(2);
  a[3] = (low << 16 >>> 16).toString(2);
  for (var i = 0; i < 4; i++) {
    while (a[i].length < 16) {
      a[i] = '0' + a[i];
    }
  }
  if (!sep) sep = '';
  return a.join(sep);
};
//Creates a deep copy of this Word..
u64.prototype.clone = function() {
  return new u64(this.hi, this.lo);
};
//Given a string a a starting index, returns a new Word which encodes the
//four characters starting from index up to index + 3.
u64.fromChars = function(str, index) {
  var low, high;
  //pairs of UTF2 chars need to be stored as one 32 bit int..
  high = (str.charCodeAt(index) << 16) + str.charCodeAt(index + 1);
  low = (str.charCodeAt(index + 2) << 16) + str.charCodeAt(index + 3);
  return new u64(high, low);
};

u64.prototype.setxor64 = function() {
  var a = arguments;
  for (var i = 0, len = a.length; i < len; i++) {
    this.hi ^= a[i].hi;
    this.lo ^= a[i].lo;
  }
  return this;
}

module.exports.u64 = u64;

module.exports.add64 = function(a, b) {
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (a.lo & 0XFFFF) + (b.lo & 0XFFFF);
  lowMid = (a.lo >>> 16) + (b.lo >>> 16) + (lowest >>> 16);
  highMid = (a.hi & 0XFFFF) + (b.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (a.hi >>> 16) + (b.hi >>> 16) + (highMid >>> 16);

  var r = new this.u64((highest << 16) | (highMid & 0XFFFF), (lowMid << 16) | (lowest & 0XFFFF));

  return r;
};

module.exports.xor64 = function() {
  var a = arguments,
    h = a[0].hi,
    l = a[0].lo;
  for (var i = 1, len = a.length; i < len; i++) {
    h ^= a[i].hi;
    l ^= a[i].lo;
  }
  return new this.u64(h, l);
}

module.exports.clone64Array = function(array) {
  var a = [];
  for (var i in array) {
    a.push(array[i].clone());
  }
  return a;
}

//this shouldn't be a problem, but who knows in the future javascript might support 64bits
module.exports.t32 = function(x) {
  return (x & 0xFFFFFFFF)
}

module.exports.rotl32 = function(x, c) {
  return (((x) << (c)) | ((x) >>> (32 - (c)))) & (0xFFFFFFFF);
}

module.exports.rotr32 = function(x, c) {
  return this.rotl32(x, (32 - (c)));
}

module.exports.swap32 = function(val) {
  return ((val & 0xFF) << 24) |
    ((val & 0xFF00) << 8) |
    ((val >>> 8) & 0xFF00) |
    ((val >>> 24) & 0xFF);
}

module.exports.swap32Array = function(a) {
  //can't do this with map because of support for IE8 (Don't hate me plz).
  var r = Array(a.length);
  for (var i in a) {
    r[i] = (this.swap32(a[i]));
  }
  return r;
}
//for skein

module.exports.rotl64 = function(x, c) {
  var h0 = 0,
    l0 = 0,
    h1 = 0,
    l1 = 0,
    c1 = 64 - c;

  // shift left
  if (c < 32) {
    h0 = (x.hi << c) | ((x.lo & (((1 << c) - 1) | 0) << (32 - c)) >>> (32 - c));
    l0 = x.lo << c;
  }
  else {
    h0 = x.lo << (c - 32);
  }

  // shift right
  if (c1 < 32) {
    h1 = x.hi >>> c1;
    l1 = (x.lo >>> c1) | (x.hi & (((1 << c1) - 1) | 0)) << (32 - c1);
  }
  else {
    l1 = x.hi >>> (c1 - 32);
  }

  return new this.u64(h0 | h1, l0 | l1);
}

module.exports.xnd64 = function(x, y, z) {
  return new this.u64(x.hi ^ ((~y.hi) & z.hi), x.lo ^ ((~y.lo) & z.lo));
}

module.exports.load64 = function(x, i) {
  var l = x[i] | (x[i + 1] << 8) | (x[i + 2] << 16) | (x[i + 3] << 24);
  var h = x[i + 4] | (x[i + 5] << 8) | (x[i + 6] << 16) | (x[i + 7] << 24);
  return new this.u64(h, l);
}

module.exports.bufferInsert = function(buffer, bufferOffset, data, len) {
  for (var i = 0; i < len; i++) {
    buffer[i + bufferOffset] = data[i];
  }
}

module.exports.bufferInsert64 = function(buffer, bufferOffset, data, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = data[i].clone();
  }
}

module.exports.buffer2Insert = function(buffer, bufferOffset, bufferOffset2, data, len, len2) {
  for (var i = len - 1; i >= 0; i--) {
    for (var j = len2 - 1; j >= 0; j--) {
      buffer[i + bufferOffset][j + bufferOffset2] = data[i][j];
    }
  }
}


module.exports.bufferInsertBackwards = function(buffer, bufferOffset, data, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = data[len - 1 - i];
  }
}

module.exports.bufferSet = function(buffer, bufferOffset, value, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = value;
  }
}

module.exports.bufferXORInsert = function(buffer, bufferOffset, data, dataOffset, len) {
  for (var i = 0; i < len; i++) {
    buffer[i + bufferOffset] ^= data[i + dataOffset];
  }
}

module.exports.xORTable = function(d, s1, s2, len) {
  for (var i = 0; i < len; i++) {
    d[i] = s1[i] ^ s2[i];
  }
}