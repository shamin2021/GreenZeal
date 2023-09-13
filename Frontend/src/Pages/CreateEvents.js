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

function EventsChallengePg() {
  const UserID = "6465b428ba1fad182dcaba20";

  const navigate = useNavigate();
  let { id } = useParams();

  const [eventsUpcom, setEvents] = useState({ Participants: [] });
  const [parts, setPart] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [arrayLength, setLength] = useState([]);
  const [isUpcoming, setIsUpcoming] = useState(false);

  const [rating, setRating] = useState(0);
  const [Description, setDescription] = useState("");

  useEffect(() => {
    function getEvents() {
      axios
        .get(`http://localhost:8070/Events/getEvent/${id}`)
        .then((res) => {
          setEvents(res.data);
          setIsParticipating(res.data?.Participants.includes(UserID));
          setLength(res.data?.Participants.length);
          setIsUpcoming(res.data?.DateEvent >= new Date().toISOString());
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getEvents();
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
      .put(`http://localhost:8070/Events/addParticipants`, newParticipant)
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
      .put(`http://localhost:8070/Events/removeParticipants`, newParticipant)
      .then(() => {
        alert("Marked as Not Going");
        document.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function sendComment(e) {
    e.preventDefault();

    setRating(parseInt(rating));
    const newComment = {
      id,
      UserID,
      rating,
      Description,
    };

    console.log(newComment);

    axios
      .put(`http://localhost:8070/Events/addComment`, newComment)
      .then(() => {
        alert("Experience is added");
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
          <img id="moreInfo-pic" src={eventsUpcom.EventPhoto} />
        </div>
        <div className="moreInfo-details">
          <div className="content-event" id="type">
            Event
          </div>
          <div className="content-event" id="title">
            {eventsUpcom.EventType}
          </div>
          <div className="content-event" id="participants">
            {arrayLength} {isUpcoming ? "Going" : "Went"}{" "}
          </div>
          <div className="content-event" id="dateTitle">
            Event Date
          </div>
          <div className="content-event" id="date">
            {changeDate(eventsUpcom.DateEvent)}
          </div>
          {isUpcoming ? (
            isParticipating ? (
              <div className="going">
                <DoneIcon id="going" />
                <div className="going-title">Marked as Participating </div>
              </div>
            ) : (
              ""
            )
          ) : isParticipating ? (
            <div className="going">
              <DoneIcon id="going" />
              <div className="going-title"> Participated </div>
            </div>
          ) : (
            ""
          )}

          <div className="content-event" id="description">
            {eventsUpcom.Description}
          </div>
          <div className="content-event" id="list">
            <ul id="list">
              <li>
                Expected Participants :{" "}
                <span id="mi-info">{eventsUpcom.ExpectedParticipants} </span>
              </li>
              <li>
                Required Items :{" "}
                <span id="mi-info">{eventsUpcom.RequiredItems} </span>
              </li>
              <li>
                More Details : <span id="mi-info">{eventsUpcom.Notes} </span>
              </li>
            </ul>
          </div>

          {isUpcoming ? (
            arrayLength >= eventsUpcom.ExpectedParticipants ? (
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

      {!isUpcoming ? (
        <div className="moreInfo-reviews">
          <div className="moreInfo-custReview">
            <div className="reviews">
              <div className="content-event" id="review-title">
                Reviews
              </div>
              <div className="reviews-ind">
                {eventsUpcom.Experiences?.map((exp) => (
                  <div className="moreInfo-reviewCust">
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
                      </div>
                    </div>
                    <div className="moreInfo-reviewCust-review">
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
                  </div>
                ))}
              </div>
              {/* <div className="moreInfo-reviewCust">
                <div className="moreInfo-reviewCust-profile">
                  <div className="moreInfo-reviewCust-profilePic">
                    <img
                      id="review-profile-pic"
                      src={require("../Assets/background-food-symbols-6213980.jpg")}
                    />
                  </div>
                  <div
                    className="review-content"
                    id="moreInfo-reviewCust-profileName"
                  >
                    Shamin
                  </div>
                </div>
                <div className="moreInfo-reviewCust-review">
                  <div className="review-content" id="date">
                    {eventsUpcom.Experiences?.map((exp) => {
                      console.log(exp.commenterID);
                    })}
                  </div>
                  <div className="review-content" id="description">
                    Sweet and Juicy California Grown Certified Organic Oranges.
                    25-30 Oranges. Picked when you place your order and shipped
                    straight to your door. Organic Oranges have 30% more Vitamin
                    C than conventionally grown.
                  </div>
                  <div className="stars">
                    <div className="star-review">
                      <StarIcon id="rev" />
                      <StarIcon id="rev" />
                      <StarIcon id="rev" />
                      <StarIcon id="rev" />
                      <StarIcon id="rev" />
                    </div>
                    <div className="star-review-cont">(4.0 reviews)</div>
                  </div>
                </div>
              </div> */}
            </div>
            {isParticipating ? (
              <div className="leave-reviews">
                <div className="review-content" id="leave-title">
                  Add an Experience
                </div>
                <div className="add-review">
                  <form onSubmit={sendComment} className="exam">
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
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <br />
                    <Button variant="primary" id="add-submit" type="submit">
                      <div className="btn-title" id="footer">
                        Add an Experience
                      </div>
                    </Button>{" "}
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Footer />
    </div>
  );
}

export default EventsChallengePg;
