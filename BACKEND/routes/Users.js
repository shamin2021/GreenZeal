const router = require("express").Router();
const { response } = require("express");
const { find, findByIdAndDelete } = require("../models/User");
let user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express.Router();

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const users = await user
  .find({userId : userId})
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.route("/add").post((req, res) => {
  const userID = req.body.rating;
  const userName = req.body.descript;
  const userPhoto = req.body.expPhoto;

  const newChallenge = new user({
    userID,
    userName,
    userPhoto,
  });
  newChallenge
    .save()
    .then(() => {
      res.json(newChallenge._id);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: "Email already exists" });
    // }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Failed to register user", error);
    return res.status(500).json({ message: "Failed to register user" });
  }
});



module.exports = router;