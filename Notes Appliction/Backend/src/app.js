const express = require("express");
const cardModel = require("./models/card.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// patch
app.post("/api/card", async (req, res) => {
  try {
    const { profilePic, name, bio } = req.body;
    const oldPic = await cardModel.findOne({ profilePic });
    if (oldPic) {
      return res.status(400).json({
        message: "User with this Profile pic already exist",
      });
    }
    if (!profilePic || !name || !bio) {
      return res.status(400).json({
        message: "Profilepic , name and bio are required",
      });
    }
    const card = await cardModel.create({
      profilePic,
      name,
      bio,
    });
    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }
    res.status(201).json({
      message: "Card created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create card...",
      error: error.message,
    });
  }
});

// get
app.get("/api/card", async (req, res) => {
  try {
    const cards = await cardModel.find();
    if (!cards) {
      return res.status(404).json({
        message: "Card not found",
      });
    }
    res.status(200).json({
      message: "Cards Fetched successfully",
      cards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cards",
    });
  }
});

// delete
app.delete("/api/card/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await cardModel.findByIdAndDelete(id);
    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }
    res.status(200).json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete card",
      error: error.message,
    });
  }
});

app.use("*name", (req, res) => {
  res.sendFile(path.koin(__dirname, "..", "/public/index.html"));
});
module.exports = app;
