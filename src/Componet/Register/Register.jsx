import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navg = useNavigate();
  let [errMsg, setErr] = useState("");
  let [Loding, setLoding] = useState(true);

  let validation = Yup.object({
    name: Yup.string()
      .min(3, "min  char 3")
      .max(20, "max char 20")
      .required("Name Required"),
    email: Yup.string().email("Enter valid Email").required("Email Required"),
    phone: Yup.string()
      .matches(/^01[1025][0-9]{8}$/, "Enter Valid Phone")
      .required("Phone Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/, "Enter Valid Password")
      .required("Password Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "confirm Password Not Match")
      .required("Password Required"),
  });
  let form1 = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: registerAi,
  });
  async function registerAi(value) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .catch(function (err) {
        setErr(err.response.data.message);
        setLoding(true);
      });
    if (req?.data.message == "success") {
      setLoding(true);
      navg("/login");
    }
  }

  return (
    <>
      <div className="container my-5 py-5">
        <h2>Rigester Now.......</h2>
        {errMsg != "" ? <div className="alert alert-danger">{errMsg}</div> : ""}
        <form onClick={form1.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              onBlur={form1.handleBlur}
              onChange={form1.handleChange}
              className="form-control"
              type="text"
              name="name"
              id="name"
            />
            {form1.errors.name && form1.touched.name ? (
              <div className="alert alert-danger">{form1.errors.name}</div>
            ) : (
              ""
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              onBlur={form1.handleBlur}
              onChange={form1.handleChange}
              className="form-control"
              type="email"
              name="email"
              id="email"
            />
            {form1.errors.email && form1.touched.email ? (
              <div className="alert alert-danger">{form1.errors.email}</div>
            ) : (
              ""
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              onBlur={form1.handleBlur}
              onChange={form1.handleChange}
              className="form-control"
              type="password"
              name="password"
              id="password"
            />
            {form1.errors.password && form1.touched.password ? (
              <div className="alert alert-danger">{form1.errors.password}</div>
            ) : (
              ""
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="rePassword">rePassword</label>
            <input
              onBlur={form1.handleBlur}
              onChange={form1.handleChange}
              className="form-control"
              type="password"
              name="rePassword"
              id="rePassword"
            />
            {form1.errors.rePassword && form1.touched.rePassword ? (
              <div className="alert alert-danger">
                {form1.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              onBlur={form1.handleBlur}
              onChange={form1.handleChange}
              className={
                form1.errors.phone && form1.touched.phone
                  ? "form-control is-invalid"
                  : "form-control is-valid"
              }
              type="tel"
              name="phone"
              id="phone"
            />
            {form1.errors.phone && form1.touched.phone ? (
              <div className="alert alert-danger">{form1.errors.phone}</div>
            ) : (
              ""
            )}
          </div>

          <div>
            {Loding ? (
              <button
                disabled={!(form1.isValid && form1.dirty)}
                type="submit"
                className="btn bg-main text-white"
              >
                Rigester
              </button>
            ) : (
              <button type="button" className="btn bg-main text-white">
                {" "}
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
