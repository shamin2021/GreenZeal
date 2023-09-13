const router = require("express").Router();
const { response } = require("express");
const { find, findByIdAndDelete } = require("../models/Blog");
let blog = require("../models/Blog");

router.route("/add").post((req, res) => {
  const UserID = req.body.UserID;
  const EmailAddress = req.body.EmailAddress;
  const DatePublish = req.body.DatePublish;
  const BlogTitle = req.body.BlogTitle;
  const Description = req.body.Description;
  const BlogPhoto = req.body.BlogPhoto;
  const Labels = req.body.Labels;

  const newBlog = new blog({
    UserID,
    EmailAddress,
    DatePublish,
    BlogTitle,
    Description,
    BlogPhoto,
    Labels,
  });
  newBlog
    .save()
    .then(() => {
      res.json("Blog SUbmitted");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getBlogs").get((req, res) => {
  blog
    .find()
    .populate("UserID")
    .sort({ DatePublish: 1 })
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

router.route("/getBlog/:id").get(async (req, res) => {
  let blogID = req.params.id;
  const blogs = await blog
    .findById(blogID)
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

router.route("/getBlogsUser/:id").get(async (req, res) => {
  let userId = req.params.id;
  const blogg = await blog
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
  await blog.findByIdAndDelete(id).exec();
  res.send("Deleted");
});

router.route("/update/:id").put(async (req, res) => {
  let blogId = req.params.id;
  const {
    UserID,
    EmailAddress,
    DatePublish,
    BlogTitle,
    Description,
    BlogPhoto,
    Labels,
  } = req.body;
  const reqBody = req.body;
  blog
    .findByIdAndUpdate(blogId, reqBody)
    .then(() => {
      res.status(200).send({ status: "Blog updated" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "error with updating data", error: err.message });
    });
});

module.exports = router;