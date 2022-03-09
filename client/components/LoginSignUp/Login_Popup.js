import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/auth";

import "./Login_Popup.css";

const Login_Popup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setstate] = useState("none");
  useEffect(() => {
    setTimeout(() => {
      setstate("block");
    }, 2000);
  }, []);

  const onChange = (ev) => {
    ev.target.name === "email"
      ? setEmail(ev.target.value)
      : setPassword(ev.target.value);
  };

  const dispatch = useDispatch();

  const onSubmit = (ev) => {
    ev.preventDefault();
    dispatch(authenticate(email, password));
    location.hash = "#/home"; //where the user is sent after they succesfully login
  };

  return (
    <main id="login_popup_page" style={{ display: state }}>
      <button onClick={() => setstate("none")}>X</button>
      <form onSubmit={onSubmit}>
        <h1>Login to have the best experience</h1>
        <div id="form-cont-login">
          <div className="login-cont">
            <div id="email-cont">
              <input
                id="email-info"
                placeholder="Email"
                value={email}
                onChange={onChange}
                name="email"
              />
            </div>
            <div id="pw-cont">
              <input
                id="pw-info"
                placeholder="Password"
                value={password}
                onChange={onChange}
                name="password"
                type="password"
              />
            </div>
          </div>
          <div id="submit-cont">
            <button id="submit-info">Login</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login_Popup;
