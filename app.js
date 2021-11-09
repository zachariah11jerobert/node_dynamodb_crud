const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello World");
});

app.get("/characters", async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port  ${port}`);
});
