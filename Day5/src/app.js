const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  //   res.send("note added successfully"); // it is not right way
  res.status(201).json({
    message: "Notes Created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    note: notes,
  });
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  //   res.send("note deleted successfully");
  res.status(204).json({
    message: "note deleted successfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;

  if (!notes[index]) {
    res.status(404).json({
      message: "Note Not Found",
    });
    notes[index].description = req.body.description;
  }
  //   res.send("description ubdated successfully");
  res.status(200).json({
    message: "description ubdated successfully",
  });
});

app.put("/notes/:index", (req, res) => {
  const index = req.params.index;

  if (!notes[index]) {
    res.status(404).json({
      message: "Note Not Found",
    });
  }

  notes[index] = {
    title: req.body.title,
    description: req.body.description,
  };

  res.status(200).json({
    message: "Note replaced successfully",
    note: notes[index],
  });
});

module.exports = app;
