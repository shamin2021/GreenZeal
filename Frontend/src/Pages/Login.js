import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .post("http://localhost:8070/Uders/login", formData)
      .then((res) => {
        
        localStorage.setItem("profile", JSON.stringify(res.data));
        alert("Login");
        navigate("/EventsChallengePg");
        window;
      })
      .catch((err) => {
        alert("Login failed");
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <div className="login">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            style={{ maxWidth: "500px", marginTop: "50px" }}
            onSubmit={handleSubmit}
          >
            Login
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}