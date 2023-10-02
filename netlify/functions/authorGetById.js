"use strict"

const {
  clientPromise,
  dbName,
  collection
} = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK"
    };
  }

  try {
    const client = await clientPromise;
    const id = parseInt(event.path.split("/").reverse()[0]);

    const authors =
      await client.db(dbName).collection(collection.Authors).find({
        _id: id
      }).toArray();

    const author = (authors.length > 0) ? authors[0] : null;
    if (author) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(author)
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: 'Author not found'
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(error)
    };
  }
};