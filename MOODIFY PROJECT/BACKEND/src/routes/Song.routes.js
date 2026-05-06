const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const { createSongController, getSongController } = require("../controllers/Song.controller");
const SongRouter = Router();
SongRouter.post("/create", upload.single("song"), createSongController);
SongRouter.get("/", getSongController);
module.exports = SongRouter;
