import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Countries from "./pages/Countries";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      {isLoggedIn ? (
        <React.Fragment>
          <Route path="/countries" element={<Countries />} />
          <Route path="*" element={<Navigate to={"/countries"} />} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </React.Fragment>
      )}
    </Routes>
  );
}

export default App;
