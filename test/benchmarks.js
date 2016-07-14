var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var x11 = require('../');

var longDream = 'Take this kiss upon the brow! And, in parting from you now, Thus much let me avow-- You are not wrong, who deem That my days have been a dream; Yet if hope has flown away In a night, or in a day, In a vision, or in none, Is it therefore the less gone? All that we see or seem Is but a dream within a dream. I stand amid the roar Of a surf-tormented shore, And I hold within my hand Grains of the golden sand-- How few! yet how they creep Through my fingers to the deep, While I weep--while I weep! O God! can I not grasp Them with a tighter clasp? O God! can I not save One from the pitiless wave? Is all that we see or seem But a dream within a dream?';

var sentence = longDream;
// add tests 
suite
.add('Hash#x11', function() {
  x11.digest(sentence);
})
.add('Hash#blake', function() {
  x11.blake(sentence);
})
.add('Hash#bmw', function() {
  x11.bmw(sentence);
})
.add('Hash#cubehash', function() {
  x11.cubehash(sentence);
})
.add('Hash#echo', function() {
  x11.echo(sentence);
})
.add('Hash#groestl', function() {
  x11.groestl(sentence);
})
.add('Hash#js', function() {
  x11.jh(sentence);
})
.add('Hash#keccak', function() {
  x11.keccak(sentence);
})
.add('Hash#luffa', function() {
  x11.luffa(sentence);
})
.add('Hash#shavite', function() {
  x11.shavite(sentence);
})
.add('Hash#simd', function() {
  x11.simd(sentence);
})
.add('Hash#skein', function() {
  x11.skein(sentence);
})
//add listeners 
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async 
.run({ 'async': true });