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

    const publisher =
      await client.db(dbName).collection(collection.Publishers).findOne({
        _id: id
      });

    if (publisher) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(publisher)
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: 'Publisher not found'
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