import React from "react";
import { useForm } from "react-hook-form";
import { database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
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
      await updateProfile(response.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      dispatch(login(response.user));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("firstName", { required: true })}
            placeholder="Enter Your First Name"
            type="text"
          />
          {errors.firstName && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("lastName", { required: true })}
            placeholder="Enter Your Last Name"
            type="text"
          />
          {errors.lastName && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Enter Your Mobile Number"
            type="number"
          />
          {errors.firstName && <small>*This field is required</small>}
        </div>

        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            type="email"
          />
          {errors.email && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Password"
            type="password"
          />
          {errors.password && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Re-Enter Password"
            type="password"
          />
          {errors.password && <small>*This field is required</small>}
        </div>
        <button onClick={onSubmit}>Sign-up</button>
      </form>
    </div>
  );
}
