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
    const data = JSON.parse(event.body);
    data._id = parseInt(data._id)
    console.log(event.body)

    const author =
      await client.db(dbName).collection(collection.Authors).findOne({
        _id: data._id
      });

    if (author) {
      return {
        statusCode: 422,
        headers,
        body: "A record already exists with the indicated id"
      };
    } else {
      await client.db(dbName).collection(collection.Authors).insertOne(data);

      return {
        statusCode: 200,
        headers,
        body: 'OK'
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