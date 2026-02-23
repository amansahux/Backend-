const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.routes");
const followRouter = require("./routes/follow.routes");
const cors = require("cors");
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", followRouter);

module.exports = app;
