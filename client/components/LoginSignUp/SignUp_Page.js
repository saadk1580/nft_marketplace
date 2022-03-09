import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, fetchUsers } from "../../store/index.js";
import "./Signup_Page.css";
import Alert from "@mui/material/Alert";

const SignUp_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
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
      case "password1":
        setError("");
        setPassword1(ev.target.value);
        break;
      case "first_name":
        setError("");
        setFirstName(ev.target.value);
        break;
      case "last_name":
        setError("");
        setLastName(ev.target.value);
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
      case "pw does not match":
        return "Passwords do not match";
        break;
      case "email already exists":
        return "Email already exists, please sign in";
        break;
      case "null":
        return "One or more of the required fields below is blank";
        break;
      case "Validation error: Validation isEmail on email failed":
        return "Email is not in valid format";
        break;
      default:
        return "Unknown Error, contact NFT Store Customer Service";
        break;
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const user = {
        email,
        password,
        first_name,
        last_name,
      };

      if (password !== password1) {
        setError("pw does not match");
      } else if (userEmails.includes(email)) {
        setError("email already exists");
      } else if (first_name === "" || last_name === "" || email === "") {
        setError("null");
      } else {
        await dispatch(addUser(user));
        location.hash = "#/login"; //where the user is sent after they succesfully login
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={onSubmit} className="signup-containter">
        <Link className="signup-form-item" id="signup-form-link" to="/">
          &#60; Marketplace
        </Link>
        <h1 className="sign-up-header">Sign Up</h1>
        {error && (
          <Alert severity="error" className="error-text">
            {relayError(error)}
          </Alert>
        )}

        <p>
          Already have an account?{" "}
          <Link to="/login" id="signup-form-link">
            Sign in
          </Link>
        </p>
        <input
          className="signup-form-item"
          placeholder="First Name"
          value={first_name}
          onChange={onChange}
          name="first_name"
        />

        <input
          className="signup-form-item"
          placeholder="Last Name"
          value={last_name}
          onChange={onChange}
          name="last_name"
        />

        <input
          className="signup-form-item"
          placeholder="Email"
          value={email}
          onChange={onChange}
          name="email"
        />

        <input
          className="signup-form-item"
          placeholder="Password"
          value={password}
          onChange={onChange}
          name="password"
          type={showPW ? "text" : "password"}
        />

        <input
          className="signup-form-item"
          placeholder="Confirm Password"
          value={password1}
          onChange={onChange}
          name="password1"
          type={showPW ? "text" : "password"}
        />

        <div className="view-pw" onClick={() => showPwClick()}>
          View Passwords
        </div>

        <div className="signup-form-item terms_cond">
          <input type="checkbox" />
          <p>
            By clicking Create Account, I hereby acknowledge that I agree to the
            NFT.com NFT Terms and Conditions and I've read the Privacy Notice.
          </p>
        </div>

        <button className="signup-form-item" id="submit-info">
          Create Account
        </button>
      </form>
      <div className="signup-poster">
        <div className="blur">
          <h1>
            A highly-curated platform for creating, collecting and trading
            unique NFTs
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp_Page;
