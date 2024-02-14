import React from "react";
import { database } from "../firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleUpdate(data) {
    try {
      if (database.currentUser) {
        await updateProfile(database.currentUser, {
          displayName: `${data.firstName} ${data.lastName}`,
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Account doesn't exist. To continue, create an account");
    }
  }

  async function handleLogout() {
    await signOut(database);
    dispatch(logout());
  }

  return (
    <div id="loginContainer">
      <h3>Update Profile to continue</h3>
      <div id="loginFormContainer">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <label>First Name</label>
          <input
            {...register("firstName", { required: true })}
            placeholder="Enter Your First Name"
            type="text"
          />
          {errors.firstName && <small>*This field is required</small>}
          <label>Last Name</label>
          <input
            {...register("lastName", { required: true })}
            placeholder="Enter Your Last Name"
            type="text"
          />
          {errors.lastName && <small>*This field is required</small>}
          <button>Update Profile</button>
        </form>
      </div>
      <div id="loginBottomContainer">
        <p>Not You?</p>
        <button
          style={{
            background: "none",
            color: "blue",
            textDecoration: "underline",
            cursor:"pointer",
            border: "none",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
