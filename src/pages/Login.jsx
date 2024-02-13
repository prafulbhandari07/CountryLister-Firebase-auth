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
      toast.error(error.message);
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          width: "20%",
          height: "40%",
          display: "flex",
          gap: "1rem",
          border: "1px solid black",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        {" "}
        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
          />
          {errors.email && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <small>*This field is required</small>}
        </div>
        <input type="submit" />
        <div>
          <a href="/signup">Create Account.</a>
        </div>
      </form>
    </div>
  );
}
