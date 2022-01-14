import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./assets/css/index.css";

export default function App() {
  // Reference: https://stackoverflow.com/questions/68647891/check-if-logged-in-react-router-redirect
  const [auth, setAuth] = useState(true);
  // const requireAuth = async () => {
  //   return await axios
  //     .get("http://localhost:5000/users/isloggedin")
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // };
  // requireAuth().then((res) => {
  //   setAuth(res);
  // });
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={auth ? <Navigate to="/dashboard" replace={true} /> : <Navigate to="/login" replace={true} />} />
          <Route path="/dashboard/*" element={auth ? <Dashboard /> : <Navigate to="/login" replace={true} />} />
          <Route path="/login" element={auth ? <Navigate to="/dashboard" replace={true} /> : <Login />} />
          <Route path="/register/*" element={auth ? <Navigate to="/dashboard" replace={true} /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
