import mongoose from "mongoose";
import express from "express";
import studentRoutes from "./requests.js";
// create database connection
const DBCONNECT = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abarker:TFYteNQieJWQMgJj@cluster0.6ucasko.mongodb.net/?retryWrites=true&w=majority",
      { autoIndex: true }
    );
    console.log("db connected Succesfully");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// implementation
const app = express();
const PORT = 5000;
//use express json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/v1", studentRoutes);

//connect db and listen on port
app.listen(5000, async () => {
  try {
    await DBCONNECT();
    console.log("server listening on Port 5000");
  } catch (err) {
    console.log(err);
  }
});
