const express = require("express");
const noteModel = require("./models/note.module");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())


app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "title and description required",
      });
    }
    const note = await noteModel.create({
      title,
      description,
    });
    if (!note) {
      return res.status(404).json({
        message: "note not Found",
      });
    }
    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const note = await noteModel.find();
    if (!note) {
      return res.status(404).json({
        message: "Note not Found",
      });
    }
    res.status(200).json({
      message: "Note Fetched successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetched note",
    });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not Found",
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({
        message: "description is required",
      });
    }

    const note = await noteModel.findByIdAndUpdate(
      id,
      { description },
      { new: true, runValidators: true },
    );
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note ubdated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to ubdate Note",
      error: error.message,
    });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required",
      });
    }
    const note = await noteModel.findByIdAndUpdate(id, { title, description });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note ubdated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to replace note",
      error: error.message,
    });
  }
});
module.exports = app;
