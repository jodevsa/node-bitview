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
const calculateSize = (bufferSize, byteOffset, length) => {
  if (length === 0 && byteOffset === 0) {
    return bufferSize;
  } else if (length == 0) {
    return byteOffset;
  } else {
    return length;
  }
};

class BitView {
  constructor(arg, byteOffset = 0, length = 0) {
    if (typeof(arg) === 'number') {
      this.size = Math.ceil(arg / BYTE_SIZE);
      this._arrayBuffer = new ArrayBuffer(this.size);
      this.view = new DataView(this._arrayBuffer);
    } else if (Buffer.isBuffer(arg)) {
      this._arrayBuffer = arg.buffer;
      this.size = calculateSize(arg.length, byteOffset, length);
      if (length === 0) {
        this.view = new DataView(this._arrayBuffer, byteOffset);
      } else {
        this.view = new DataView(this._arrayBuffer, byteOffset, length);
      }
    } else if (arg instanceof ArrayBuffer) {
      this._arrayBuffer = arg;
      this.size = calculateSize(arg.byteLength, byteOffset, length);
      if (length === 0) {
        this.view = new DataView(this._arrayBuffer, byteOffset);
      } else {
        this.view = new DataView(this._arrayBuffer, byteOffset, length);
      }
    } else {
      throw new Error("BitView only accepts an integer or buffer.")
    }

    this.length = this.size * BYTE_SIZE;
    this.byteOffset = byteOffset;
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
      this.view.setUint8(position, (original | 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));

    } else if (oldValue) {
      this.view.setUint8(position, (original ^ 1 << (BYTE_SIZE - 1 - (n % BYTE_SIZE))));
    }
  }

}

module.exports = BitView;
