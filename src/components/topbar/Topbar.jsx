import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import configData from "../../conf.json"

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = configData.API_URL + "/image/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul>
          <li>
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li>
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link className="link" to="/">
            {user && "LOGOUT"}
            </Link>          
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul>
            <li>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li>
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}