'use strict';

var blake = require('./lib/blake');
var keccak = require('./lib/keccak').keccak_512;
var skein = require('./lib/skein');
var luffa = require('./lib/luffa');
var simd = require('./lib/simd');
var shavite = require('./lib/shavite');
var cubehash = require('./lib/cubehash');
var jh = require('./lib/jh');
var echo = require('./lib/echo');
var groestl = require('./lib/groestl');
var bmw = require('./lib/bmw');
var h = require('./lib/helper');

var x11hash = module.exports;

module.exports.blake = function(str,format, output) {
  return blake(str,format,output);
}

module.exports.bmw = function(str,format, output) {
  return bmw(str,format,output);
}

module.exports.cubehash = function(str,format, output) {
  return cubehash(str,format,output);
}

module.exports.echo = function(str,format, output) {
  return echo(str,format,output);
}

module.exports.groestl = function(str,format, output) {
  return groestl(str,format,output);
}

module.exports.jh = function(str,format, output) {
  return jh(str,format,output);
}

module.exports.keccak = function(str,format, output) {
  var msg = str;
  if (format === 2) {
    msg = h.int32Buffer2Bytes(str);
  }
  if (output === 1) {
    return keccak['array'](msg);
  } else if (output === 2) {
    return h.bytes2Int32Buffer(keccak['array'](msg));
  } else {
    return keccak['hex'](msg);
  }
}

module.exports.luffa = function(str,format, output) {
  return luffa(str,format,output);
}

module.exports.shavite = function(str,format, output) {
  return shavite(str,format,output);
}

module.exports.simd = function(str,format, output) {
  return simd(str,format,output);
}

module.exports.skein = function(str,format, output) {
  return skein(str,format,output);
}


module.exports.digest = function(str,format, output) {
  var a = blake(str,format,2);
  a = bmw(a,2,2);
  a = groestl(a,2,2);
  a = skein(a,2,2);
  a = jh(a,2,2);
  a = this.keccak(a,2,1);
  a = luffa(a,1,2);
  a = cubehash(a,2,2);
  a = shavite(a,2,2);
  a = simd(a,2,2);
  a = echo(a,2,2);
  a = a.slice(0,8);
  if (output === 2) {
    return a;
  }
  else if (output === 1) {
    return h.int32Buffer2Bytes(a);
  }
  else {
    return h.int32ArrayToHexString(a);
  }
}
