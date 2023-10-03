const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const authRoute = require("./routes/auth");
const shopItemsRoute = require("./routes/shopItems");

const connect = mongoose.connect(process.env.mongoDB_URL);

connect.then(() => {
  console.log("Connected sucessfully to my database");
}).catch((error) => {
  console.log("Could not connect to the database, reason =", error);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/v1/shop-items', shopItemsRoute);
app.use('/v1/auth', authRoute);

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});