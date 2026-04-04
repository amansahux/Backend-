const id3 = require("node-id3");
const uploadFile = require("../services/storage.service");
const songModel = require("../models/Song.model");
const createSongController = async (req, res) => {
  try {
   if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);
    //   console.log(mood)
    //   console.log(tags.title);
    const uploadSong = await uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "/cohort2/moodify/songs",
    });
    const uploadPoster = await uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "/cohort2/moodify/poster",
    });
    const Song = await songModel.create({
      url: uploadSong.url,
      posterUrl: uploadPoster.url,
      title: tags.title,
      mood: mood,
    });
    res.status(201).json({
      message: "Song Uploaded successfully",
      Song,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
  // console.log(songUrl)
};
module.exports = { createSongController };
