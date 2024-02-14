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
      <h3 style={{ color: "black" }}>
        Enter your details to Sign-Up with CountryLister{" "}
      </h3>
      <br></br>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("firstName", { required: true })}
            placeholder="Enter Your First Name"
            type="text"
          />
          <br></br>
          {errors.firstName && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("lastName", { required: true })}
            placeholder="Enter Your Last Name"
            type="text"
          />
          <br></br>
          {errors.lastName && <small>*This field is required</small>}
        </div>
        {/* <div>
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Enter Your Mobile Number"
            type="number"
          />
          <br></br>
          {errors.firstName && <small>*This field is required</small>}
        </div> */}

        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            type="email"
          />
          <br></br>
          {errors.email && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Enter Password"
            type="password"
          />
          <br></br>
          {errors.password && <small>*This field is required</small>}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Re-Enter Password"
            type="password"
          />
          <br></br>
          {errors.password && <small>*This field is required</small>}
        </div>
        <button>Sign-up</button>
      </form>
    </div>
  );
}
