import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./New.scss";
import { useState } from "react";
import {IoMdAddCircle} from "react-icons/io";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import {addCustomer} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewUser = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    Address: "",
    DateOfBirth: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const filName=new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            const user={
              username:inputs.username,
              email:inputs.email,
              phoneNo:inputs.phoneNo,
              password:inputs.password,
              Address:inputs.Address,
              DateOfBirth:inputs.DateOfBirth,
              isAdmin:inputs.isAdmin,
              userimg:downloadURL,
            }
            addCustomer(user,dispatch);
            console.log(user);
          });
        }
    );
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <h1 className="top">Add New User</h1>
        <form className="bottom shadow-sm" onSubmit={handleSubmit}>
          <div className="left">
            <div className="item">
              <label htmlFor="file">
                {file ? <img src={file &&  URL.createObjectURL(file)} className="myimg" alt="n"  />
                  :<IoMdAddCircle className="myimg" />}
                  <p className="addText">Add User's Image</p>
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="right">
            <div className="form forms grid">
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Create userName
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.username}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="UserName"
                  name="username"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.email}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="email"
                  required
                  placeholder="Your Email"
                  name="email"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Phone Number
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.phoneNo}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="Phone Number"
                  name="phoneNo"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">Password</label>
                <input
                  onChange={handleChange}
                  value={inputs.password}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  User's Address
                </label>
                <textarea
                  onChange={handleChange}
                  value={inputs.Address}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="User Address"
                  name="Address"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
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
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Date of Birth
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.DateOfBirth}
                  className="border  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara text-sm"
                  type="date"
                  required
                  placeholder="Date Of Birth"
                  name="DateOfBirth"
                />
              </div>
              <div className="flex flex-col w-[21vw]"></div>
              <button className="btn" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
