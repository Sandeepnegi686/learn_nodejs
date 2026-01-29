const path = require("path");

console.log("directory path", path.dirname(__filename));

console.log("file name", path.basename(__filename));

console.log("file extension", path.extname(__filename));

console.log("join path ", path.join(path.dirname(__filename), "util", "apps"));
// console.log(__filename);

// FOR ES6+
import.meta.dirname; // The current module's directory name (__dirname)
const __filename = import.meta.filename; // The current module's file name (__filename)
