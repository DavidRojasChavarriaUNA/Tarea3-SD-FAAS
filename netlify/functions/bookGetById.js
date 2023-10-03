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

    const book =
      await client.db(dbName).collection(collection.Books).findOne({
        _id: id
      });

    if (book) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(book)
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: 'Book not found'
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