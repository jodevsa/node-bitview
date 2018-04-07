const BitView = require('../src/');
const buffer = require('buffer');

it('it should accept a length as an input', () => {
  const bitviewer = new BitView(128);
  expect(bitviewer.length).toBe(128);
});

it('it should accept a buffer as an input', () => {
  const buffer = new Buffer(32);
  const bitviewer = new BitView(buffer);
  expect(bitviewer.length).toBe(32 * 8);
});

it('bit value should be changed when flip is invoked.', () => {
  const bitviewer = new BitView(1024);
  for (let i = 0; i < 1024; i += 2) {
    bitviewer.flip(i);
  }
  for (let i = 0; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(1);
    expect(bitviewer.flip(i));
  }

  for (let i = 0; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(0);
  }

  for (let i = 1; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('bit value should be changed when set is invoked.', () => {
  const bitviewer = new BitView(1024);
  for (let i = 0; i < 1024; i += 2) {
    bitviewer.set(i, 1);
  }
  for (let i = 0; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(1);
  }
  for (let i = 0; i < 1024; i += 2) {
    bitviewer.set(i, 0);
  }
  for (let i = 0; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(0);
  }
  for (let i = 1; i < 1024; i += 2) {
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('.from should accept an array of bits', () => {
  const bits = [
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1
  ];
  const view = BitView.from(bits);
  for (let i = 0; i < bits.length; i++) {
    expect(view.get(i)).toBe(bits[i]);
  }
});

it('.from should accept an array of bits', () => {
  const str = "1111011110111";
  const view = BitView.from(str);
  for (let i = 0; i < str.length; i++) {
    expect(view.get(i)).toBe(Number(str[i]));
  }
});

it('.toString() should return a string representation of the BitView', () => {
  const str = "0001110100100100";
  const view = BitView.from(str);
  for (let i = 0; i < str.length; i++) {
    expect(view.get(i)).toBe(Number(str[i]));
  }
  expect(view.toString()).toBe(str);
});

it('should accept byteOffset and length parameters', () => {
  let buffer = new ArrayBuffer(1024);
  let view = new BitView(buffer, 1000, 20);
  expect(view.length).toBe(20 * 8);

  buffer = new ArrayBuffer(512);
  view = new BitView(buffer, 2);
  expect(view.length).toBe(2 * 8);

  buffer = new ArrayBuffer(2048);
  view = new BitView(buffer, 0, 62);
  expect(view.length).toBe(62 * 8);
});
