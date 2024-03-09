import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ResetPassword() {
  let [errMsg, setErr] = useState("");
  let nav = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter valid Email"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,
        "Enter Valid newPassword"
      )
      .required("newPassword Required"),
  });
  let form = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPasswordApi,
    validationSchema,
  });
  async function resetPasswordApi(val) {
    let req = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", val)
      .catch((err) => {
        setErr = err.response.data.message;
      });
    if (req.data.token) {
      nav("/login");
    }
  }
  return (
    <div>
      <h2>ResetPassword.....</h2>

      <form className="mt-5" onClick={form.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email :</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            className="form-control"
            type="email"
            name="email"
            id="email"
          />
          {form.errors.email && form.touched.email ? (
            <div className="alert alert-danger">{form.errors.email}</div>
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword">NewPassword :</label>
          <input
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            className="form-control"
            type="password"
            name="newPassword"
            id="newPassword"
          />
          {form.errors.newPassword && form.touched.newPassword ? (
            <div className="alert alert-danger">{form.errors.newPassword}</div>
          ) : (
            ""
          )}
        </div>
        <div>
          <button
            disabled={!(form.isValid && form.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            Updatet Password
          </button>
        </div>
      </form>
    </div>
  );
}
