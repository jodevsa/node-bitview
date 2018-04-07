const BYTE_SIZE = 8;

const handleElement = (element) => {
  if (element === '0') {
    return 0;
  }
  return Boolean(element)
    ? 1
    : 0;
}
const fromArray = (arr) => {
  const view = new BitView(arr.length)
  for (let i = 0; i < arr.length; i++) {
    const value = handleElement(arr[i]);
    view.set(i, value);
  };
  return view;
}
class BitView {
  constructor(arg, offset = 0) {
    if (typeof(arg) === 'number') {
      this.size = Math.ceil(arg / BYTE_SIZE);
      this._arrayBuffer=new ArrayBuffer(this.size);
    } else if (Buffer.isBuffer(arg)) {
      this._arrayBuffer= arg.buffer;
      this.size = arg.length;
    } else {
      throw new Error("BitView only accepts an integer or buffer.")
    }
    this.view = new DataView(this._arrayBuffer);
    this.length = this.size * BYTE_SIZE;
    this.offset = offset;
  }
  static from(arg, offset = 0) {
    if (typeof(arg) === 'number' || Buffer.isBuffer(arg)) {
      return (new BitView(arg, offset));
    } else if (typeof(arg) === 'string' || Array.isArray(arg)) {
      return fromArray(arg);
    }
    throw new Error("BitView only accepts an integer, buffer or an array.");

  }

  buffer() {
    return this._arrayBuffer;
  }
  toBuffer() {
    return this.buffer();
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
    return (this.view.getUint8(n >>> 3) >>> (BYTE_SIZE - 1 - (n % BYTE_SIZE))) % 2
  }
  flip(n) {
    if (n > (this.size * BYTE_SIZE - 1)) {
      throw new Error("Index out of range.")
    }
    const position = n >>> 3;
    const original = this.view.getUint8(position);
    const oldValue = (original >> (BYTE_SIZE - 1 - (n % BYTE_SIZE))) % 2;
    if (oldValue) {
      this.view.setUint8(position, (original ^ 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));
    } else {
      this.view.setUint8(position, (original | 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));

    }
  }
  toggle(n) {
    return flip(n);
  }
  set(n, value) {
    if (n > (this.size * BYTE_SIZE - 1)) {
      throw new Error("Index out of range.")
    }
    const position = n >>> 3;
    const original = this.view.getUint8(position);
    const oldValue = (original >> (BYTE_SIZE - 1 - (n % BYTE_SIZE))) % 2;
    if (value) {
      this.view.setUint8(position,(original | 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));

    } else if (oldValue) {
      this.view.setUint8(position, (original ^ 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));
    }
  }

}

module.exports = BitView;
