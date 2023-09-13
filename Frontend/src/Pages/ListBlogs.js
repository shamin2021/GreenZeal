import logo from '../logo.svg';
import Menus from '../Components/Menus';
import Menu2 from '../Components/Menu2';
import Footer from '../Components/Footer';
import SideBar from "../Components/SideBar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddIcon from '@mui/icons-material/Add';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import './Style.css';
import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import ReactModal from "react-modal";

function AllBlogs() {
  

  const [blogs, setblogs] = useState([]);
  const UserID = "6465b428ba1fad182dcaba20";
  const [isOpen, setIsOpen] = useState(false);
   

  useEffect(() => {
    function getBlogs() {
      axios
        .get(`http://localhost:8070/Blogs/getBlogsUser/${UserID}`)
        .then((res) => {
          setblogs(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBlogs();
  }, []);

  const deleteBlogs = (id) => {
    axios
      .delete(`http://localhost:8070/Blogs/delete/${id}`)
      .then((res) => {
        alert(`deleted successfully`);
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

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
      <div className="profile">
        <div className="sidenav">
          <SideBar />
        </div>
        <div className="profile-content">
          <div className="profHeader">
            <div className="profHeader-title">
              <div className="profHeader-content-title">My Blogs</div>
            </div>
            <div className="profHeader-btn">
              <div className="HeaderEvent-btn">
                <Button
                  variant="primary"
                  id="browse"
                  href="/AddBlog"
                  style={{ margin: "0px" }}
                >
                  <AddIcon id="add" />
                  <div className="btn-title">Add Blogs</div>
                </Button>{" "}
              </div>
            </div>
          </div>
          <div className="box-content">
            <table className="table-content-prof">
              <tr>
                <th>Title </th>
                <th>Labels</th>
                <th> Publish Date</th>
                <th> </th>
                <th> </th>
              </tr>
              {blogs.map((item) => (
                <tr>
                  <td id="title">{item.BlogTitle}</td>
                  <td>{item.Labels}</td>
                  <td>{changeDate(item.DatePublish)}</td>
                  <td>
                    <Button
                      variant="primary"
                      id="editBtnProf"
                      onClick={setIsOpen}
                    >
                      <DeleteIcon id="deleteBtnProf" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      id="editBtnProf"
                      href={`/EditBlog/${item._id}`}
                    >
                      <EditIcon id="editBtnProf" />
                    </Button>
                  </td>
                  <ReactModal
                    isOpen={isOpen}
                    contentLabel="Example Modal"
                    id="deleteSure"
                    onRequestClose={() => setIsOpen(false)}
                  >
                    <div className="deleteSure">
                      <div>Are you sure you want to delete this?</div>
                      <div>
                        <Button variant="primary" id="deletSure" type="submit">
                          <div
                            className="btn-title"
                            onClick={() => deleteBlogs(item._id)}
                          >
                            Delete
                          </div>
                        </Button>
                      </div>
                    </div>
                  </ReactModal>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllBlogs;
