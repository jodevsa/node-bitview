Node BitView
===============================

NodeJS Buffer interface provides a way to manipulate bytes, but what if we needed to manipulate bits?

This library was created to address the gap of a built-in bit interface.

[![NPM][NPM img]][NPM Status]
[![Node][Node img]][NPM Status]
[![Travis][Travis img]][Travis Status]
[![AppVeyor][AppVeyor img]][AppVeyor Status]
[![bitHound][bitHound img]][bitHound Status]
[![License][License img]][License Link]

Installation
-----

`npm install bitview --save`

Initializing a view
-----
    new BitView(Length)
    new BitView(buffer)
    Buffer.from(arg)

##### Parameters:
    length: length in bits
    buffer: use an existing buffer
    arg: Another interface to create a new BitView instance
    arg could be an array of bits [1,0,1] or a string '1010' or a buffer.

Methods
-----    
### .flip(pos)
    flips the value of the bit at location pos
### .get(pos)
    Returns the value of the bit at location pos  (0 or 1)
### .set(pos,v)
    Sets the value of a bit at location pos to v
### .toString()
      Returns a string representation of the BitView.
### .toBuffer()
    Returns the buffer used by the view.
Properties
-----
### .length
    Returns length in bits.

Usage:

```javascript
const BitView = require("bitview")

const view= new BitView(10);

view.set(0,true);
console.log(view.get(0)); // true
view.flip(0)
console.log(view.get(0)); // false

const view2=BitView.from('101010');
console.log(view2.get(2)); // true

const view3=BitView.from([1, 0, 1]);
console.log(view3.get(1)); // false
console.log(view3.get(2)); // true
```
Implementation
----------------------
BitView uses bitwise operations to manipulate each bit in a buffer (Low Complexity)
