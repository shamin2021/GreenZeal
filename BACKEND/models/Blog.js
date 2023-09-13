const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  EmailAddress: {
    type: String,
  },
  DatePublish: {
    type: Date,
  },
  BlogTitle: {
    type: String,
  },
  Description: {
    type: String,
  },
  BlogPhoto: {
    type: String,
  },
  Labels: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;