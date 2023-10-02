"use strict";

const {
  MongoClient
} = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  clientPromise: client.connect(),
  dbName: "Tarea3",
  collection:{
    Books:"Books",
    Authors: "Authors",
    Publishers: "Publishers"
  }
}