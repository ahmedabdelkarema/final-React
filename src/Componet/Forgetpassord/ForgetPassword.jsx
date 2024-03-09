import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserConext } from "../userContext/userContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Login() {
  let { setToken } = useContext(UserConext);
  let navg = useNavigate();
  let [errMsg, setErr] = useState("");
  let [formStats, setForm] = useState(true);
  let validation = Yup.object({
    email: Yup.string().required("Email Required").email("Enter valid Email"),
  });
  let validation_2 = Yup.object({
    resetCode: Yup.string()
      .required("resetCode Required")
      .matches(/^[0-9]{5,6}$/, "Enter Valid Code "),
  });

  let form1 = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: ForgetPassword,
    validationSchema: validation,
  });

  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: vriefyresetCode,
    validationSchema: validation_2,
  });

  async function ForgetPassword(val) {
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", val)
      .catch((err) => {
        setErr = err.response.data.message;
      });
    if (req.data.statusMsg == "success") {
      setForm(false);
    }
  }

  async function vriefyresetCode(val) {
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", val)
      .catch((err) => {
        setErr(err.response.data.message);
      });
    if (req.data.status == "Success") {
      navg("/ResetPassword");
    }
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Forget </title>
      </Helmet>
      <div>
        {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
        {formStats ? (
          <form onClick={form1.handleSubmit}>
            <div className="mb-3 my-5 py-5">
              <label htmlFor="email">Enter Your Email</label>
              <input
                onBlur={form1.handleBlur}
                onChange={form1.handleChange}
                className="form-control"
                type="email"
                name="email"
                id="email"
              />
              <br />
              <button className="btn bg-main text-white" type="submit">
                Send
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={formik2.handleSubmit}>
            <div className="mb-3 my-5 py-5">
              <label htmlFor="resetCode">Enter Reset Code</label>
              <input
                value={formik2.values.resetCode}
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                className="form-control"
                type="resetCode"
                name="resetCode"
                id="resetCode"
              />
              {formik2.errors.resetCode && formik2.touched.resetCode ? (
                <div className=" alert alert-danger">
                  {formik2.errors.resetCode}
                </div>
              ) : (
                ""
              )}
              <br />
              <button className="btn bg-main text-white" type="submit">
                Vriefy Code
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
