const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  EmailAddress: {
    type: String,
  },
  DateEvent: {
    type: Date,
  },
  EventType: {
    type: String,
  },
  Description: {
    type: String,
  },
  ExpectedParticipants: {
    type: Number,
  },
  RequiredItems: {
    type: String,
  },
  Notes: {
    type: String,
  },
  EventPhoto: {
    type: String,
  },
  Participants: [],
  Experiences: [
    {
      commenterID: {
        type: Schema.Types.ObjectId,
        ref: "User",},
      descript: String,
      rating: Number,
      dateAdded : Date,
    },
  ],
});

const Event = mongoose.model("Event",EventSchema);

module.exports =  Event;