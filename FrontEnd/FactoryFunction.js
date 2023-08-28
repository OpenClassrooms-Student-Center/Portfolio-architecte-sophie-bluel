function createAObject(a, b, c, d) {
  function d() {
    console.log("ma fonction d");
  }
  return {
    a,
    b,
    c,
    d,
  };
}
const myObject = createAObject(1, 2, 3, 4);
console.log(myObject);
myObject.d();
