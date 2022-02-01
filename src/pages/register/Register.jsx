import axios from "axios";
import { useContext, useState} from "react";
import { Context } from "../../context/Context";
import "./register.css";
import "../../global.css"
import configData from "../../conf.json"
import defaultProfileImage from "../../images/defaultProfileImage.jpg"

export default function Register() {
  const [file, setFile] = useState(null);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [profilePic, setProfilePic] = useState("hello");
  const [submitError, setSubmitError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  const handleUsernameChange = async (newUserNameValue) => {
    try {
      if (newUserNameValue) {
        let response = await axios.get(configData.API_URL + "/user/username/" + newUserNameValue);
        if (response.data) {
          setUsernameExists(true)
          setUsername("")
        } else {
          setUsernameExists(false)
          setUsername(newUserNameValue)
        }
      } else {
        setUsernameExists(false)
        setUsername("")
      }
    } catch (err) {}
  }

  const handleProfileImage = (e) => {
    setFile(e.target.files[0])
    const filename = Date.now() + e.target.files[0].name;
    setProfilePic(filename);
  }

  const areSubmitValuesCorrect = () => {
    resetErrorValues()
    let usernameErrorString = "";
    let passwordErrorString = "";
    let emailErrorString = "";
    if (usernameExists) {
      usernameErrorString = "Username already exists.";
      setSubmitError(true)
    } else if (!username) {
      usernameErrorString = "Username is empty."
      setSubmitError(true)
    }
    if (!email) {
      emailErrorString = "Email is empty";
      setSubmitError(true)
    } else if (!isEmailValid()) {
      emailErrorString = "Email is not valid";
      setSubmitError(true)
    }
    if (!password) {
      passwordErrorString = "Password is empty."
      setSubmitError(true)
    }
    if (usernameErrorString === "" && emailErrorString === "" && passwordErrorString === "") {
      return true
    }
    else {
      setUsernameErrorMsg(usernameErrorString);
      setPasswordErrorMsg(passwordErrorString);
      setEmailErrorMsg(emailErrorString);
      return false
    }
  }

  const resetErrorValues = () => {
    setSubmitError(false);
    setUsernameErrorMsg("");
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
  }
  
  const isEmailValid = () => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (areSubmitValuesCorrect()) {
      startRegister(e)
    } else {
      return null
    }
  }

  const startRegister = async () => {
    dispatch({ type: "LOGIN_START" });
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
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <div className={"registerField"}>
          <input
              style={{outline: (usernameExists) ? "2px solid red" : username ? "2px solid green" : "none"}}
              type="text"
              className="registerInput"
              placeholder="Enter your username..."
              onChange={(e) => handleUsernameChange(e.target.value)}
          />
        </div>
        {usernameErrorMsg !== "" ? <span className={"errorMessage"}>{usernameErrorMsg}</span> : null}
        <label>Email</label>
        <input
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrorMsg !== "" ? <span className={"errorMessage"}>{emailErrorMsg}</span> : null}
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErrorMsg !== "" ? <span className={"errorMessage"}>{passwordErrorMsg}</span> : null}
        <label>Profile Picture</label>
          <div className="settingsPP">
            {file ? (
                <img
                    src={URL.createObjectURL(file)}
                    alt=""
                />
            ) : (
                <img
                    src={defaultProfileImage}
                    alt=""
                />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              multiple accept={"image/*"}
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => handleProfileImage(e)}
            />
          </div>
        <button
            className="registerButton"
            type="submit"
            disabled={isFetching}
        >
          Register
        </button>
      </form>
      {submitError ? <span className={"errorMessage"}>Please fill the fields correctly and try again!</span> : null}
    </div>
  );
}