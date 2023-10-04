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
    const data = JSON.parse(event.body);
    console.log(event.body)

    const result = await client.db(dbName).collection(collection.Books).updateOne({
      _id: id
    }, {
      $set: data
    });
    if (result.matchedCount > 0) {
      return {
        statusCode: 200,
        headers,
        body: 'OK'
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
      statusCode: 422,
      headers,
      body: JSON.stringify(error)
    };
  }
};