import fs from "fs";
import path from "path";
import crypto from "crypto";

import.meta.dirname; // The current module's directory name (__dirname)
const __filename = import.meta.filename; // The current module's file name (__filename)

console.log("srcipt start");

//MacroTask
setTimeout(function () {
  console.log("setTimeout 1");
}, 0);

//MacroTask
setTimeout(function () {
  console.log("setTimeout 2");
}, 0);

//MicroTask
const p = new Promise(async (res) => {
  if (res) {
    await setTimeout(() => {}, 0);
    console.log("Resolved");
  } else {
    console.log("Rejected");
  }
});
p.then(() => console.log("Promise 3"));

fs.readFile("./index.js", (err) =>
  err ? err.message : console.log("I/O operation 4"),
);

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// delay(1000).then(() => console.log("delay function 5"));

// Implementing pbkdf2 with all its parameters
// but digest is null
crypto.pbkdf2("secret", "salt", 10000000, 64, "sha512", (err, derivedKey) => {
  if (err) {
    console.log(err);
  } else {
    // Prints derivedKey without encoding
    console.log(derivedKey.toString("base64"));
  }
});

// console.log(__filename);

console.log("script end");
