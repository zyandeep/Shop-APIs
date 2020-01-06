const mongoose = require("mongoose");

async function db() {

  const DB_URI = `mongodb+srv://zyandeep:${process.env.DB_PASSWORD}@test-cluster-xxn7o.mongodb.net/test?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(DB_URI,
      {
        useNewUrlParser: true,
        dbName: "myTestDB",
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    console.log("[mongoDB: ] DB connected!");
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = db;
