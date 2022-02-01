import axios from "axios";
import {useContext, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import "../../global.css"
import configData from "../../conf.json"

export default function Login() {
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    setError(false)
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(configData.API_URL + "/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      setError(false)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setError(true)
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          onChange={() => setError(false)}
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          onChange={() => setError(false)}
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
      {error ? <span className={"errorMessage"}>Login Fail. Please try again!</span> : null}
    </div>
  );
}
