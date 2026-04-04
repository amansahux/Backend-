const express = require("express");
const AuthRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
