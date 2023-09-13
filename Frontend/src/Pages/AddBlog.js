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

function AddChallenge() {

    const [EmailAddress, setEmailAddress] = useState("");
    const [DatePublish, setDatePublish] = useState("");
    const [BlogTitle, setBlogTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [BlogPhoto, setBlogPhoto] = useState("");
    const [Labels, setLabels] = useState("");
    const UserID = "6465b428ba1fad182dcaba20";


    function sendData(e){

        e.preventDefault();
        
        const newEvent = {
          UserID,
          EmailAddress,
          DatePublish,
          BlogTitle,
          Description,
          BlogPhoto,
          Labels,
        };
       axios.post("http://localhost:8070/Blogs/add",newEvent).then(()=>{
           alert("Blog Added")
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
              Add a Blog
            </div>

            <div className="add-review">
              <form onSubmit={sendData} className="exam">
                <Form.Label id="addEvent">Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="addEvent"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                />
                <Form.Label id="addEvent">Blog Title </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  placeholder="type"
                  onChange={(e) => {
                    setBlogTitle(e.target.value);
                  }}
                />
                <div className="extraDetails">
                  <div className="details">
                    <Form.Label id="addEvent">Publish Date</Form.Label>
                    <Form.Control
                      type="date"
                      read-only
                      id="addEvent-extra"
                      placeholder="date"
                      min={currentDate()}
                      onChange={(e) => {
                        setDatePublish(e.target.value.split("T")[0]);
                      }}
                    />
                  </div>
                </div>
                <Form.Label id="addEvent">Description </Form.Label>
                <textarea
                  type="text"
                  id="addEvent-descript"
                  placeholder="date"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label id="addEvent">Choose Images</Form.Label>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setBlogPhoto(base64)}
                  />
                </Form.Group>
                <Form.Label id="addEvent">Labels </Form.Label>
                <Form.Control
                  type="text"
                  id="addEvent"
                  placeholder="type"
                  onChange={(e) => {
                    setLabels(e.target.value);
                  }}
                />
                <Button variant="primary" id="add-event-submit" type="submit">
                  <div className="btn-title" id="footer">
                    Add a Blog
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
