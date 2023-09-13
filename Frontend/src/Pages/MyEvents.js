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
      <div>
        
      </div>
      <Footer />
    </div>
  );
}

export default AllEvents;
