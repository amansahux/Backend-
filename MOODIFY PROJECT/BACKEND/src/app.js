const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Auth.routes");
const cors = require("cors");
const SongRouter = require("./routes/Song.routes");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/songs", SongRouter);

module.exports = app;
