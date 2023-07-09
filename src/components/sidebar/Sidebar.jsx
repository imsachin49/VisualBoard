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
import {useDispatch} from "react-redux";

const Sidebar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
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
          <li>
            <span className="icon">
              <HomeIcon />
              Home
            </span>
          </li>
          <li>
            <span className="icon">
              <BubbleChartIcon />
              Analytics
            </span>
          </li>
          <li>
            <span className="icon">
              <TrendingUpIcon />
              Sales
            </span>
          </li>
          <span className="type">Lists</span>
          <li>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <span className="icon">
                <PersonIcon />
                Users
              </span>
            </Link>
          </li>
          <li>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <span className="icon">
                <CategoryIcon />
                Products
              </span>
            </Link>
          </li>
          <li>
            <span className="icon">
              <EqualizerIcon />
              Stats
            </span>
          </li>
          <li>
            <span className="icon">
              <StoreMallDirectoryIcon />
              Orders
            </span>
          </li>
          <span className="type">Data</span>
          <li>
            <span className="icon">
              <LocalShippingIcon />
              Delivery
            </span>
          </li>
          <li>
            <span className="icon">
              <NotificationsIcon />
              Notifications
            </span>
          </li>
          <li>
            <span className="icon">
              <SurroundSoundIcon />
              System Health
            </span>
          </li>
          <li>
            <span className="icon">
              <PsychologyIcon />
              Logs
            </span>
          </li>
          <li>
            <span className="icon">
              <SettingsIcon />
              Setting
            </span>
          </li>
          <span className="type">User</span>
          <li>
            <span className="icon">
              <AssignmentIndIcon />
              Profile
            </span>
          </li>
          <li>
            <Link to="/login" className="icon">
              <LogoutIcon />
              <span onClick={handleLogout}>Logout</span>
            </Link>
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
