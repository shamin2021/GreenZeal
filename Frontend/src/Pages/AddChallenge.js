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
import TextField from "@mui/material/TextField";

function AddChallenge() {

    const [EmailAddress, setEmailAddress] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [ChallengeType, setChallengeType] = useState("");
    const [Description, setDescription] = useState("");
    const [ChallengePhoto, setChallengePhoto] = useState("");
    const [Challenge, setChallenge] = useState("");
    const UserID = "6465b428ba1fad182dcaba20";
    const ParticipantList = [];
    const [isValid, setIsValid] = useState(false);


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
        };

       axios.post("http://localhost:8070/Challenges/add",newEvent).then(()=>{
           alert("Challenge Added")
       }).catch((err)=>{
           alert(err)
       })

    }
    
    function currentDate(){
      const date = new Date();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var fordate = year+'-'+month+'-'+day;
      return fordate;
    }


  return (
    <div className="App">
      <Menus />
      <Menu2 />

      <div className="moreInfo-reviews" id="add-Events">
        <div className="moreInfo-custReview" id="add-Events">
          <div className="add-Event">
            <div className="review-content" id="add-title">
              Add a Challenge
            </div>

            <div className="add-review">
              <form onSubmit={sendData} className="exam">
                <Form.Label id="addEvent">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="addEvent"
                  required
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Challenge Title </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  placeholder="type"
                  onChange={(e) => {
                    setChallengeType(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  height = "4"
                />
                <div className="extraDetails">
                  <div className="details">
                    <Form.Label id="addEvent">Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      id="addEvent-extra"
                      placeholder="Start date"
                      min={currentDate()}
                      onChange={(e) => {
                        setStartDate(e.target.value.split("T")[0]);
                      }}
                    />
                  </div>
                  <div className="details">
                    <Form.Label id="addEvent">End Date</Form.Label>
                    <Form.Control
                      type="date"
                      id="addEvent-extra"
                      placeholder="End date"
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
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Challenge </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
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
