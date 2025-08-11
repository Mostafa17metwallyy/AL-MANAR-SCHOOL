// lib/db.js
const mongoose = require('mongoose');

let cached = global.__mongoose;
if (!cached) cached = (global.__mongoose = { conn: null, promise: null });

async function dbConnect(uri) {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
