const router = require("express").Router();
const { response } = require("express");
const { find, findByIdAndDelete } = require("../models/Challenge");
let challenge = require("../models/Challenge");

router.route("/add").post((req, res) => {
  const UserID = req.body.UserID;
  const EmailAddress = req.body.EmailAddress;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const ChallengeType = req.body.ChallengeType;
  const Description = req.body.Description;
  const ChallengePhoto = req.body.ChallengePhoto;
  const Challenge= req.body.Challenge;

  const newChallenge = new challenge({
    UserID,
    EmailAddress,
    StartDate,
    EndDate,
    ChallengeType,
    Description,
    ChallengePhoto,
    Challenge,
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

router.route("/getChallenges").get((req, res) => {
  challenge
    .find({ EndDate: { $gte: new Date() } })
    .populate("UserID")
    .sort({ EndDate: 1 })
    .limit(4)
    .then((Challenges) => {
      res.json(Challenges);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getChallengesUp").get((req, res) => {
  challenge
    .find({ EndDate: { $gte: new Date() } })
    .populate("UserID")
    .sort({ EndDate: 1 })
    .then((Challenges) => {
      res.json(Challenges);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/getChallengesPrev").get((req, res) => {
  challenge
    .find({ EndDate: { $lte: new Date() } })
    .populate("UserID")
    .sort({ EndDate: 1 })
    .then((Challenges) => {
      res.json(Challenges);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getChallengessAll").get((req, res) => {
  challenge
    .find()
    .populate("UserID")
    .sort({ EndDate: 1 })
    .then((Challenges) => {
      res.json(Challenges);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getChallenge/:id").get(async (req, res) => {
  let challengeId = req.params.id;
  const challenges = await challenge
    .findById(challengeId)
    .populate({
      path: "Experiences",
      populate: {
        path: "commenterID",
      },
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

router.route("/addParticipants").put(async (req, res) => {
  let userId = req.body.UserID;
  let challengeId = req.body.id;

  try {
    let res = await challenge.findOneAndUpdate(
      { _id: challengeId },
      { $push: { Participants: userId } }
    );
    
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Participation Confirmed" });
});

router.route("/removeParticipants").put(async (req, res) => {
  let userId = req.body.UserID;
  let challengeId = req.body.id;

  try {
    let res = await challenge.findOneAndUpdate(
      { _id: challengeId },
      { $pull: { Participants: userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Participation Confirmed" });
});

router.route("/addAttempt").put(async (req, res) => {
  let userId = req.body.UserID;
  let challengeId = req.body.id;
  let experiencePhoto = req.body.expPhoto;
  let description = req.body.descript;
  let exprating = req.body.rating;

  try {
    let res = await challenge.findOneAndUpdate(
      { _id: challengeId },
      {
        $push: {
          Experiences: {
            commenterID: userId,
            descript: description,
            expPhoto: experiencePhoto,
            dateAdded: new Date(),
            rating: exprating,
          },
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Challenge Attempt Added" });
});

router.route("/addLikes").put(async (req, res) => {
  let userId = req.body.UserID;
  let challengeId = req.body.id;
  let expId = req.body.expID;

  try {
    let res = await challenge.findOneAndUpdate(
      { 'Experiences._id': expId },
      { $push: { "Experiences.$.Likes": userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Liked Confirmed" });
});

router.route("/addDisLikes").put(async (req, res) => {
  let userId = req.body.UserID;
  let challengeId = req.body.id;
  let expId = req.body.expID;

  try {
    let res = await challenge.findOneAndUpdate(
      { "Experiences._id": expId },
      { $pull: { "Experiences.$.Likes": userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).send({ status: "Like Removed" });
});

router.route("/getChallengesUser/:id").get(async (req, res) => {
  let userId = req.params.id;
  const events = await challenge
    .find({ UserID: userId })
    .then((value) => {
      res.status(200).send(value);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get challenges", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;
  await challenge.findByIdAndDelete(id).exec();
  res.send("Deleted");
});

router.route("/update/:id").put(async (req, res) => {
  let challengeId = req.params.id;
  const {
    UserID,
    EmailAddress,
    StartDate,
    EndDate,
    ChallengeType,
    Description,
    ChallengePhoto,
    Challenge,
    Experiences,
    Participants,
  } = req.body;
  const reqBody = req.body;
  challenge
    .findByIdAndUpdate(challengeId, reqBody)
    .then(() => {
      res.status(200).send({ status: "Challenge updated" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "error with updating data", error: err.message });
    });
});

module.exports = router;