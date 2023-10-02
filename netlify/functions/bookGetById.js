"use strict"

const {clientPromise, dbName, collection} = require('./mongoDB');
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

    const books =
      await client.db(dbName).collection(collection.Books).find({
        _id: id
      }).toArray();

    const book = (books.length > 0)? books[0] : null;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(book)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(error)
    };
  }
};