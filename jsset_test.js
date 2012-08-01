// "Tests" for JsSet. Not really unit tests, just an exercise to make sure
// my JsSet code actually does something.

var assert = require('assert');
var jsset = require('./jsset');

var setA = new jsset.JsSet();
var setB = new jsset.JsSet();

// Let's play with objects first.
var objA = {obj: 'a'};
var objB = {obj: 'b'};

// Neither object should be tagged with a __JSSET_ID__ yet.
assert.equal(objA.__JSSET_ID__, null);
assert.equal(objB.__JSSET_ID__, null);

// Sanity check both sets are empty.
assert.equal(setA.size(), 0);
assert.equal(setB.size(), 0);

// Check that objA is not in either set.
assert.equal(setA.contains(objA), false);
assert.equal(setB.contains(objA), false);

// Doing the contains call would have tagged objA but left objB alone.
assert.equal(objA.__JSSET_ID__, 0);
assert.equal(objB.__JSSET_ID__, null);

// Add objA to setA.
assert.equal(setA.add(objA), true);
assert.equal(setA.contains(objA), true);

// Verify set sizes.
assert.equal(setA.size(), 1);
assert.equal(setB.size(), 0);

// Add objB to setB.
assert.equal(setB.add(objB), true);

// Check the __JSSET_ID__ tags.
assert.equal(objA.__JSSET_ID__, 0);
assert.equal(objB.__JSSET_ID__, 1);

// Verify set sizes.
assert.equal(setA.size(), 1);
assert.equal(setB.size(), 1);

// Verify contains.
assert.equal(setA.contains(objA), true);
assert.equal(setA.contains(objB), false);
assert.equal(setB.contains(objA), false);
assert.equal(setB.contains(objB), true);

// Try adding objA into setA again. Should fail to do so.
assert.equal(setA.add(objA), false);

// Try adding objB into setB again. Should fail to do so.
assert.equal(setB.add(objB), false);

// Add objB to setA.
assert.equal(setA.add(objB), true);
assert.equal(setA.contains(objB), true);

// Verify the __JSSET_ID__ tags again, because I'm paranoid.
assert.equal(objA.__JSSET_ID__, 0);
assert.equal(objB.__JSSET_ID__, 1);

// Verify set sizes.
assert.equal(setA.size(), 2);
assert.equal(setB.size(), 1);

// Verify contains.
assert.equal(setA.contains(objA), true);
assert.equal(setA.contains(objB), true);
assert.equal(setB.contains(objA), false);
assert.equal(setB.contains(objB), true);

// Remove objA from setA.
assert.equal(setA.remove(objA), true);

// Check the __JSSET_ID__ tags.
assert.equal(objA.__JSSET_ID__, 0);
assert.equal(objB.__JSSET_ID__, 1);

// Verify set sizes.
assert.equal(setA.size(), 1);
assert.equal(setB.size(), 1);

// Verify contains.
assert.equal(setA.contains(objA), false);
assert.equal(setA.contains(objB), true);
assert.equal(setB.contains(objA), false);
assert.equal(setB.contains(objB), true);

// Try removing objA from setB. Should fail to do so.
assert.equal(setB.remove(objA), false);

// Check the __JSSET_ID__ tags.
assert.equal(objA.__JSSET_ID__, 0);
assert.equal(objB.__JSSET_ID__, 1);

// Verify set sizes.
assert.equal(setA.size(), 1);
assert.equal(setB.size(), 1);

// Verify contains.
assert.equal(setA.contains(objA), false);
assert.equal(setA.contains(objB), true);
assert.equal(setB.contains(objA), false);
assert.equal(setB.contains(objB), true);

// Also, removing objA from setA again should also fail.
assert.equal(setA.remove(objA), false);

// Time to play with primitives!

// Add the Number 1 to setA.
assert.equal(setA.add(1), true);
assert.equal(setA.size(), 2);
assert.equal(setA.contains(1), true);

// Check if it gets confused with the String 1.
assert.equal(setA.contains('1'), false);

// ... or the boolean true.
assert.equal(setA.contains(true), false);

// Add the String '0' to setA.
assert.equal(setA.add('0'), true);
assert.equal(setA.size(), 3);
assert.equal(setA.contains('0'), true);

// Check if it gets confused with the Number 0.
assert.equal(setA.contains(0), false);

// ... or the boolean false.
assert.equal(setA.contains(false), false);

// Should fail to re-add String '0' and Number 1.
assert.equal(setA.add('0'), false);
assert.equal(setA.add(1), false);

// But succeed in adding Number 0.
assert.equal(setA.add(0), true);
assert.equal(setA.size(), 4);
