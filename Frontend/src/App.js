import logo from './logo.svg';
import './App.css';
import Menus from './Components/Menus';
import Menu2 from './Components/Menu2';
import EventsChallengePg from './Pages/EventsChallengePg';
import CreateEvents from './Pages/CreateEvents';
import AddEvents from './Pages/AddEvents';
import AllEvents from './Pages/AllEvents';
import AllChallenges from "./Pages/AllChallenges";
import MyEvents from "./Pages/MyEvents";
import AddChallenges from "./Pages/AddChallenge";
import Challenge from "./Pages/ChallengePage";
import Blogs from "./Pages/AllBlogs";
import AddBlogs from "./Pages/AddBlog";
import BlogPage from "./Pages/BlogPage";
import ListEvents from "./Pages/ListEvents";;
import ListChallenges from "./Pages/ListChallenges";
import ListBlogs from "./Pages/ListBlogs";
import EditEvents from "./Pages/EditEvents";
import EditChallenge from "./Pages/EditChallenge";
import EditBlog from "./Pages/EditBlog";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Switch, Route,Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/EventsChallengePg" element={<EventsChallengePg />} />
            <Route path="/AllEvents" element={<AllEvents />} />
            <Route path="/AllChallenges" element={<AllChallenges />} />
            <Route path="/Create/:id" element={<CreateEvents />} />
            <Route path="/AddEvents" element={<AddEvents />} />
            <Route path="/MyEvents" element={<MyEvents />} />
            <Route path="/AddChallenges" element={<AddChallenges />} />
            <Route path="/Challenge/:id" element={<Challenge />} />
            <Route path="/Challenge/:id" element={<Challenge />} />
            <Route path="/AllBlogs" element={<Blogs />} />
            <Route path="/AddBlog" element={<AddBlogs />} />
            <Route path="/Blogpage/:id" element={<BlogPage />} />
            <Route path="/ListEvents" element={<ListEvents />} />
            <Route path="/ListChallenges" element={<ListChallenges />} />
            <Route path="/ListBlogs" element={<ListBlogs />} />
            <Route path="/EditEvents/:id" element={<EditEvents />} />
            <Route path="/EditChallenge/:id" element={<EditChallenge />} />
            <Route path="/EditBlog/:id" element={<EditBlog />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
