import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './SideBar.css';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

function SideBar() {
  return (
    <div className="sidenav">
      <div class="side">
        <a href="/ListChallenges" class="profile-item">
          Challenge
        </a>
        <a href="/ListBlogs" class="profile-item">
          Blogs
        </a>
        <a href="/ListEvents" class="profile-item">
          Events
        </a>
        <a href="#" class="profile-item">
          Profile
        </a>
        <a href="#" class="profile-item">
          Reports
        </a>
      </div>
    </div>
  );
}

export default SideBar;