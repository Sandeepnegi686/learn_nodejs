console.log("hi from wrapper explorer");

console.log("file name of explorer: ", __filename);
console.log("dir adress of explorer: ", __dirname);

module.exports.hello = function (name) {
  console.log("hello ", name);
};
module.exports.greet = function (name) {
  console.log("hello ", name);
};
