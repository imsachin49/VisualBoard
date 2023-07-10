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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../Firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../redux/apiCalls";

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );
  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS, location.pathname]);

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product?.img || "");

  const [categories, setCategories] = useState(product?.categories || []);
  const [size, setSize] = useState(product?.size || []);
  const [color, setColor] = useState(product?.color || []);
  const [inputs, setInputs] = useState({
    title: product?.title || "",
    desc: product?.desc || "",
    company: product?.company || "",
    price: product?.price || "",
    availability: product?.availability || "",
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


  const handSubmit = async (e) => {
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
            const product = {
              title: inputs.title,
              desc: inputs.desc,
              company: inputs.company,
              price: inputs.price,
              availability: inputs.availability,
              img: downloadURL,
              categories,
              size,
              color,
              _id:productId
            };
            updateProduct(productId,product,dispatch,navigate);
            console.log(product);
          });
        }
      );
      }else{
        const product = {
          title: inputs.title,
          desc: inputs.desc,
          company: inputs.company,
          price: inputs.price,
          availability: inputs.availability,
          img: previewUrl,
          categories,
          size,
          color,
          _id:productId
        };
        updateProduct(productId,product,dispatch,navigate);
        console.log(product);
      }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="product">
          <div className="productTop">
            <div className="productTopLeft">
              <Chart
                // data={pStats}
                data={productData}
                dataKey="Sales"
                title="Sales Performance"
                type="single"
              />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={product?.img} alt="" className="productInfoImg" />
                <div className="productt">
                  <span className="productName">{product?.title}</span>
                  <p className="addOn">By {product.company}</p>
                </div>
              </div>

              <table>
                <tr>
                  <td>ProductID:</td>
                  <td>{product._id}</td>
                </tr>
                <tr>
                  <td>Sales:</td>
                  <td>5123</td>
                </tr>
                <tr>
                  <td>In Stock:</td>
                  <td>{product.availability === true ? "Availabel" : "NO"}</td>
                </tr>
                <tr>
                  <td>Sizes:</td>
                  <td>
                    {product.size.map((s) => {
                      return (
                        <span key={s} className="size">
                          {s}
                        </span>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Categories:</td>
                  <td>
                    {product.categories.map((s) => {
                      return (
                        <span key={s} className="size">
                          {s}
                        </span>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Colors:</td>
                  <td>
                    {product.color.map((s) => {
                      return (
                        <span
                          key={s}
                          className="color"
                          style={{
                            backgroundColor: s.toLowerCase(),
                          }}
                        />
                      );
                    })}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <form
          className="bottom bu1"
          onSubmit={handSubmit}
        > 
          <div className="right flex flex-col items-center justify-center">
            <span className="userUpdateTitle mt-5">Update Product</span>
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
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-mono"
                  type="number"
                  required
                  placeholder="Price"
                  name="price"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">Categories</label>
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
                <label className="text-md font-mono mb-[1px]">Sizes</label>
                <input
                  onChange={handleSizeChange}
                  value={size}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-mono"
                  type="text"
                  placeholder="s,m,l,xl,xxl"
                  name="sizes"
                />
              </div>
              <div className="flex flex-col w-[21vw]">
                <label className="text-md font-mono mb-[1px]">Colors</label>
                <input
                  onChange={handleColorChange}
                  value={color}
                  className="border text-sm  border-gray-300 rounded-sm p-2 px-2 outline-none focus:border-blue-300 font-candara"
                  type="text"
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
              <button className="btn" type="submit" style={{backgroundColor:"darkblue"}}>
                Update
              </button>
            </div>
          </div>
          <div className="left">
            <div className="item">
              <label htmlFor="file">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="myimg"
                    alt="n"
                  />
                ) : (
                  <IoMdAddCircle className="myimg" />
                )}
                <p className="addText">Change Product's Image</p>
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                name="file"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
