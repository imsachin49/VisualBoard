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
import {addProduct} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewProduct = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    company: "",
    price: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCatChange = (e) => {
    const { value } = e.target;
    setCategories(value.split(","));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setSize(value.split(","));
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setColor(value.split(","));
  };
  
  const handSubmit = async(e) => {    
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
            const product={
              title:inputs.title,
              desc:inputs.desc,
              company:inputs.company,
              price:inputs.price,
              availability:inputs.availability,
              img:downloadURL,
              categories,
              size,
              color
            }
            addProduct(product,dispatch);
            console.log(product);
          });
        }
    );
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <h1 className="top">Add New Product</h1>
        <form className="bottom shadow-sm" onSubmit={handSubmit}>
          <div className="left">
            <div className="item">
              <label htmlFor="file">
                {file ? <img src={file &&  URL.createObjectURL(file)} className="myimg" alt="n"  />
                  :<IoMdAddCircle className="myimg" />}
                  <p className="addText">Add Product's Image</p>
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
                required
              />
            </div>
          </div>
          <div className="right">
            <div className="form forms grid">
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Product Name
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.title}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="Product Name"
                  name="title"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  value={inputs.desc}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="About Product"
                  name="desc"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Product's Company
                </label>
                <input
                  onChange={handleChange}
                  value={inputs.company}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="Company Name"
                  name="company"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">Price</label>
                <input
                  onChange={handleChange}
                  value={inputs.price}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="number"
                  required
                  placeholder="Price"
                  name="price"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Categories
                </label>
                <input
                  onChange={handleCatChange}
                  value={categories}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="mens,womens,electronics,etc"
                  name="categories"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Sizes
                </label>
                <input
                  onChange={handleSizeChange}
                  value={size}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="s,m,l,xl,xxl"
                  name="sizes"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Colors
                </label>
                <input
                  onChange={handleColorChange}
                  value={color}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
                  required
                  placeholder="red,black,blue,green etc"
                  name="colors"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">
                  Availability                  
                </label>
                <select
                  onChange={handleChange}
                  value={inputs.availability}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  required
                  name="availability"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              <button className="btn" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
