import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { database } from "../firebase";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(database)
    dispatch(logout());
    navigate("/");
  }
  return (
    <header>
      <p>Welcome User</p>
      <button id="headerBtn" onClick={handleLogout}>
        Log-out
      </button>
    </header>
  );
}
