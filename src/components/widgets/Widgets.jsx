import "./Widgets.scss";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import axios from "axios";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function Widgets() {
  const [income, setIncome] = useState([]);
  const token=useSelector(state=>state?.user?.currentUser?.accessToken)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("https://full-stack-ecommerce-mu.vercel.app/api/orders/income",{
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
        );
        setIncome(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, [token]);

  console.log(income)



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownwardIcon  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowUpward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}