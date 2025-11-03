const fs = require("fs");

fs.readFile("text.txt", "utf-8", (e, d) => {
  if (e) console.log(e.message);
  console.log(d);

  fs.writeFile("async.txt", "it has async code", "utf-8", (e) => {
    if (e) console.log(e.message);
    console.log("file created");
  });
  fs.console.log("code end");
});
