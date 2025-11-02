const path = require("path");

console.log("directory path", path.dirname(__filename));

console.log("file name", path.basename(__filename));

console.log("file extension", path.extname(__filename));
