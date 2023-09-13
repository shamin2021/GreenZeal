import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  let navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("profile");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    // has 3 args with authentication
    axios
      .post("http://localhost:8070/Uders/register", formData)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data));
        alert("Signed up");
        navigate("/Login");
        window
      })
      .catch((err) => {
        alert("Sign up failed");
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* {isUser?(<p>user.Email</p>):<p></p>} */}

        <form
          style={{ maxWidth: "500px", marginTop: "50px" }}
          onSubmit={handleSubmit}
        >
         Sign Up
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmail}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={handlePassword}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
