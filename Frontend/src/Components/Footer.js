import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Pages/Style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Footer() {
  return (

      <div className="HeaderEvent">
        
        <div className="fotter-detail">
          
          <div className="form">
            <div className="content-title" id="footerTitle">
              Get all your questions answered through our website 
            </div>
            <div className="FooterEvent-sub-title">
              Get in touch today.
            </div>
            <Form.Control type="password" id="inputContact" aria-describedby="passwordHelpBlock"/>
            <Form.Control type="password" id="inputContact" aria-describedby="passwordHelpBlock"/>
            <Button variant="primary" id ="submit">
              <div className = "btn-title" id="footer">
                Contact Us
              </div>
            </Button>{' '}
          </div>
          <div className="footter-img">
            <img id="footer-pic" src={require("../Assets/graphic-cartoon-character-answer-and-questions-vector-34108050-removebg-preview-removebg-preview.png")}/>
          </div>
        </div>
      </div>
        );
}

export default Footer;