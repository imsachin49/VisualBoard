import "./WidgetLg.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from 'moment'

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const token=useSelector(state=>state?.user?.currentUser?.accessToken)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("https://full-stack-ecommerce-mu.vercel.app/api/orders",{
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
        );
        console.log(res.data)
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const generateProfilePic = (userName) => {
    const baseUrl = "https://avatars.dicebear.com/api/";
    const style = "identicon";
    const avatarUrl = `${baseUrl}${style}/${encodeURIComponent(userName)}.svg`;
    return avatarUrl;
  };

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {[1,2,3,4,5].map((k,idx)=>{return(<>{orders.map(m=> {
          return(
            <tr className="widgetLgTr" key={m._id}>
              <td className="widgetLgUser">
                <img
                  src={
                    m.userimg ? m.userimg :
                    generateProfilePic(m.user?.username)
                  }
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{m._id}</span>
              </td>
              <td className="widgetLgDate">{moment(m.createdAt).format("DD/MM/YYYY")}</td>
              <td className="widgetLgAmount">${m.amount}</td>
              <td className="widgetLgStatus">
                <Button type={m.status} />
              </td>
            </tr>
        )})}</>)})}
      </table>
    </div>
  );
}
