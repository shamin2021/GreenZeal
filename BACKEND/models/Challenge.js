const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  EmailAddress: {
    type: String,
  },
  StartDate: {
    type: Date,
  },
  EndDate: {
    type: Date,
  },
  ChallengeType: {
    type: String,
  },
  Challenge: {
    type: String,
  },
  Description: {
    type: String,
  },
  ChallengePhoto: {
    type: String,
  },
  Participants: [],
  Experiences: [
    {
      commenterID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      expPhoto: String,
      descript: String,
      rating: String,
      dateAdded: Date,
      Likes: [],
    },
  ],
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;