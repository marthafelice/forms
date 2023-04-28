import React from "react";
import "../App.css";
import { useFormik } from "formik";
// import axios from "axios";
export default function ContactForm() {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const onSubmit = (values) => {
    
    fetch(
      "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Handle successful response
          alert("Message submitted successfully");
        } else {
          // Handle error response
          alert("Error submitting Message");
        }
      })
      .then((data) => {
        console.log("Response data:", values);
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error submitting inquiry", error);
      });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[a\-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
        values.email
      )
    ) {
      errors.email = "invalid email format";
    }

    if (!values.message) {
      errors.message = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="main-container">

      <div className="header">
        <h1 >Contact Us</h1>
        <p>Please fill this form to contact us</p>
      </div>
      <div className="form-container">
      <form onSubmit={formik.handleSubmit} id="form">
        {/* name */}
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errors">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* email */}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errors">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* subject */}
        <div className="form-control">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
        </div>

        {/* message*/}
        <div className="form-control">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="meassage"
            cols="30"
            rows="10"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <div className="errors">{formik.errors.message}</div>
          ) : null}
        </div>
       <div className="button">
        <button type="submit" >Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}
