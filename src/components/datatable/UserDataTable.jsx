import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {FiUserPlus} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getCustomers,deleteCustomer } from "../../redux/apiCalls";
import {AiFillDelete} from "react-icons/ai";

const UserDataTable = () => {
  const location = useLocation();
  console.log(location.pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    getCustomers(dispatch);
    console.log("EWDRTGYHJU")
  }, [dispatch,location.pathname]);

  const customers= useSelector((state) => state?.customer?.customers);
  console.log("customers",customers);

  const generateProfilePic = (userName) => {
    const baseUrl = "https://avatars.dicebear.com/api/";
    const style = "identicon";
    const avatarUrl = `${baseUrl}${style}/${encodeURIComponent(userName)}.svg`;
    return avatarUrl;
  };

  const handleDelete = id => {
   deleteCustomer(id,dispatch);
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "username",
      headerName: "Username",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={generateProfilePic(params?.row?.username)} alt="" />
            <span className="productListTxt">{(params?.row?.username)?.substr(0,16)}</span>
          </div>
        );
      },
    },
    { field: "isAdmin", headerName: "Is Admin", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="editDel">
            <Link to={"/users/" + params.row._id}>
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
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="addBtn"
        >
        <FiUserPlus className="addBtnIcon" />
          Add New
        </Link>
      </div>
      <div
        style={{
          height: 580,
          width: "100%",
          boxShadow:
            "box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <DataGrid
          rows={customers}
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

export default UserDataTable;
