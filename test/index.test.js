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
  for(let i=0;i<1024;i+=2){
    bitviewer.flip(i);
  }
  for(let i=0;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(1);
    expect(bitviewer.flip(i));
  }

  for(let i=0;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }

  for(let i=1;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('bit value should be changed when set is invoked.', () => {
  const bitviewer = new BitView(1024);
  for(let i=0;i<1024;i+=2){
    bitviewer.set(i,1);
  }
  for(let i=0;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(1);
  }
  for(let i=0;i<1024;i+=2){
    bitviewer.set(i,0);
  }
  for(let i=0;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
  for(let i=1;i<1024;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('it should work with large buffers.', () => {
  const bitviewer = new BitView(buffer.kMaxLength*8);
  const start=buffer.kMaxLength*8- 20000
  for(let i=start;i<start+20000;i+=2){
    bitviewer.set(i,1);
  }
  for(let i=start;i<start+20000;i+=2){
    expect(bitviewer.get(i)).toBe(1);
  }
  for(let i=start;i<start+20000;i+=2){
    bitviewer.set(i,0);
  }
  for(let i=start;i<start+20000;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
  for(let i=start+1;i<start+20000;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('.from should accept an array of bits', () => {
  const bits=[1,0,1,0,1,0,1,0,1,0,0,1];
  const view= BitView.from(bits);
  for(let i=0;i<bits.length;i++){
    expect(view.get(i)).toBe(bits[i]);
  }
});

it('.from should accept an array of bits', () => {
  const str="1111011110111";
  const view= BitView.from(str);
  for(let i=0;i<str.length;i++){
    expect(view.get(i)).toBe(Number(str[i]));
  }
});

it('.toString() should return a string representation of the BitView', () => {
  const str="0001110100100100";
  const view= BitView.from(str);
  for(let i=0;i<str.length;i++){
    expect(view.get(i)).toBe(Number(str[i]));
  }
  expect(view.toString()).toBe(str);
});
