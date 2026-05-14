import app from "./src/app.js"
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/api/data", (req, res) => {
  res.status(200).json({
    data: [
      {
        ID: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        ID: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      {
        ID: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        ID: 4,
        name: "Bob Brown",
        email: "bob.brown@example.com",
      }
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
