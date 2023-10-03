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
    const data = JSON.parse(event.body);
    data._id = parseInt(data._id)
    console.log(event.body)

    const book =
      await client.db(dbName).collection(collection.Books).findOne({
        _id: data._id
      });

    if (book) {
      return {
        statusCode: 200,
        headers,
        body: "A record already exists with the indicated id"
      };
    }

    /*await client.db(dbName).collection(collection.Books).insertOne(data);

    return {
      statusCode: 200,
      headers,
      body: 'OK'
    };*/
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify(error)
    };
  }
};