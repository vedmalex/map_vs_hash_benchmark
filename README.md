# map_vs_hash_benchmark

here is sample benchmark

—
```js
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

let obj = {}, map = new Map(), n = 1000000;

for (let i = 0; i < n; i++) {

obj[i] = i;

map.set(i, i);

}

const itemsToGet = [];

for (let i = 0; i < 10000; i++) {

itemsToGet.push(Math.trunc(Math.random()*100000))

}

suite.add('hasTest#Map', function() {

for (let i = 0; i < itemsToGet.length; i++) {

const item = itemsToGet[i];

map.has(item);

}

})

.add('hasTest#hash', function() {

for (let i = 0; i < itemsToGet.length; i++) {

const item = itemsToGet[i];

obj.hasOwnProperty(item);

}

})

.add('getTest#Map', function() {

for (let i = 0; i < itemsToGet.length; i++) {

const item = itemsToGet[i];

map.get(item);

}

})

.add('getTest#hash', function() {

for (let i = 0; i < itemsToGet.length; i++) {

const item = itemsToGet[i];

obj[item];

}

})

.on('cycle', function(event) {

console.log(String(event.target));

})

.on('complete', function() {

console.log('Fastest is ' + this.filter('fastest').map('name'));

})

suite.run()
```

—

and Hash beat Map in from 10x to 100x times

my result in macbook with m5 cpu

—

1000 items

hasTest#Map x 838 ops/sec ±2.28% (80 runs sampled)

hasTest#hash x 9,980 ops/sec ±1.31% (89 runs sampled)

getTest#Map x 793 ops/sec ±6.04% (74 runs sampled)

getTest#hash x 80,665 ops/sec ±0.83% (90 runs sampled)

Fastest is getTest#hash

100 items

hasTest#Map x 515,241 ops/sec ±1.87% (86 runs sampled)

hasTest#hash x 856,988 ops/sec ±1.24% (90 runs sampled)

getTest#Map x 526,955 ops/sec ±0.83% (91 runs sampled)

getTest#hash x 5,859,723 ops/sec ±0.69% (91 runs sampled)

10 items

hasTest#Map x 7,526,700 ops/sec ±5.59% (80 runs sampled)

hasTest#hash x 7,785,465 ops/sec ±2.95% (84 runs sampled)

getTest#Map x 8,028,224 ops/sec ±2.50% (87 runs sampled)

getTest#hash x 38,587,007 ops/sec ±7.58% (75 runs sampled)

—

using the hasOwnProperty is slowdown operation :)

that is why I do not use Map

