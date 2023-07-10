import React, {useState} from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Publish } from "@mui/icons-material";
import "./Single.scss";
import "../new/New.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LocationSearching } from "@mui/icons-material";
import { PermIdentity } from "@mui/icons-material";
import { CalendarToday } from "@mui/icons-material";
import { PhoneAndroid } from "@mui/icons-material";
import { MailOutline } from "@mui/icons-material";
import moment from "moment";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { useDispatch } from "react-redux";
import { generateProfilePic } from "../../utils/generateProfile";
import { updateCustomer } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const SingleUser = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) =>state.customer.customers.find((c) => c._id === userId));

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(customer?.userimg || "");

  const [inputs, setInputs] = useState({
    username: customer?.username,
    phoneNo: customer?.phoneNo,
    isAdmin: customer?.isAdmin,
    address: customer?.address,
    dateOfBirth: customer?.dateOfBirth,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Read and preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      if(file){
      const filName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, filName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const cusomer = {
              username: inputs.username,
              phoneNo: inputs.phoneNo,
              isAdmin: inputs.isAdmin,
              address: inputs.address,
              dateOfBirth: inputs.dateOfBirth,
              userimg: downloadURL,
              _id: userId,
            };
            updateCustomer(userId, cusomer, dispatch,navigate);
            console.log(cusomer)
          });
        }
      );
      }else{
        const customer = {
          username: inputs.username,
          phoneNo: inputs.phoneNo,
          isAdmin: inputs.isAdmin,
          address: inputs.address,
          dateOfBirth: inputs.dateOfBirth,
          userimg: previewUrl,
          _id: userId,
        };
        updateCustomer(userId, customer, dispatch,navigate);
        console.log(customer);
      }
  };

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
                  src={customer.userimg ? customer.userimg : generateProfilePic(customer?.username)}
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{customer?.username}</span>
                  <span className="userShowUserTitle">{!customer?.isAdmin ? "User @PublicMart" : "Admin @PublicMart"}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{customer?.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle dob">
                    {customer?.dateOfBirth ?
                      moment(customer?.dateOfBirth).format("MMM DD, YYYY")
                      : "Not Available"
                    }
                  </span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{customer.phoneNo ? customer.phoneNo : "Not Available" }</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle mail">{customer.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{customer.address ? (customer.address) :"Not Available" }</span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">User Name</label>
                    <input
                      onChange={handleChange}
                      value={inputs.username}
                      className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      type="text"
                      required
                      placeholder="John Doe"
                      name="username"
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
                      name="isAdmin"
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">Phone Number</label>
                    <input
                      onChange={handleChange}
                      value={inputs.phoneNo}
                      className="border text-sm placeholder:font-mono border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-mono"
                      type="text"
                      required
                      placeholder="+91 xxx-xxx-xxx"
                      name="phoneNo"
                    />
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[1px]">Date Of Birth</label>
                    <input
                      onChange={handleChange}
                      value={inputs.dateOfBirth}
                      className="border text-sm placeholder:font-mono border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-mono"
                      type="date"
                      required
                      placeholder="DD/MM/YYYY"
                      name="dateOfBirth"
                    />
                  </div>
                  <div className="flex flex-col w-[27vw] mb-2">
                    <label className="text-md font-mono mb-[px]">Address</label>
                    <textarea
                      onChange={handleChange}
                      value={inputs.address}
                      className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                      type="text"
                      required
                      placeholder="xyz street, abc city, 123456"
                      name="address"
                    />
                  </div>
                  <button className="userUpdateButton" type="submit">
                    Update
                  </button>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={previewUrl ? previewUrl : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                      alt="noImg"
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
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
