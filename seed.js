const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");

const seedData = async () => {
  const url = "http://hp-api.herokuapp.com/api/characters";
  try {
    const { data: characters } = await axios.get(url);
    const characterPromises = characters.map((character, i) =>
      addOrUpdateCharacter({ ...character, ud: i + "" })
    );
    await Promise.all(characterPromises);
  } catch (error) {
    console.error(error);
    console.log("AHHHHHH");
  }
};

seedData();
