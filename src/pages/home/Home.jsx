import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widgets from "../../components/widgets/Widgets";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/charts/Chart";
import MyTable from "../../components/table/Table";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux";
import { useEffect,useState,useMemo } from "react";
import axios from "axios";
import { userRequest } from "../../requestMethods";

const Home = () => {
  let [userStats, setUserStats] = useState([]);
  const token=useSelector(state=>state?.user?.currentUser?.accessToken)

  const MONTHS = useMemo(() => [
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
    ],[]);

    
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://full-stack-ecommerce-mu.vercel.app/api/users/stats",{
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
        );
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS,token]);

  console.log(userStats)

  
  return (
    <div className="home">
      <div>
        <Sidebar />
      </div>
      <div className="home-container">
        <Navbar />
        <div className="widgets-container">
          <Widgets type="user" />
        </div>
        <div className="charts">
          <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
        </div>
        <div className="tableContainer">
          <WidgetSm/>
          <WidgetLg/>
        </div>
      </div>
    </div>
  );
};

export default Home;
