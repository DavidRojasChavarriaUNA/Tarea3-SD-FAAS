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

    const books = await client.db(dbName).collection(collection.Books).find({}).toArray();
    if (books.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(books)
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: 'Books not found'
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