import { useEffect, useState } from "react";
import "./WidgetSm.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const token=useSelector(state=>state?.user?.currentUser?.accessToken)

  console.log(token)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://full-stack-ecommerce-mu.vercel.app/api/users",{
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
        );
        console.log(res.data)
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const generateProfilePic = (userName) => {
    const baseUrl = "https://avatars.dicebear.com/api/";
    const style = "identicon";
    const avatarUrl = `${baseUrl}${style}/${encodeURIComponent(userName)}.svg`;
    return avatarUrl;
  };
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.slice(0,5)?.map((user)=>{
          return(
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={generateProfilePic(user?.username || "random")}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{(user?.username).substr(0,17)}</span>
              <span className={`widgetSmUserTitle ${user.isAdmin ? "diff" :""}`}>{user?.isAdmin==true ? "PublicMart Admin" :"Customer"}</span>
            </div>
            <button className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Display
            </button>
          </li>
          )})}
      </ul>
    </div>
  );
}
