import React from "react";
import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ListIcon from "@mui/icons-material/List";
import { IconButton } from "@mui/material";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user=useSelector(state=>state?.user?.currentUser?.user?.username)

  return (
      <div className="navbar">
        <div className="navbar-wrapper">
        <form className="NavSearch" onSubmit={() => {}}>
          <GoSearch style={{ margin: "0px 5px", marginLeft: "10px" }} color="gray"/>
            <input type="text" placeholder="Search for Products" className="searchInput" onChange={()=>{}} name="title"/>
          </form>
          <div className="nav-icons">
            <IconButton className="icon">
              <LanguageIcon />
            </IconButton>
            <IconButton className="icon">
              <DarkModeIcon />
            </IconButton>
            <div className="icon">
              <img
                src="https://images.unsplash.com/photo-1483726234545-481d6e880fc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className="avatar"
                alt="avatar"
              />
            </div>
            <p style={{color:"white",backgroundColor:"black",padding:"6px 10px",
              boxShadow:"0 0 0 1px rgba(255,255,255,0.1)",borderRadius:"4px"}}>
              {user ? user :""}
            </p>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
