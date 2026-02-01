const mongoose = require("mongoose");
const express = require("express");
const NoteModel = require("./models/note.model");

const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required field",
      });
    }
    const note = await NoteModel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Note not Created",
      error: error.message,
    });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const note = await NoteModel.find();
    if (!note) {
      res.status(404).json({
        message: "Note not Found",
      });
    }
    res.status(200).json({
      message: "Notes fetched successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetching message",
      error: error.message,
    });
  }
});
module.exports = app;

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note id",
      }); // it checks only ki id sahi mil ri h ya  ni
    }

    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required",
      });
    }
    const note = await NoteModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true },
    );
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note replaced successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to replace note",
      error: error.message,
    });
  }
});

app.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note id",
      }); // it checks only ki id sahi mil ri h ya  ni
    }
    if (!description) {
      return res.status(400).json({
        message: "description are required",
      });
    }
    const note = await NoteModel.findByIdAndUpdate(
      id,
      { description },
      { new: true, runValidators: true },
    );
    if (!note) {
      return res.status(404).json({
        message: "Note Not Found",
      });
    }
    res.status(200).json({
      message: "Description replaced successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to replaced description",
      error: error.message,
    });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note id",
      }); // it checks only ki id sahi mil ri h ya  ni
    }
    const note = await NoteModel.findByIdAndDelete(id);

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      note,
    });
  }
});
