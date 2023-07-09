import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SingleProduct from "./pages/single/SingleProduct";
import SingleUser from "./pages/single/SingleUser";
import List from "./pages/list/List";
import { productInputs, userInputs } from "./FormSource";
import NewUser from "./pages/new/NewUser";
import NewProduct from "./pages/new/NewProduct";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state?.user?.currentUser?.user?.isAdmin);
  let IsLoggedIn = false;
  if (admin) {
    IsLoggedIn = true;
  }
  console.log("IsLoggedIn", IsLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={IsLoggedIn ? <Home /> : <Login />} />
        <Route path="/users" element={IsLoggedIn ? <List /> : <Login />} />
        <Route path="/users/:userId" element={IsLoggedIn ? <SingleUser /> : <Login />} />
        <Route path="/products/:productId" element={IsLoggedIn ? <SingleProduct /> : <Login />} />
        <Route path="/users/new" element={IsLoggedIn ? <NewUser inputs={userInputs} /> : <Login />} />
        <Route path="/products" element={IsLoggedIn ? <List />  : <Login />} />
        <Route path="/products/new" element={IsLoggedIn ? <NewProduct inputs={productInputs} />  : <Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
