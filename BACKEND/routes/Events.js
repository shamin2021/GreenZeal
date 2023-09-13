const router = require("express").Router();
const { response } = require("express");
const { find, findByIdAndDelete } = require("../models/Event");
let event = require("../models/Event");

router.route("/add").post((req, res) => {
  const UserID = req.body.UserID;
  const EmailAddress = req.body.EmailAddress;
  const DateEvent = req.body.DateEvent;
  const EventType = req.body.EventType;
  const Description = req.body.Description;
  const ExpectedParticipants = req.body.ExpectedParticipants;
  const RequiredItems = req.body.RequiredItems;
  const Notes= req.body.Notes;
  const EventPhoto= req.body.EventPhoto;
  const NumberParticipants= 0;

  const newEvent= new event({
    UserID,
    EmailAddress,
    DateEvent,
    EventType,
    Description,
    ExpectedParticipants,
    RequiredItems,
    Notes,
    EventPhoto,
    NumberParticipants,
  });
  newEvent
    .save()
    .then(() => {
      res.json("Paper Submitted for Reviewing");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getEvents").get((req, res) => {
  event
    .find( { DateEvent: { $gte :  new Date() }})
    .populate('UserID')
    .sort({DateEvent:1})
    .limit(4)
    .then((Events) => {
      res.json(Events);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getEventsUp").get((req, res) => {
  event
    .find({ DateEvent: { $gte: new Date() } })
    .populate("UserID")
    .sort({ DateEvent: 1 })
    .then((Events) => {
      res.json(Events);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/getEventsPrev").get((req, res) => {
  event
    .find({ DateEvent: { $lte: new Date() } })
    .populate("UserID")
    .sort({ DateEvent: 1 })
    .then((Events) => {
      res.json(Events);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getEventsAll").get((req, res) => {
  event
    .find()
    .populate("UserID")
    .sort({ DateEvent: 1 })
    .then((Events) => {
      res.json(Events);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getEvent/:id").get(async (req, res) => {
  let eventId = req.params.id;
  const events = await event
    .findById(eventId)
    .populate({
      path: "Experiences",
      populate: {
        path: "commenterID",
      }
    })
    .then((value) => {
      res.status(200).send(value);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get User", error: err.message });
    });
});

router.route("/getEventsUser/:id").get(async (req, res) => {
  let userId = req.params.id;
  const events = await event
    .find({ UserID : userId })
    .then((value) => {
      res.status(200).send(value);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get events", error: err.message });
    });
});

router.route("/addParticipants").put(async (req, res) => {
  let userId = req.body.UserID;
  let eventId = req.body.id;

  try {
    let res = await event.findOneAndUpdate(
      { _id: eventId },
      { $push: { Participants: userId } },
    );
    
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Participation Confirmed" });
});

router.route("/update/:id").put(async (req, res) => {
  let eventId = req.params.id;
  const {
    UserID,
    EmailAddress,
    DateEvent,
    EventType,
    Description,
    ExpectedParticipants,
    RequiredItems,
    Notes,
    EventPhoto,
    Experiences,
    Participants,
  } = req.body;
  const reqBody = req.body;
  event
    .findByIdAndUpdate(eventId, reqBody)
    .then(() => {
      res.status(200).send({ status: "Event updated" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "error with updating data", error: err.message });
    });
});

router.route("/removeParticipants").put(async (req, res) => {
  let userId = req.body.UserID;
  let eventId = req.body.id;

  try {
    let res = await event.findOneAndUpdate(
      { _id: eventId },
      { $pull: { Participants: userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Participation Confirmed" });
});

router.route("/addComment").put(async (req, res) => {
  let userId = req.body.UserID;
  let eventId = req.body.id;
  let rate = req.body.rating;
  let Description = req.body.Description;

  try {
    let res = await event.findOneAndUpdate(
      { _id: eventId },
      {
        $push: {
          Experiences: {
            commenterID: userId,
            descript: Description,
            rating: rate,
            dateAdded: new Date(),
          },
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Participation Confirmed" });
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;
  await event.findByIdAndDelete(id).exec();
  res.send("Deleted");
});

module.exports = router;