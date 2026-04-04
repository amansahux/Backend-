const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const { createSongController } = require("../controllers/Song.controller");
const SongRouter = Router();
SongRouter.post("/create", upload.single("song"), createSongController);
module.exports = SongRouter;
