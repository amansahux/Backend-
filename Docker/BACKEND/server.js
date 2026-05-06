import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/api/data", (req, res) => {
  const data = {
    message: "This is some data from the server",
  };
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
