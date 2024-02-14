import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Countries from "./pages/Countries";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const [isLoggedIn, user] = useSelector((state) => [
    state.auth.isLoggedIn,
    state.auth.user,
  ]);

  return (
    <Routes>
      {isLoggedIn && user?.displayName.trim() ? (
        <React.Fragment>
          <Route path="/" element={<Countries />} />
          <Route path="*" element={<Navigate to="/" />} />
        </React.Fragment>
      ) : isLoggedIn && !user?.displayName.trim() ? (
        <React.Fragment>
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="*" element={<Navigate to="/update-profile" />} />
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
