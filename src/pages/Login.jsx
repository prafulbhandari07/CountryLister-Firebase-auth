import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { database } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    try {
      const response = await signInWithEmailAndPassword(
        database,
        data.email,
        data.password
      );
      dispatch(login(response.user));
    } catch (error) {
      toast.error("Account doesn't exist. To continue, create an account");
    }
  }

  return (
    <div id="loginContainer">
      <big>Sign-in to CountryLister</big>
      <div id="loginFormContainer">
        <form onSubmit={handleSubmit(handleLogin)}>
          <label>Email Address</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your Email"
            type="email"
          />

          {errors.email && <small>*This field is required</small>}
          <label>Password</label>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
            type="password"
          />

          {errors.password && <small>*This field is required</small>}
          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <div id="loginBottomContainer">
        <p>New to CountryLister?</p>
        <a href="/signup">Create an account</a>
      </div>
    </div>
  );
}
