// REACT
import React from "react";
import axios from "axios";
// CONTEXT
// import { UserContext } from "../context/UserContext";
// ROUTER
// import { useHistory } from "react-router-dom";
// FORMIK - YUP
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Form() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      surname: "",
      birthDate: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      surname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      birthDate: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      //   axios.post("http://localhost:8000/signup", {
      //     values,
      //   });
    },
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center col">
      <div className="col-3">
        <h1 className="text-center">Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Type your email..."
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? <span>Please enter an email.</span> : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Type your password..."
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <span>Please enter a password.</span>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm your password..."
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.password ? <span>Confirm your password</span> : null}
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              placeholder="Type your first name..."
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.errors.firstName ? (
              <span>Please enter a first name.</span>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Surname</label>
            <input
              id="surname"
              name="surname"
              type="text"
              className="form-control"
              placeholder="Type your surname..."
              onChange={formik.handleChange}
              value={formik.values.surname}
            />
            {formik.errors.surname ? (
              <span>Please enter a surname.</span>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Birth Date</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.birthDate}
            />
            {formik.errors.birthDate ? (
              <span>Please enter a birth date.</span>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
