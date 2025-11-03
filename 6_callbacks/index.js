const fs = require("fs");

function hello(name, cllbk) {
  console.log("hello ", name);
  cllbk();
}

function namaste() {
  console.log("namaste");
}

//Async task
fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  }
  console.log(data);
});

hello("rahul", namaste);
