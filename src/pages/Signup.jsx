import React from "react";
import { useForm } from "react-hook-form";
import { database } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
      toast.success("Account Creation Successful. You can login now.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div id="signupContainer">
      <big>Sign up with CountryLister</big>
      <div id="loginFormContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label>Email Address</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            type="email"
          />
          {errors.email && <small>*This field is required</small>}
          <label>Password</label>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Password"
            type="password"
          />

          {errors.password && <small>*This field is required</small>}
          <label>Re-enter Password</label>
          <input
            {...register("reenterPassword", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            placeholder="Re-Enter Password"
            type="password"
          />
          {errors.reenterPassword && (
            <small>{errors.reenterPassword.message}</small>
          )}

          <div>
            <button>Sign-up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
