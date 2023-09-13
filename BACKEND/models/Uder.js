const mongoose = require("mongoose");

const uderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});
const Uder = mongoose.model("Uder", uderSchema);
module.exports = Uder;
