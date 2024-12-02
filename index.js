const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());

// app.get('/', (req, res) => {
//   res.send("Hello World");
// });

app.get('/', (req, res) => {
  const dbPath = path.join(__dirname, "db.json");
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "Failed to read data" });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
