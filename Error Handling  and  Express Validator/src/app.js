import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import ErrorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", AuthRouter);
// middlewares
app.use(ErrorHandler);
export default app;
