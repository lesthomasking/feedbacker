const mongoose = require("mongoose");
//destructuring mongoose.Schema
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
});

//first argument is name of the collection
//second argument is name of the schema
mongoose.model("users", userSchema);
