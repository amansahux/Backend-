import app from "./src/app.js";
import express from "express";

const PORT = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello from the backend!",
  };
  res.json(data);
});

app.get("*name", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
