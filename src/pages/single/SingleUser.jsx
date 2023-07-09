import React, { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { Publish } from "@mui/icons-material";
import Chart from "../../components/charts/Chart";
import "./Single.scss";
import "../new/New.scss";
import { productData } from "../../dummyData";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { IoMdAddCircle } from "react-icons/io";
import { LocationSearching } from "@mui/icons-material";
import { PermIdentity } from "@mui/icons-material";
import { CalendarToday } from "@mui/icons-material";
import { PhoneAndroid } from "@mui/icons-material";
import { MailOutline } from "@mui/icons-material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const SingleUser = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const userId = location.pathname.split("/")[2];
  const productId = "63b2dcc8dc8f3532d0f7ccd8";
  const [user, setUser] = useState({});

  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    isAdmin: false,
    Address: "",
    pinCode: "",
    Country: "",
    DateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="user">
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">Anna Becker</span>
                  <span className="userShowUserTitle">Software Engineer</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">annabeck99</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">10.12.1999</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">+1 123 456 67</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">annabeck99@gmail.com</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">New York | USA</span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">User Name</label>
                    <input
                      onChange={handleChange}
                      value={""}
                      className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      type="text"
                      required
                      placeholder="John Doe"
                      name="title"
                    />
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">
                      Is Admin?
                    </label>
                    <select
                      onChange={handleChange}
                      value={inputs.isAdmin}
                      className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      required
                      name="availability"
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">Phone Number</label>
                    <input
                      onChange={handleChange}
                      value={""}
                      className="border text-sm placeholder:font-mono border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      type="text"
                      required
                      placeholder="+91 xxx-xxx-xxx"
                      name="title"
                    />
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[px]">Address</label>
                    <textarea
                      onChange={handleChange}
                      value={""}
                      className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      type="text"
                      required
                      placeholder="xyz street, abc city, 123456"
                      name="title"
                    />
                  </div>
                  <button className="userUpdateButton" onClick={handleSubmit}>
                    Update
                  </button>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
