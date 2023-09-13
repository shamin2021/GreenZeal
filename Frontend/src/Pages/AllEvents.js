import logo from "../logo.svg";
import Menus from "../Components/Menus";
import Menu2 from "../Components/Menu2";
import Footer from "../Components/Footer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddIcon from "@mui/icons-material/Add";
import ListGroup from "react-bootstrap/ListGroup";
import "./Style.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function AllEvents() {
  
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [eventsUpcom, setEventsUp] = useState([]);
  const [eventsPrev, setEventsPrev] = useState([]);

  useEffect(() => {
    function getEventsUp() {
      axios
        .get("http://localhost:8070/Events/getEventsUp")
        .then((res) => {
          setEventsUp(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    function getEventsPrev() {
      axios
        .get("http://localhost:8070/Events/getEventsPrev")
        .then((res) => {
          setEventsPrev(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEventsUp();
    getEventsPrev();
  }, []);

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
      <div className="HeaderEvent" id="all">
        <div className="content-title" id="headerEvent">
          Events
        </div>
        <div className="HeaderEvent-sub-title">
          Browse to particpate and know more about the organic food <br />
          industry.
        </div>
        
      </div>

      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Upcoming Challenges
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Previous Challenges
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="Events">
            <div className="Cards" id="all">
              {eventsUpcom.map((item) => (
                <Card id="event-card-all">
                  <Card.Img variant="top" src={item.EventPhoto} id="allcards" />
                  <Card.Body>
                    <Card.Title id="eventInfo-date">
                      On {changeDate(item.DateEvent)}
                    </Card.Title>
                    <Card.Title id="eventInfo-title-all">
                      {item.EventType}
                    </Card.Title>
                  </Card.Body>
                  <Button
                    variant="primary"
                    id="more-all"
                    href={`/Create/${item._id}`}
                  >
                    <div className="btn-title" id="more">
                      Read more
                    </div>
                  </Button>{" "}
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="Events">
            <div className="Cards" id="all">
              {eventsPrev.map((item) => (
                <Card id="event-card-all">
                  <Card.Img variant="top" src={item.EventPhoto} id="allcards" />
                  <Card.Body>
                    <Card.Title id="eventInfo-date">
                      On {changeDate(item.DateEvent)}
                    </Card.Title>
                    <Card.Title id="eventInfo-title-all">
                      {item.EventType}
                    </Card.Title>
                  </Card.Body>
                  <Button
                    variant="primary"
                    id="more-all"
                    href={`/Create/${item._id}`}
                  >
                    <div className="btn-title" id="more">
                      Read more
                    </div>
                  </Button>{" "}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AllEvents;
