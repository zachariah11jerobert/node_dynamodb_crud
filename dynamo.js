const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypotter-api";

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const characters = await dynamoClient.scan(params).promise();
  // console.log(characters);
  return characters;
};

const getCharactersById = async (ud) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      ud,
    },
  };

  return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character,
  };

  return await dynamoClient.put(params).promise();
};

const deleteCharacter = async (ud) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      ud,
    },
  };

  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getCharacters,
  getCharactersById,
  addOrUpdateCharacter,
  deleteCharacter,
};
