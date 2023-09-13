import logo from '../logo.svg';
import Menus from '../Components/Menus';
import Menu2 from '../Components/Menu2';
import Footer from '../Components/Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddIcon from '@mui/icons-material/Add';
import ListGroup from 'react-bootstrap/ListGroup';
import './Style.css';
import axios from "axios";
import React, { useState, useEffect,useRef } from "react";

function EventsChallengePg() {
  
  const [eventsUpcom, setEvents] = useState([]);
  const [challengesUpcom, setChallenges] = useState([]);


  useEffect(() => {
    function getEvents() {
      axios
        .get("http://localhost:8070/Events/getEvents")
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    function getChallenges() {
      axios
        .get("http://localhost:8070/Challenges/getChallenges")
        .then((res) => {
          setChallenges(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getChallenges();
    getEvents();
  }, []);

    function changeDate(date){
      var  mydate = new Date(date);
      var month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
      var cont ;
      switch(mydate.getDate()%10){
        case 1: 
          cont ="st";
          break;
        case 2:
          cont ="nd";
          break;
        case 1:
          cont ="rd";
          break;
        default:
          cont ="th";
      }
      var str = mydate.getDate()+ cont +' ' + month + ' ' + mydate.getFullYear();
      return str;
    }

  return (
    <div className="App">
      <Menus />
      <Menu2 />
      <div className="HeaderEvent">
        <div className="content-title" id="headerEvent">
          Events & Challenges
        </div>
        <div className="HeaderEvent-sub-title">
          Browse to particpate and know more about the organic food <br />
          industry.
        </div>
      </div>

      <div className="EventsInfo">
        <div className="content-title" id="eventsInfo">
          Upcoming <span id="title-second">Events</span>
        </div>
        <div className="read-more" id="eventsInfo">
          <Button variant="primary" id="read-more" href="/AllEvents">
            <div className="btn-title">Explore More Events</div>
          </Button>{" "}
        </div>
      </div>
      <div className="Events">
        <div className="Cards">
          {eventsUpcom.map((item) => (
            <Card id="event-card">
              <Card.Img variant="top" src={item.EventPhoto} />
              <Card.Body>
                <Card.Title id="eventInfo-date">
                  On {changeDate(item.DateEvent)}
                </Card.Title>
                <Card.Title id="eventInfo-title">{item.EventType}</Card.Title>
                <Card.Text id="eventInfo-descript">
                  {item.Description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush" id="author">
                <ListGroup.Item>
                  <img id="profile-pic" src={item.UserID.userPhoto} />
                </ListGroup.Item>
                <ListGroup.Item id="auth-name">
                  {item.UserID.userName}
                </ListGroup.Item>
              </ListGroup>
              <Button variant="primary" id="more" href={`/Create/${item._id}`}>
                <div className="btn-title" id="more">
                  Read more
                </div>
              </Button>{" "}
            </Card>
          ))}
        </div>
      </div>

      <div className="EventsInfo">
        <div className="content-title" id="eventsInfo">
          Upcoming <span id="title-second">Challenges</span>
        </div>
        <div className="read-more" id="eventsInfo">
          <Button variant="primary" id="read-more-ch" href="/AllChallenges">
            <div className="btn-title">Explore More Challenges</div>
          </Button>{" "}
        </div>
      </div>

      <div className="Events">
        <div className="Cards">
          {challengesUpcom.map((item) => (
            <Card id="event-card">
              <Card.Img variant="top" src={item.ChallengePhoto} />
              <Card.Body>
                <Card.Title id="eventInfo-date">
                  On {changeDate(item.EndDate)}
                </Card.Title>
                <Card.Title id="eventInfo-title">
                  {item.ChallengeType}
                </Card.Title>
                <Card.Text id="eventInfo-descript">
                  {item.Description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush" id="author">
                <ListGroup.Item>
                  <img id="profile-pic" src={item.UserID.userPhoto} />
                </ListGroup.Item>
                <ListGroup.Item id="auth-name">
                  {item.UserID.userName}
                </ListGroup.Item>
              </ListGroup>
              <Button variant="primary" id="more" href={`/Challenge/${item._id}`}>
                <div className="btn-title" id="more">
                  Read more
                </div>
              </Button>{" "}
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventsChallengePg;
