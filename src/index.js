const BYTE_SIZE = 8;

class BitView {
  constructor(arg) {
    if (typeof(arg) === 'number') {
      const size = arg;
      this.size = Math.ceil(size / BYTE_SIZE);
      this.array = new Buffer(this.size);
      this.length = this.size * 8;
    } else if (Buffer.isBuffer(arg)) {
      const buffer = arg;
      this.array = buffer;
      this.size = buffer.length;
      this.length = this.size * 8;
    } else {
      throw new Error("BitView only accepts an integer or buffer.")
    }

  }
  buffer() {
    return this.array;
  }
  toBuffer() {
    return buffer();
  }
  toString() {
    let str = '';
    for (let i = 0; i < this.size * BYTE_SIZE; i++) {
      str += String(this.get(i));
    }
    return str;

  }
  get(n) {
    if (n > (this.size * BYTE_SIZE - 1)) {
      throw new Error("Index out of range.")
    }
    return (this.array[n >> 3] >>> (BYTE_SIZE - 1 - (n % BYTE_SIZE))) % 2
  }
  flip(n) {
    if (n > (this.size * BYTE_SIZE - 1)) {
      throw new Error("Index out of range.")
    }
    const original = this.array[n >> 3];
    const oldValue = (original >>> (BYTE_SIZE - 1 - (n % BYTE_SIZE))) % 2;
    const bool = Boolean(oldValue) ? 0 : 1;
    if (bool) {
      this.array[n >> 3] = (original | bool << (BYTE_SIZE - 1 - (n % BYTE_SIZE)));
    }
  }
  toggle(n) {
    return flip(n);
  }
  set(n, value) {
    if (n > (this.size * BYTE_SIZE - 1)) {
      throw new Error("Index out of range.")
    }
    const original = this.array[n >> 3];
    const bool = Boolean(value) ? 1 : 0;
    this.array[n >> 3] = (original | bool << (BYTE_SIZE - 1 - (n % BYTE_SIZE)));
  }

}


module.exports = BitView;
