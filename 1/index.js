console.log("hi");

const calc = require("./calc.js");

// console.log(calc);

// console.log(calc.divide(4, 5));

try {
  const a = calc.divide(4, 2);
  console.log(a);
} catch (error) {
  console.log(error.message);
}
