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
      <Menus/>
      <Menu2/>
      <div className="HeaderEvent">
        <div className="content-title" id="headerEvent">
          Events & Challenges 
        </div>
        <div className="HeaderEvent-sub-title">
          Browse to particpate and know more about the organic food <br/>industry.
        </div>
        <div className = "HeaderEvent-btn">
          <Button variant="primary" id ="browse" href="/Add">
            <AddIcon id="add"/>
            <div className = "btn-title">
               Add Events & Challenges
            </div>
          </Button>{' '}
        </div>
      </div>

      <div className="EventsInfo">
        <div className="content-title" id="eventsInfo">
          Upcoming <span id="title-second">Events</span> 
        </div>
      </div>
      <div className="Events">
      <div className="Cards">

        {eventsUpcom.map((item) => (
          <Card id="event-card">
            <Card.Img variant="top" src={item.EventPhoto} />
            <Card.Body>
              <Card.Title id="eventInfo-date">On {changeDate(item.DateEvent)}</Card.Title>
              <Card.Title id="eventInfo-title">{item.EventType}</Card.Title>
              <Card.Text id="eventInfo-descript">
                {item.Description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" id="author">
              <ListGroup.Item>
                <img id="profile-pic" src={item.UserID.userPhoto}/>
              </ListGroup.Item>
              <ListGroup.Item id="auth-name">{item.UserID.userName}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" id ="more" href={`/Create/${item._id}`}>
                  <div className = "btn-title" id="more">
                    Read more
                  </div>
            </Button>{' '}
          </Card>

        ))}






    </div>
    </div>

      <div className="EventsInfo">
        <div className="content-title" id="eventsInfo">
          Upcoming <span id="title-second">Challenges</span> 
        </div>
      </div>

            <div className="Events">
      <div className="Cards">

    <Card id="event-card">
      <Card.Img variant="top" src={require("../Assets/challenge4.png")} />
      <Card.Body>
        <Card.Title id="eventInfo-date">Created on 22nd January 2023</Card.Title>
        <Card.Title id="eventInfo-title">Plant one tree for a day challenge </Card.Title>
        <Card.Text id="eventInfo-descript">
          Sweet and Juicy California Grown Certified Organic Oranges. 25-30 Oranges. Picked when you place your order and shipped straight to your door. Organic Oranges have 30% 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" id="author">
        <ListGroup.Item>
          <img id="profile-pic" src={require("../Assets/background-food-symbols-6213980.jpg")}/>
        </ListGroup.Item>
        <ListGroup.Item id="auth-name">Marina Lin</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" id ="more" href="/Create">
            <div className = "btn-title" id="more" href="/Create">
               Read more
            </div>
      </Button>{' '}
    </Card>

    <Card id="event-card">
      <Card.Img variant="top" src={require("../Assets/challenge1.jpg")} />
      <Card.Body>
        <Card.Title id="eventInfo-date">Created on 22nd January 2023</Card.Title>
        <Card.Title id="eventInfo-title">Go vegan for better tomorrow challenge</Card.Title>
        <Card.Text id="eventInfo-descript">
          Sweet and Juicy California Grown Certified Organic Oranges. 25-30 Oranges. Picked when you place your order and shipped straight to your door. Organic Oranges have 30% 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" id="author">
        <ListGroup.Item>
          <img id="profile-pic" src={require("../Assets/background-food-symbols-6213980.jpg")}/>
        </ListGroup.Item>
        <ListGroup.Item id="auth-name">Marina Lin</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" id ="more" href="/Create">
            <div className = "btn-title" id="more" >
               Read more
            </div>
      </Button>{' '}
    </Card>

   <Card id="event-card">
      <Card.Img variant="top" src={require("../Assets/challenge2.png")} />
      <Card.Body>
        <Card.Title id="eventInfo-date">Created on 22nd January 2023</Card.Title>
        <Card.Title id="eventInfo-title">Diary Free day challenge</Card.Title>
        <Card.Text id="eventInfo-descript">
          Sweet and Juicy California Grown Certified Organic Oranges. 25-30 Oranges. Picked when you place your order and shipped straight to your door. Organic Oranges have 30% 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" id="author">
        <ListGroup.Item>
          <img id="profile-pic" src={require("../Assets/background-food-symbols-6213980.jpg")}/>
        </ListGroup.Item>
        <ListGroup.Item id="auth-name">Marina Lin</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" id ="more" href="/Create">
            <div className = "btn-title" id="more" >
               Read more
            </div>
      </Button>{' '}
    </Card>

    <Card id="event-card">
      <Card.Img variant="top" src={require("../Assets/challenge3.png")} />
      <Card.Body>
        <Card.Title id="eventInfo-date">Created on 22nd January 2023</Card.Title>
        <Card.Title id="eventInfo-title">Go vegan for better tomorrow challenge</Card.Title>
        <Card.Text id="eventInfo-descript">
          Sweet and Juicy California Grown Certified Organic Oranges. 25-30 Oranges. Picked when you place your order and shipped straight to your door. Organic Oranges have 30% 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" id="author">
        <ListGroup.Item>
          <img id="profile-pic" src={require("../Assets/background-food-symbols-6213980.jpg")}/>
        </ListGroup.Item>
        <ListGroup.Item id="auth-name">Marina Lin</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" id ="more" href="/Create">
            <div className = "btn-title" id="more" >
               Read more
            </div>
      </Button>{' '}
    </Card>

    </div>
    </div>
<Footer/>
    </div>
  );
}

export default EventsChallengePg;
