import logo from '../logo.svg';
import Menus from '../Components/Menus';
import Menu2 from '../Components/Menu2';
import Footer from '../Components/Footer';
import StarIcon from '@mui/icons-material/Star';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from "react-router-dom";



function AddChallenge() {

    const [EmailAddress, setEmailAddress] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [ChallengeType, setChallengeType] = useState("");
    const [Description, setDescription] = useState("");
    const [ChallengePhoto, setChallengePhoto] = useState("");
    const [Challenge, setChallenge] = useState("");
    const UserID = "6465b428ba1fad182dcaba20";
    const [Experiences, setExperiences] = useState("");
    const [Participants, setParticipants] = useState("");
    const [challenges, setChallenges] = useState("");
     let { id } = useParams();
    
    useEffect(() => {
      function getChallenge() {
        axios
          .get(`http://localhost:8070/Challenges/getChallenge/${id}`)
          .then((res) => {
            setChallenges(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }

      getChallenge();
    }, []);

    useEffect(() => {
      if (challenges?.EmailAddress) {
        setEmailAddress(challenges.EmailAddress);
      }
      if (challenges?.StartDate) {
        setStartDate(challenges.StartDate);
      }
      if (challenges?.EndDate) {
        setEndDate(challenges.EndDate);
      }
      if (challenges?.ChallengeType) {
        setChallengeType(challenges.ChallengeType);
      }
      if (challenges?.Description) {
        setDescription(challenges.Description);
      }
      if (challenges?.ChallengePhoto) {
        setChallengePhoto(challenges.ChallengePhoto);
      }
      if (challenges?.Challenge) {
        setChallenge(challenges.Challenge);
      }
      if (challenges?.EventPhoto) {
        setEventPhoto(challenges.EventPhoto);
      }
      if (challenges?.Experiences) {
        setExperiences(challenges.Experiences);
      }
      if (challenges?.Participants) {
        setParticipants(challenges.Participants);
      }
    }, [challenges]);

    function sendData(e){

        e.preventDefault();
        
        const newEvent = {
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
        };
       axios
         .put(`http://localhost:8070/Challenges/update/${id}`, newEvent)
         .then(() => {
           alert("Challenge Updated");
         })
         .catch((err) => {
           alert(err);
         });

    }

    
    function currentDate(){
      const date = new Date();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var fordate = year+'-'+month+'-'+day;
      return fordate;
    }
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


  return (
    <div className="App">
      <Menus />
      <Menu2 />

      <div className="moreInfo-reviews" id="add-Events">
        <div className="moreInfo-custReview" id="add-Events">
          <div className="add-Event">
            <div className="review-content" id="add-title">
              Update Challenge
            </div>

            <div className="add-review">
              <form onSubmit={sendData} className="exam">
                <Form.Label id="addEvent">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="addEvent"
                  defaultValue={challenges.EmailAddress}
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Challenge Title </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  defaultValue={challenges.ChallengeType}
                  placeholder="type"
                  onChange={(e) => {
                    setChallengeType(e.target.value);
                  }}
                />
                <div className="extraDetails">
                  <div className="details">
                    <Form.Label id="addEvent">Start Date</Form.Label>
                    {changeDate(challenges.StartDate)}
                    <Form.Control
                      type="date"
                      id="addEvent-extra"
                      placeholder="date"
                      defaultValue={challenges.StartDate}
                      min={currentDate()}
                      onChange={(e) => {
                        setStartDate(e.target.value.split("T")[0]);
                      }}
                    />
                  </div>
                  <div className="details">
                    <Form.Label id="addEvent">End Date</Form.Label>
                    {changeDate(challenges.EndDate)}
                    <Form.Control
                      type="date"
                      id="addEvent-extra"
                      placeholder="date"
                      defaultValue={challenges.EndDate}
                      min={currentDate()}
                      onChange={(e) => {
                        setEndDate(e.target.value.split("T")[0]);
                      }}
                    />
                  </div>
                </div>
                <Form.Label id="addEvent">Description </Form.Label>
                <textarea
                  type="text"
                  id="addEvent-descript"
                  placeholder="date"
                  defaultValue={challenges.Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Challenge </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  defaultValue={challenges.Challenge}
                  placeholder="type"
                  onChange={(e) => {
                    setChallenge(e.target.value);
                  }}
                />
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label id="addEvent">Choose Images</Form.Label>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setChallengePhoto(base64)}
                  />
                  <div className="moreInfo-image">
                    <img
                      style={{ height: "100px", width: "100px" }}
                      id="moreInfo-pic"
                      src={challenges.ChallengePhoto}
                    />
                  </div>
                </Form.Group>
                <Button variant="primary" id="add-event-submit" type="submit">
                  <div className="btn-title" id="footer">
                    Add a Challenge
                  </div>
                </Button>{" "}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AddChallenge;
