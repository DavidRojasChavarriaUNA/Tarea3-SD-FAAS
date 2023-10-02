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
    const data = JSON.parse(event.body);
    console.log(event.body)

    if(client.db(dbName).collection(collection.Authors).find({"_id":id}).limit(1).length === 1){
      return {
        statusCode: 404,
        headers,
        body: 'Author not found'
      };
    }

    await client.db(dbName).collection(collection.Authors).updateOne({
      _id: id
    }, {
      $set: data
    });

    return {
      statusCode: 200,
      headers,
      body: 'OK'
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify(error)
    };
  }
};