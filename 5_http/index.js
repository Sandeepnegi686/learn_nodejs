const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("hello");
  } else if (req.url == "/data") {
    res.writeHead(200, { "content-type": "HTML" });
    res.end("<b> Here is all the data </b>");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Page not Found");
  }
});

server.listen(3000);
