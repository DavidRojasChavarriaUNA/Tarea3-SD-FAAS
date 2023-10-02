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

    const authors =
      await client.db(dbName).collection(collection.Authors).find({
        _id: id
      }).toArray();

    const author = (authors.length > 0)? authors[0] : null;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(author)
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