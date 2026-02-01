const express = require("express");
const noteModel = require("./models/note.model");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/* =======================
   CREATE NOTE (POST)
======================= */
app.post("/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.send(400).json({
        message: "title and description are required",
      });
    }
    const note = await noteModel.create({ title, description });
    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});
/* =======================
   GET ALL NOTES (GET)
======================= */
app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

/* =======================
   REPLACE NOTE (PUT)
======================= */

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
    const note = await noteModel.findByIdAndUpdate(
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
      message: "Note Replaced Successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to replaced note",
      error: error.message,
    });
  }
});

/* =======================
   UPDATE DESCRIPTION ONLY (PATCH)
======================= */
app.patch("/notes/:id", async (req, res) => {
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
      message: "Description updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update description",
      error: error.message,
    });
  }
});

/* =======================
   DELETE NOTE (DELETE)
======================= */
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await noteModel.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(204).send(); // no body for delete
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

module.exports = app;
