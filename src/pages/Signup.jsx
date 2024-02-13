import React from "react";
import { useForm } from "react-hook-form";
import { database } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        database,
        data.email,
        data.password
      );
      dispatch(login(response.user))
    } catch (error) {}
    console.log(data);
  };
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
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </form>
    </div>
  );
}
