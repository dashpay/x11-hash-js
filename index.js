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

/**
 * Error codes
 */
var errors = module.exports.errors = {
    input_not_specified: 'input not specified',
    input_single_invalid_type: 'input must be string when inputFormat is not specified',
    input_format_mismatch_string: 'input format mismatch: input should be an string',
    input_format_mismatch_array: 'input format mismatch: input should be an array',
    input_format_invalid: 'invalid input format',
    output_format_invalid: 'invalid output format'
};

/**
 * Obtain an x11 hash
 * @param input {string|array} input data to hash
 * @param inputFormat {number} optional - format of the input: 0: string, 1: 8 bit array, 2: 32 bit array
 * @param outputFormat {number} optional - format of the output: 0: string, 1: 8 bit array, 2: 32 bit array
 * @returns {string|array} x11 hash of input as a string, 8-bit array or 32-bit array
 */
module.exports.digest = function (input, inputFormat, outputFormat) {

    // argument exceptions
    if (input === undefined) {
        throw (errors.input_not_specified);
    } else if (inputFormat === undefined) {

        // single input arg must be string
        if (!(typeof input === 'string' || input instanceof String)) {
            throw (errors.input_single_invalid_type);
        }
    } else {

        // validate input arguments
        if (inputFormat === 0) {
            if (!(typeof input === 'string' || input instanceof String)) {
                throw (errors.input_format_mismatch_string);
            }
        } else if (inputFormat === 1 || inputFormat === 2) {
            if (!Array.isArray(input)) {
                throw (errors.input_format_mismatch_array);
            }
        } else {
            throw (errors.input_format_invalid);
        }

        // validate output format
        if (outputFormat !== undefined
                && outputFormat !== 0
                && outputFormat !== 1
                && outputFormat !== 2) {
            throw (errors.output_format_invalid);
        }
    }

    // obtain the x11 hash of the input
    var a = blake(input, inputFormat, 2);
    a = bmw(a, 2, 2);
    a = groestl(a, 2, 2);
    a = skein(a, 2, 2);
    a = jh(a, 2, 2);
    a = this.keccak(a, 2, 1);
    a = luffa(a, 1, 2);
    a = cubehash(a, 2, 2);
    a = shavite(a, 2, 2);
    a = simd(a, 2, 2);
    a = echo(a, 2, 2);
    a = a.slice(0, 8);

    // output 32-bit array
    if (outputFormat === 2) {
        return a;
    }
    // output 8-bit array
    else if (outputFormat === 1) {
        return h.int32Buffer2Bytes(a);
    }
    // output string
    return h.int32ArrayToHexString(a);
};

// individual x11 hash functions...
module.exports.blake = function (str, format, output) {
    return blake(str, format, output);
};

module.exports.bmw = function (str, format, output) {
    return bmw(str, format, output);
};

module.exports.cubehash = function (str, format, output) {
    return cubehash(str, format, output);
};

module.exports.echo = function (str, format, output) {
    return echo(str, format, output);
};

module.exports.groestl = function (str, format, output) {
    return groestl(str, format, output);
};

module.exports.jh = function (str, format, output) {
    return jh(str, format, output);
};

module.exports.keccak = function (str, format, output) {
    var msg = str;
    if (format === 2) {
        msg = h.int32Buffer2Bytes(str);
    }
    if (output === 1) {
        return keccak.array(msg);
    } else if (output === 2) {
        return h.bytes2Int32Buffer(keccak.array(msg));
    }
    return keccak.hex(msg);

};

module.exports.luffa = function (str, format, output) {
    return luffa(str, format, output);
};

module.exports.shavite = function (str, format, output) {
    return shavite(str, format, output);
};

module.exports.simd = function (str, format, output) {
    return simd(str, format, output);
};

module.exports.skein = function (str, format, output) {
    return skein(str, format, output);
};
