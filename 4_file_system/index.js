const path = require("path");
const fs = require("fs");
console.log(
  "------------------------------------------------------------------------------------------------"
);

// const dataFolder = path.join(__dirname, "dataFolder");
const dataFolder = path.join(path.dirname(__filename), "dataFolder");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder is created");
}

const filePath = path.join(dataFolder, "file.txt");

const text = "hello from node js";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, text, "utf8");
  console.log("file created successfully.");
}

const fileData = fs.readFileSync(filePath, "utf8");

// if (fileData) {
//   console.log("file data : ", fileData);
// }

fs.appendFileSync(filePath, "\n new line added");

// const asyncFilePath = path.join(__dirname, "");
const asyncFolderPath = path.join(path.dirname(__filename), "asyncFolder");
console.log(asyncFolderPath);
if (!fs.existsSync(asyncFolderPath)) {
  fs.mkdir(asyncFolderPath, (err) => {
    if (err) {
      throw err;
    }
  });
  console.log("async folder creadted");
}
const asyncFilePath = path.join(asyncFolderPath, "text.txt");
if (!fs.existsSync(asyncFilePath)) {
  fs.writeFile(asyncFilePath, "hello from async code", "utf8", (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  console.log("file added");
}
if (fs.existsSync(asyncFilePath)) {
  fs.appendFile(asyncFilePath, "\n new async data", (err) => {
    if (err) throw err;
    console.log("data added");
  });
}
fs.readFile(asyncFilePath, "utf8", (err, data) => {
  if (err) {
    throw new err();
  }
  console.log("data : ", data);
});
console.log("code end");
