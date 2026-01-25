const express = require("express");
const app = express(); // server instance created
app.listen(3000); // Server Starts

app.get("/", (req, res) => {
  res.send("Hello Duniya");
});

app.get("/about", (req, res) => {
  res.send("Hello World from About Page");
});

app.get("/contact" , (req, res) => {
  res.send('hello Duniya from Contact page')
}
)