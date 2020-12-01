var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

let obj = {}, map = new Map(), n = 1000000;
for (let i = 0; i < n; i++) {
  obj[i] = i;
  map.set(i, i);
}

const itemsToGet = [];

for (let i = 0; i < 10; i++) {
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
