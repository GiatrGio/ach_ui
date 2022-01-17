import axios from "axios";
import { useContext} from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import "./register.css";
import configData from "../../conf.json"
import defaultProfileImage from "../../images/defaultProfileImage.jpg"

export default function Register() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameExists, setUsernameExists] = useState(false)
  const [emailExists, setEmailExists] = useState(false);
  const [profilePic, setProfilePic] = useState("hello")
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  // const handleUsernameChange = (e) => {
  //   try {
  //     await axios.get(configData.API_URL + "/upload", data);
  //   } catch (err) {}
  // }

  // const handleEmailChange = (e) => {

  // }

  const handleProfileImage = (e) => {
    setFile(e.target.files[0])
    const filename = Date.now() + e.target.files[0].name;
    setProfilePic(filename);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setError(false);
    try {
      if (file) {
        const data = new FormData();
        data.append("name", profilePic);
        data.append("file", file);
        try {
          await axios.post(configData.API_URL + "/upload", data);
        } catch (err) {
          console.log(err)
        }
      }
      const res = await axios.post(configData.API_URL + "/auth/register", {
        username,
        email,
        password,
        profilePic
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err)
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
                  <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={defaultProfileImage}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => handleProfileImage(e)}
            />
          </div>
        <button className="registerButton" type="submit" disabled={isFetching}>
          Register
        </button>
      </form>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}