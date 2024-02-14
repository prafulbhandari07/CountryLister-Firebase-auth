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
      <h4>Welcome User. Log-in to continue.</h4>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your Email"
            type="email"
          />
          <br></br>
          {errors.email && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
            type="password"
          />
          <br></br>
          {errors.password && <small>*This field is required</small>}
        </div>
        <button type="submit">Log-in</button>

        <h4>Don't Have an Account? </h4>
        <a href="/signup">Create Account.</a>
      </form>
    </div>
  );
}
