import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './Menus.css';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

function Menus() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">GreenZeal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
            <NavDropdown title="All Topics" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>

            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              id = "me-1"
              aria-label="Search"
            />
            
            <Button id ="btn-search" variant="outline-success"><SearchIcon/></Button>
          </Form>
          {/* <Dropdown id="locDown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <LocationOnIcon/>
                Location
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="/Create" id="list">
                <div className="icon">
                    <FavoriteBorderIcon/>
                </div>
                <div className="title">
                    Wishlist
                </div>
            </Nav.Link>
            <Nav.Link href="#action2" id="list">
                <div className="icon">
                    <ShoppingCartIcon/>
                </div>
                <div className="title">
                    Cart
                </div>
            </Nav.Link> */}
            <Nav.Link href="/ListChallenges" id="list">
                <div className="icon">
                    <PersonIcon/>
                </div>
                <div className="title">
                    Account
                </div>
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menus;