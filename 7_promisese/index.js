function delay(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

async function hello() {
  console.log("hello world");
  await delay(2000).then(() => console.log("promise is resolved"));
  console.log("function ends");
}

// hello();

function divide(a, b) {
  return new Promise(function (res, rej) {
    if (b == 0) {
      rej("0 is not divisible");
    } else {
      let ans = a / b;
      res(ans);
    }
  });
}

function divideNum(a, b) {
  console.log("code start");
  divide(a, b)
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
  console.log("code end");
}

divideNum(10, 0);
