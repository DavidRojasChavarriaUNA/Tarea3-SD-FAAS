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

    const authors = await client.db(dbName).collection(collection.Authors).find({}).toArray();

    if (authors.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(authors)
      };
    }else {
      return {
        statusCode: 404,
        headers,
        body: 'Authors not found'
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