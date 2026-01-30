const express = require("express");
const app = express(); //serve instaance created
app.use(express.json()); // it works like  a middleware that allow to read request.body for express
const notes = []; // blank array that contains requset.body

app.post("/notes", (req, res) => {
  notes.push(req.body); // push client's request in notes
  console.log(notes);
  res.send("notes created ");
}); // it allows to communication btw client and server in post method

app.get("/notes", (req, res) => {
  res.send(notes);
}); // see how much notes are created inside the notes array and it access in get method

app.listen(3000, () => {
  console.log("Server is Running at port 3000");
}); // its start the server
 