import app from "./src/app.js";
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data from the server.' });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
