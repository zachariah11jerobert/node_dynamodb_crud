const express = require("express");
const bodyParser = require("body-parser");
const {
  getCharacters,
  getCharactersById,
  addOrUpdateCharacter,
  deleteCharacter,
} = require("./dynamo");
const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello World");
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/characters/:ud", async (req, res) => {
  const ud = req.params.ud;
  try {
    const characters = await getCharactersById(ud);
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;
  // console.log(character);
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.json(newCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.put("/characters/:ud", async (req, res) => {
  const character = req.body;
  const { ud } = req.params;
  character.ud = ud;
  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.delete("/characters/:ud", async (req, res) => {
  const  ud  = req.params.ud;
  // console.log(ud);
  try {
    res.json(await deleteCharacter(ud));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port  ${port}`);
});
