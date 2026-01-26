const express = require("express");

const app = express(); // instance created
app.use(express.json()); // use the middleware

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  console.log(req.body);
  res.send("notes created");
}); // push the noted data in notes array and send response notes created

app.get("/notes", (req, res) => {
  res.send(notes);
}); // it sends the whole cotent of notes in client side

// Delete Notes
// params  = user ko jo notes delete krna h wo uska index notes/index yha bhejega is method ko params kehte h
// params tab use krte h jab user se signal value input me leni ho like index fo deleting and i i want thoda bada data lena ho then req.body ka use krte h

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("Notes deleted successfully");
});

// for undating description of particular note
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("Description ubdated successfully")
});
module.exports = app;
