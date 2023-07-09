import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {BsDatabaseFillAdd} from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getProducts,deleteProduct } from "../../redux/apiCalls";
import { useDispatch,useSelector } from "react-redux";
import {AiFillDelete} from "react-icons/ai";

const ProductDataTable = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    getProducts(dispatch);
    console.log("EWDRTGYHJU")
  }, [dispatch,location.pathname]);

  const products= useSelector((state) => state?.product?.products);
  console.log("products",products);

  const handleDelete = id => {
   deleteProduct(id,dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 380,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params?.row?.img} alt="" />
            <span className="productListTxt">{params?.row?.title}</span>
          </div>
        );
      },
    },
    { field: "availability", headerName: "In Stock", width: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="editDel">
            <Link to={"/products/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <AiFillDelete
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="dataTableTitle">
        Add New Product
        <Link to="/products/new" style={{ textDecoration: "none" }} className="addBtn">
          <BsDatabaseFillAdd className="addBtnIcon" /> Add New
        </Link>
      </div>
      <div style={{height: 580,width: "100%"}} className="shadow-lg mt-4">
       <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          className="dataGrid"
          checkboxSelection
          getRowId={(r) => r._id}
        />
      </div>
    </div>
  );
};

export default ProductDataTable;
