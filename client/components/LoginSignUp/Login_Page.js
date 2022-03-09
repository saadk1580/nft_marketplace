import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate, fetchUsers } from "../../store/index.js";
import "./Login_Page.css";
import Alert from "@mui/material/Alert";

const Login_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPW, setShowPW] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useSelector((state) => state.users);

  if (!users) {
    return null;
  }

  const userEmails = users.map((user) => {
    return user.email;
  });

  const onChange = (ev) => {
    switch (ev.target.name) {
      case "email":
        setError("");
        setEmail(ev.target.value);
        break;
      case "password":
        setError("");
        setPassword(ev.target.value);
        break;
      default:
        throw "error";
    }
  };

  const showPwClick = () => {
    setShowPW(!showPW);
  };

  const relayError = (err) => {
    switch (err) {
      case "not valid":
        return "invalid email and/or password";
        break;
      case "bad credentials - in byToken on catch":
        return "invalid email and/or password";
        break;
        return "Unknown Error, contact NFT Store Customer Service";
        break;
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (!userEmails.includes(email)) {
        setError("not valid");
      } else {
        await dispatch(authenticate(email, password));
        location.hash = "#/home"; //where the user is sent after they succesfully login
      }
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-poster">
        <div className="blur">
          <h1>NFT.com is the world's biggest NFT marketplace</h1>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="login-containter">
          <Link className="login-form-item" id="login-form-link" to="/">
            &#60; Marketplace
          </Link>
          <h1 className="login-header">Sign In</h1>
          {error && (
            <Alert severity="error" className="error-text">
              {relayError(error)}
            </Alert>
          )}
          <p>
            Don't have an account?{" "}
            <Link to="/signup" id="login-form-link">
              Sign up
            </Link>
          </p>
          <input
            className="login-form-item"
            id="email-info"
            placeholder="Email"
            value={email}
            onChange={onChange}
            name="email"
          />
          <input
            className="login-form-item"
            id="pw-info"
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
            type={showPW ? "text" : "password"}
          />
          <div className="view-pw" onClick={() => showPwClick()}>
            View Password
          </div>
          <button id="submit-info" className="login-form-item">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login_Page;
