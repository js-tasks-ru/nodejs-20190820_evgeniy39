function sum(a, b) {
  
  let typea = typeof(a);
  let typeb = typeof(b);

  if (typea == "number" && typeb == "number") {
    return a + b;
  } else {
    throw new TypeError;
  }
}

module.exports = sum;
