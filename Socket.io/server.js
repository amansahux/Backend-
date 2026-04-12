import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg)
  });
  // console.log(socket)
});

httpServer.listen(3000, () => {
  console.log("Server started at port 3000");
});
