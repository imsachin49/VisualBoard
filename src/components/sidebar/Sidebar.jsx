import React from "react";
import "./Sidebar.scss";
import PersonIcon from "@mui/icons-material/Person";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from '@mui/icons-material/Home';
import { Link,useNavigate } from "react-router-dom";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {setLogout} from "../../redux/userRedux"; 
import {useDispatch,useSelector} from "react-redux";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const path=location.pathname;
  const userId=useSelector(state=>state?.user?.currentUser?.user?.id);

  const handleLogout=()=>{
    dispatch(setLogout());
    navigate("/login");
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link className='logo' to='/'>
          <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='logoImg' />
          <div className='logoName'>Admin</div>
        </Link>
      </div>
      <div className="center">
        <ul>
          <span className="type">Dashboard</span>
          <li className={`${path==="/" ? "active" : ""}`}>
            <Link to="/" style={{ textDecoration: "none" }}>
            <span className="icon">
              <HomeIcon />
              Home
            </span>
            </Link>
          </li>
          <li className={`${path==="/analytics" ? "active" : ""}`}>
            <span className="icon">
              <BubbleChartIcon />
              Analytics
            </span>
          </li>
          <li className={`${path==="/trending" ? "active" : ""}`}>
            <span className="icon">
              <TrendingUpIcon />
              Sales
            </span>
          </li>
          <span className="type">Lists</span>
          <li className={`${path==="/users" ? "active" : ""}`}>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <span className="icon">
                <PersonIcon />
                Users
              </span>
            </Link>
          </li>
          <li className={`${path==="/products" ? "active" : ""}`}>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <span className="icon">
                <CategoryIcon />
                Products
              </span>
            </Link>
          </li>
          <li className={`${path==="/stats" ? "active" : ""}`}>
            <span className="icon">
              <EqualizerIcon />
              Stats
            </span>
          </li>
          <li className={`${path==="/orders" ? "active" : ""}`}>
            <span className="icon">
              <StoreMallDirectoryIcon />
              Orders
            </span>
          </li>
          <span className="type">User</span>
          <li className={`${path===`/users/${userId}` ? "active" : ""}`}>
            <Link to={`/users/${userId}`} style={{ textDecoration: "none" }}>
              <span className="icon">
                <AssignmentIndIcon />
                Profile
              </span>
            </Link>
          </li>
          <li className={`${path==="/logout" ? "active" : ""}`}>
            <Link to="/login" className="icon">
              <LogoutIcon />
              <span onClick={handleLogout}>Logout</span>
            </Link>
          </li>
          <span className="type">Data</span>
          <li className={`${path==="/delivery" ? "active" : ""}`}>
            <span className="icon">
              <LocalShippingIcon />
              Delivery
            </span>
          </li>
          <li className={`${path==="/notification" ? "active" : ""}`}>
            <span className="icon">
              <NotificationsIcon />
              Notifications
            </span>
          </li>
          <li className={`${path==="/health" ? "active" : ""}`}>
            <span className="icon">
              <SurroundSoundIcon />
              System Health
            </span>
          </li>
          <li className={`${path==="/logs" ? "active" : ""}`}>
            <span className="icon">
              <PsychologyIcon />
              Logs
            </span>
          </li>
          <li className={`${path==="/setting" ? "active" : ""}`}>
            <span className="icon">
              <SettingsIcon />
              Setting
            </span>
          </li>
        </ul>
        <span className="type">Color Option</span>
        <div className="bottom">
          <span className="logo"></span>
          <span className="logo"></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
