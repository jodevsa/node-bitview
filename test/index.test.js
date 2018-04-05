const BitView = require('../src/');


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
  const bitviewer = new BitView(128);
  for(let i=0;i<128;i+=2){
    bitviewer.flip(i);
  }
  for(let i=0;i<128;i+=2){
    expect(bitviewer.get(i)).toBe(1);
    expect(bitviewer.flip(i));
  }
  /*
  for(let i=0;i<128;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
  */
  for(let i=1;i<128;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
});

it('bit value should be changed when set is invoked.', () => {
  const bitviewer = new BitView(128);
  for(let i=0;i<128;i+=2){
    bitviewer.set(i,1);
  }
  for(let i=0;i<128;i+=2){
    expect(bitviewer.get(i)).toBe(1);
  }
  for(let i=1;i<128;i+=2){
    expect(bitviewer.get(i)).toBe(0);
  }
});
