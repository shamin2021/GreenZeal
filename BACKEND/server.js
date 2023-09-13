const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true
  
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});


const EventsRoutes = require("./routes/Events.js");
app.use("/Events", EventsRoutes);

const UsersRoutes = require("./routes/Users.js");
app.use("/Users", UsersRoutes);

const ChallengesRoutes = require("./routes/Challenges.js");
app.use("/Challenges", ChallengesRoutes);

const BlogsRoutes = require("./routes/Blogs.js");
app.use("/Blogs", BlogsRoutes);

const UdersRoutes = require("./routes/Uders.js");
app.use("/Uders", UdersRoutes);


app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});