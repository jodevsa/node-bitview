Node Bit View
===============================

Ever wanted to manipulate bits instead of buffers ?  
this is what the library is about.
m
Installation
-----

`npm install bitview --save`

Initalizing a view
-----
    new BitView(Length)
    new BitView(buffer)

##### Parameters:
    length: length in bits
    buffer: use an existing buffer
Methods
-----    
### .flip(pos)
    flips the value of the bit at location pos 
### .get(pos)
    return the value of the bit at location pos  (0 or 1) 
### .set(pos,v)
    Sets the value of a bit at location pos to v
Usage:

```javascript
const BitView = require("bitview")

const view= new BitView(10);

view.set(0,true);
console.log(view.get(0)); // true
view.flip(0)
console.log(view.get(0)); //false
```
Implementation 
----------------------
BitView uses bitwise operations to manipulate each bit in a buffer (Low Complexity)

