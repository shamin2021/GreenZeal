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

function AllBlogs() {
  
  const [blogs, setblogs] = useState([]);


  useEffect(() => {
    function getBlogs() {
      axios
        .get("http://localhost:8070/Blogs/getBlogs")
        .then((res) => {
          setblogs(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBlogs();
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
      <div className="HeaderEvent" style={{ minHeight: "240px" }}>
        <div className="content-title" id="headerEvent">
          Blogs
        </div>
        <div className="HeaderEvent-sub-title">
          Browse the blogs to know more information about Organic Farming <br />
          industry.
        </div>
        <div
          className="read-more"
          id="eventsInfo"
          style={{ width: "25%", float: "left" }}
        >
          <Button variant="primary" id="read-more" href="/AddBlog">
            <div className="btn-title">Add New Blog</div>
          </Button>{" "}
        </div>
      </div>

      <div className="EventsInfo">
        <div className="content-title" id="eventsInfo">
          All <span id="title-second">Blogs</span>
        </div>
      </div>

      <div className="Events">
        <div className="Cards">
          {blogs.map((item) => (
            <Card id="event-card">
              <Card.Img variant="top" src={item.BlogPhoto} />
              <Card.Body>
                <Card.Title id="eventInfo-date">
                  On {changeDate(item.DatePublish)}
                </Card.Title>
                <Card.Title id="eventInfo-title">{item.BlogTitle}</Card.Title>
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
              <Button
                variant="primary"
                id="more"
                href={`/Blogpage/${item._id}`}
              >
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

export default AllBlogs;
