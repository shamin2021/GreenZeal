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
  const [arrayLength, setLength] = useState([]);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [rating, setRating] = useState(0);
  const [Description, setDescription] = useState("");
  const [expPhoto, setexpPhoto] = useState("");
  const [descript, setdescript] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function getBlog() {
      axios
        .get(`http://localhost:8070/Blogs/getBlog/${id}`)
        .then((res) => {
          setChallenges(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBlog();
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

  return (
    <div className="App">
      <Menus />
      <Menu2 />
      <div className="moreInfo-events">
        <div className="moreInfo-image">
          <img id="moreInfo-pic" src={challengesUpcom.BlogPhoto} />
        </div>
        <div className="moreInfo-details">
          <div className="content-event" id="type">
            Blog
          </div>
          <div className="content-event" id="title">
            {challengesUpcom.BlogTitle}
          </div>

          <div className="content-event" id="dateTitle">
            Date
          </div>
          <div className="content-event" id="date">
            {changeDate(challengesUpcom.DatePublish)}
          </div>

          <div className="content-event" id="description">
            {challengesUpcom.Description}
          </div>

          <br />
          <div className="content-event" id="date">
            {challengesUpcom.Labels}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventsChallengePg;
