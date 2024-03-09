import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserConext } from "../userContext/userContext";
import { CartContext } from "../userContext/cartContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setItem, getUserCart } = useContext(CartContext);
  let { setToken } = useContext(UserConext);
  let navg = useNavigate();
  let [errMsg, setErr] = useState("");
  let [Loding, setLoding] = useState(true);
  let validation = Yup.object({
    email: Yup.string().required("Email Required").email("Enter valid Email"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/, "Enter Valid Password")
      .required("Password Required"),
  });
  let form1 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    validationSchema: validation,
  });
  async function LoginApi(val) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", val)
      .catch((err) => {
        setErr = err.response.data.message;
        setLoding(true);
      });
    if (req?.data?.message == "success") {
      setLoding(true);
      localStorage.setItem("userToken", req.data.token);
      setToken(req.data.token);
      getUserData();
      navg("/home");
    }
  }
  async function getUserData() {
    let req = await getUserCart().catch((err) => {});
    if (req?.data?.status == "success") {
      setItem(req.data.numOfCartItems);
    }
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Login</title>
      </Helmet>
      <div className="container my-5 py-5">
        <h2>Login Now.......</h2>
        {errMsg != "" ? <div className="alert alert-danger">{errMsg}</div> : ""}
        <form onClick={form1.handleSubmit}>
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

          <div>
            {Loding ? (
              <button
                disabled={!(form1.isValid && form1.dirty)}
                type="submit"
                className="btn bg-main text-white"
              >
                Login
              </button>
            ) : (
              <button type="button" className="btn bg-main text-white">
                {" "}
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            )}
          </div>
          <br />
        </form>
        <Link to="/forgetbassord" className="cursor-pointer">
          Forget Passowrd....?
        </Link>
      </div>
    </>
  );
}
