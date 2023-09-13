import logo from "../logo.svg";
import Menus from "../Components/Menus";
import Menu2 from "../Components/Menu2";
import Footer from "../Components/Footer";
import StarIcon from "@mui/icons-material/Star";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddIcon from "@mui/icons-material/Add";
import ReactModal from "react-modal";
import FileBase64 from "react-file-base64";

function EventsChallengePg() {
  const UserID = "6465b428ba1fad182dcaba20";

  const navigate = useNavigate();
  let { id } = useParams();

  const [challengesUpcom, setChallenges] = useState({ Participants: [] });
  const [parts, setPart] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [arrayLength, setLength] = useState([]);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [rating, setRating] = useState(0);
  const [Description, setDescription] = useState("");
  const [expPhoto, setexpPhoto] = useState("");
  const [descript, setdescript] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function getChallenge() {
      axios
        .get(`http://localhost:8070/Challenges/getChallenge/${id}`)
        .then((res) => {
          setChallenges(res.data);
          setIsParticipating(res.data?.Participants.includes(UserID));
          setLength(res.data?.Participants.length);
          setIsUpcoming(res.data?.EndDate >= new Date().toISOString());
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getChallenge();
  }, []);

  useEffect(() => {});

  function changeDate(date) {
    var mydate = new Date(date);
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][mydate.getMonth()];
    var cont;
    switch (mydate.getDate() % 10) {
      case 1:
        cont = "st";
        break;
      case 2:
        cont = "nd";
        break;
      case 1:
        cont = "rd";
        break;
      default:
        cont = "th";
    }
    var str =
      mydate.getDate() + cont + " " + month + " " + mydate.getFullYear();
    return str;
  }

  function sendData(e) {
    e.preventDefault();

    const newParticipant = {
      id,
      UserID,
    };

    axios
      .put(`http://localhost:8070/Challenges/addParticipants`, newParticipant)
      .then(() => {
        alert("Marked as Going");
        document.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function removeData(e) {
    e.preventDefault();

    const newParticipant = {
      id,
      UserID,
    };
    axios
      .put(`http://localhost:8070/Challenges/removeParticipants`, newParticipant)
      .then(() => {
        alert("Marked as Not Going");
        document.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function sendAttempt(e) {
    e.preventDefault();

    setRating(parseInt(rating));
    const newComment = {
      id,
      UserID,
      rating,
      descript,
      expPhoto,
    };

    axios
      .put(`http://localhost:8070/Challenges/addAttempt`, newComment)
      .then(() => {
        alert("Attempt is added");
        document.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }
  
  function onLikeButtonClick(e,expID) {

    console.log(expID);
    const newComment = {
      id,
      UserID,
      expID,
    };

    axios
      .put(`http://localhost:8070/Challenges/addLikes`, newComment)
      .then(() => {
        alert("Liked");
        document.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

    function ondisLikeButtonClick(e, expID) {
      console.log(expID);
      const newComment = {
        id,
        UserID,
        expID,
      };

      axios
        .put(`http://localhost:8070/Challenges/addDisLikes`, newComment)
        .then(() => {
          alert("Like Removed");
          document.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }

  return (
    <div className="App">
      <Menus />
      <Menu2 />
      <div className="moreInfo-events">
        <div className="moreInfo-image">
          <img id="moreInfo-pic" src={challengesUpcom.ChallengePhoto} />
        </div>
        <div className="moreInfo-details">
          <div className="content-event" id="type">
            Challenge
          </div>
          <div className="content-event" id="title">
            {challengesUpcom.ChallengeType}
          </div>

          <div className="content-event" id="participants">
            {arrayLength} {isUpcoming ? "Attempting" : "Attempted"}{" "}
          </div>

          <div className="content-event" id="dateTitle">
            Challenge Period
          </div>
          <div className="content-event" id="date">
            {changeDate(challengesUpcom.StartDate)} -{" "}
            {changeDate(challengesUpcom.EndDate)}
          </div>
          {isUpcoming ? (
            isParticipating ? (
              <div className="going">
                <DoneIcon id="going" />
                <div className="going-title">Marked as Attempting </div>
              </div>
            ) : (
              ""
            )
          ) : isParticipating ? (
            <div className="going">
              <DoneIcon id="going" />
              <div className="going-title"> Attempted </div>
            </div>
          ) : (
            ""
          )}

          <div className="content-event" id="dateTitle">
            Rules
          </div>
          <div className="going">
            <DoneIcon id="going" style={{ width: "20px" }} />
            <div
              className="content-event"
              style={{ marginLeft: "10px" }}
              id="date"
            >
              {challengesUpcom.Challenge}
            </div>
          </div>

          <div className="content-event" id="description">
            {challengesUpcom.Description}
          </div>

          {isUpcoming ? (
            arrayLength >= challengesUpcom.ExpectedParticipants ? (
              <Button variant="primary" id="exceed" type="submit">
                <div className="btn-title">Limit Exceeded</div>
              </Button>
            ) : isParticipating ? (
              <div>
                <Button
                  variant="primary"
                  id="exceed"
                  type="submit"
                  onClick={removeData}
                >
                  <CloseIcon id="add" />
                  <div className="btn-title">Mark as Not Going</div>
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                id="participate"
                type="submit"
                onClick={sendData}
              >
                <div className="btn-title">Mark as Participating</div>
              </Button>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="moreInfo-reviews" id="challenge">
        <div className="moreInfo-custReview">
          <div className="reviews">
            <div className="content-event" id="review-title">
              Attempts
            </div>
            {isParticipating ? (
              <div className="HeaderEvent-btn" id="challengeAdd">
                <Button variant="primary" id="browse" onClick={setIsOpen}>
                  <AddIcon id="add" />
                  <div className="btn-title">Add Attempt</div>
                </Button>{" "}
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="reviews-ind" id="attemptCh">
              {challengesUpcom.Experiences?.map((exp) => (
                <div className="moreInfo-reviewCust">
                  <div className="moreInfo-reviewCust-profilePic">
                    <img id="review-pic-exp" src={exp.expPhoto} />
                  </div>
                  <div className="moreInfo-reviewCust-review" id="challenge">
                    <div className="review-content" id="date">
                      {changeDate(exp.dateAdded)}
                    </div>
                    <div className="review-content" id="description">
                      {exp.descript}
                    </div>
                    <div className="stars">
                      <div className="star-review">
                        {Array.from({ length: 5 }, (v, i) =>
                          i < exp.rating ? (
                            <StarIcon id="rev" />
                          ) : (
                            <StarOutlineIcon id="rev" />
                          )
                        )}
                      </div>
                      <div className="star-review-cont">({exp.rating})</div>
                    </div>
                  </div>
                  <div className="moreInfo-reviewCust-profile">
                    <div className="moreInfo-reviewCust-profilePic">
                      <img
                        id="review-profile-pic-ch"
                        src={exp.commenterID.userPhoto}
                      />
                    </div>
                    <div
                      className="review-content"
                      id="moreInfo-reviewCust-profileName"
                    >
                      {exp.commenterID.userName}
                      {isLiked}
                    </div>
                  </div>

                  {exp.Likes.includes(UserID) ? (
                    <button
                      className="like"
                      onClick={(e) => ondisLikeButtonClick(e, exp._id)}
                      style={{ width: "120px" }}
                    >
                      <ThumbUpAltIcon id="like" />
                      <div className="like-btn">
                        {" "}
                        | {exp.Likes.length} Liked
                      </div>
                    </button>
                  ) : (
                    <button
                      className="like"
                      onClick={(e) => onLikeButtonClick(e, exp._id)}
                    >
                      <ThumbUpOffAltIcon id="like" />
                      <div className="like-btn"> | {exp.Likes.length} Like</div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {isParticipating ? (
            <ReactModal
              isOpen={isOpen}
              contentLabel="Example Modal"
              onRequestClose={() => setIsOpen(false)}
            >
              <div style={{ backgroundColor: "white", width: "500px" }}>
                <div className="leave-reviews">
                  <div className="review-content" id="leave-title">
                    Add an Attempt of challenge
                  </div>
                  <br />
                  <div className="add-review">
                    <form onSubmit={sendAttempt} className="exam">
                      <Form.Label id="addEvent">
                        Date : {changeDate(new Date())}
                      </Form.Label>
                      <div className="add-star-review">
                        <StarRatings
                          rating={rating}
                          starRatedColor="orange"
                          changeRating={setRating}
                          numberOfStars={5}
                          name="rating"
                          starDimension="30px"
                        />
                      </div>
                      <textarea
                        type="text"
                        id="inputReview-Text"
                        placeholder="Experience"
                        style={{ marginBottom: "20px" }}
                        onChange={(e) => {
                          setdescript(e.target.value);
                        }}
                      />
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label id="addEvent">Choose Images</Form.Label>
                        <FileBase64
                          multiple={false}
                          onDone={({ base64 }) => setexpPhoto(base64)}
                        />
                      </Form.Group>
                      <br />
                      <Button variant="primary" id="add-submit" type="submit">
                        <div className="btn-title" id="footer">
                          Add an Experience
                        </div>
                      </Button>{" "}
                    </form>
                  </div>
                </div>
              </div>
            </ReactModal>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventsChallengePg;
