const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());


app.get("/users", (req, res) => {
  const dbPath = path.join(__dirname, "db.json");

  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Failed to read data" });
    }

    try {
      const users = JSON.parse(data);
      res.send(users);
    } catch (parseError) {
      res.status(500).send({ error: "Failed to parse data" });
    }
  });
});


app.get("/users/:id", (req, res) => {
  const dbPath = path.join(__dirname, "db.json");
  const userId = parseInt(req.params.id, 10);

  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Failed to read data" });
    }

    try {
      const users = JSON.parse(data);
      const user = users.find((u) => u.id === userId);

      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (parseError) {
      res.status(500).send({ error: "Failed to parse data" });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});