import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { database } from "../firebase";

export default function Header() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(database);
    dispatch(logout());
    navigate("/");
  }
  return (
    <header>
      <h4 style={{ marginLeft: "1px" }}>Welcome {user.displayName}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "white",
          }}
        >
          CountryLister
        </h1>
        <small
          style={{
            color: "white",
          }}
        >
          A place where you can view Countries and their data.
        </small>
      </div>

      <button id="headerBtn" onClick={handleLogout}>
        Log-out
      </button>
    </header>
  );
}
