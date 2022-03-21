// REACT
import React from "react";
import axios from "axios";
// FORM
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SimpleForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.post("http://localhost:8000/students", {
        name: `${values}`,
      });
    },
  });

  return (
    <div>
      <h1>Add Students</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your first name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <p>{formik.errors.name}</p> : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
