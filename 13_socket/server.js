const http = require("http");
const socket = require("socket.io");
const express = require("express");
const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new socket.Server(server);

const users = new Set();
let count = 0;

io.on("connection", function (socket) {
  //when user add
  socket.on("addUser", function (username) {
    if (!username) return;
    count++;
    socket.username = username;
    users.add(username);
    io.emit("userJoin", username);
    io.emit("userCount", count);
  });

  socket.on("messageToServer", function ({ username, message }) {
    //send message to client
    io.emit("messageToclients", { username, message });
  });

  //disconnect user
  socket.on("disconnect", function () {
    if (!socket.username) return;
    count--;
    users.delete(socket.username);
    io.emit("userLeft", socket.username);
    io.emit("userCount", count);
  });
});

server.listen(3000, () => console.log("server started"));
