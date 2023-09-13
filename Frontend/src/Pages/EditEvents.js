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
import FlashMessage from "react-flash-message";
import { useNavigate, useParams } from "react-router-dom";


function EventsChallengePg() {

    const [EmailAddress, setEmailAddress] = useState("");
    const [DateEvent, setDateEvent] = useState("");
    const [EventType, setEventType] = useState("");
    const [Description, setDescription] = useState("");
    const [ExpectedParticipants, setExpectedParticipants] = useState("");
    const [RequiredItems, setRequiredItems] = useState("");
    const [Notes, setNotes] = useState("");
    const [EventPhoto, setEventPhoto] = useState("");
    const [Experiences, setExperiences] = useState("");
    const [Participants, setParticipants] = useState("");
    const UserID = "6465b428ba1fad182dcaba20";
    const [eventsUpcom, setEvents] = useState({ Participants: [] });
    let { id } = useParams();

    useEffect(() => {
      function getEvents() {
        axios
          .get(`http://localhost:8070/Events/getEvent/${id}`)
          .then((res) => {
            setEvents(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }

      getEvents();
    }, []);

    useEffect(() => {
      if (eventsUpcom?.EmailAddress) {
        setEmailAddress(eventsUpcom.EmailAddress);
      }
      if (eventsUpcom?.DateEvent) {
        setDateEvent(eventsUpcom.DateEvent);
      }
      if (eventsUpcom?.EventType) {
        setEventType(eventsUpcom.EventType);
      }
      if (eventsUpcom?.Description) {
        setDescription(eventsUpcom.Description);
      }
      if (eventsUpcom?.ExpectedParticipants) {
        setExpectedParticipants(eventsUpcom.ExpectedParticipants);
      }
      if (eventsUpcom?.RequiredItems) {
        setRequiredItems(eventsUpcom.RequiredItems);
      }
      if (eventsUpcom?.Notes) {
        setNotes(eventsUpcom.Notes);
      }
      if (eventsUpcom?.EventPhoto) {
        setEventPhoto(eventsUpcom.EventPhoto);
      }
      if (eventsUpcom?.Experiences) {
        setExperiences(eventsUpcom.Experiences);
      }
      if (eventsUpcom?.Participants) {
        setParticipants(eventsUpcom.Participants);
      }
      
    }, [eventsUpcom]);



    function sendData(e){

        e.preventDefault();
        
        const newEvent = {
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
        };
       axios
         .put(`http://localhost:8070/Events/update/${id}`, newEvent)
         .then(() => {
           alert("Event Updated");
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
              Update Event
            </div>

            <div className="add-review">
              <form onSubmit={sendData} className="exam">
                <Form.Label id="addEvent">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="addEvent"
                  placeholder="name@example.com"
                  defaultValue={eventsUpcom.EmailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Date</Form.Label>
                <Form.Control
                  type="date"
                  id="addEvent"
                  defaultValue={eventsUpcom.DateEvent}
                  placeholder="date"
                  min={currentDate()}
                  onChange={(e) => {
                    setDateEvent(e.target.value.split("T")[0]);
                  }}
                />
                <Form.Label id="addEvent">Event Title</Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  placeholder="type"
                  defaultValue={eventsUpcom.EventType}
                  onChange={(e) => {
                    setEventType(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Description </Form.Label>
                <textarea
                  type="text"
                  id="addEvent-descript"
                  defaultValue={eventsUpcom.Description}
                  placeholder="date"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <div className="extraDetails">
                  <div className="details">
                    <Form.Label id="addEvent">Expected Participants</Form.Label>
                    <Form.Control
                      type="number"
                      id="addEvent-extra"
                      defaultValue={eventsUpcom.ExpectedParticipants}
                      placeholder="date"
                      onChange={(e) => {
                        setExpectedParticipants(e.target.value);
                      }}
                    />
                  </div>
                  <div className="details">
                    <Form.Label id="addEvent">Required Items</Form.Label>
                    <Form.Control
                      type="text"
                      id="addEvent-extra"
                      placeholder="date"
                      defaultValue={eventsUpcom.RequiredItems}
                      onChange={(e) => {
                        setRequiredItems(e.target.value);
                      }}
                    />
                  </div>
                  <div className="details">
                    <Form.Label id="addEvent">Notess</Form.Label>
                    <Form.Control
                      type="text"
                      id="addEvent-extra"
                      placeholder="date"
                      defaultValue={eventsUpcom.Notes}
                      onChange={(e) => {
                        setNotes(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label id="addEvent">Choose Images</Form.Label>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setEventPhoto(base64)}
                  />
                  <div className="moreInfo-image">
                    <img
                      style={{ height: "100px", width: "100px" }}
                      id="moreInfo-pic"
                      src={eventsUpcom.EventPhoto}
                    />
                  </div>
                </Form.Group>
                <Button variant="primary" id="add-event-submit" type="submit">
                  <div className="btn-title" id="footer">
                    Update Event
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

export default EventsChallengePg;
