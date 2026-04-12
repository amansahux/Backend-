const id3 = require("node-id3");
const songModel = require("../models/Song.model");
const { uploadFile } = require("../services/storage.service");

const createSongController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    if (!req.file.mimetype.startsWith("audio/")) {
      return res.status(400).json({
        message: "Only audio files are allowed",
      });
    }

    const songBuffer = req.file.buffer;
    const mood = "happy";

    if (!mood) {
      return res.status(400).json({
        message: "Mood is required",
      });
    }

    const tags = id3.read(songBuffer);

    // ✅ FIXED
    const title = tags.title || `song_${Date.now()}`;
    // console.log("title-->", title);

    // Upload song
    const uploadSongPromise = uploadFile({
      buffer: songBuffer,
      fileName: `${title}.mp3`, // ✅ FIXED
      folder: "/cohort2/moodify/songs",
    });

    let uploadPosterPromise = null;

    if (tags.image && tags.image.imageBuffer) {
      uploadPosterPromise = uploadFile({
        buffer: tags.image.imageBuffer,
        fileName: `${title}.jpeg`, // ✅ FIXED
        folder: "/cohort2/moodify/poster",
      });
    }

    const uploadSong = await uploadSongPromise;
    const uploadPoster = uploadPosterPromise
      ? await uploadPosterPromise
      : null;

    const Song = await songModel.create({
      url: uploadSong.url,
      posterUrl: uploadPoster ? uploadPoster.url : null,
      title: title,
      mood: mood,
    });

    res.status(201).json({
      message: "Song Uploaded successfully",
      Song,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { createSongController };