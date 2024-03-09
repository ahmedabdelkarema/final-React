import { useFormik } from "formik";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../userContext/cartContext";
export default function Checkout() {
  let { CheckOutPayemebt } = useContext(CartContext);
  let data = useParams();
  let validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone Riquerd")
      .matches(/^01[0125][0-9]{8}$/, "Enter Valid Phone"),
    city: Yup.string()
      .required("City Riquired")
      .matches(/^[\w-]{3,}$/, "Enter Valid City"),
    details: Yup.string()
      .required("Details Riquired")
      .matches(/^[\w-]{3,}$/, "Enter Valid Details"),
  });
  let formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    onSubmit: payment,
    validationSchema,
  });
  async function payment(val) {
    let req = await CheckOutPayemebt(data.id, val);
    if (req.data.status == "success") {
      window.open(req.data.session.url, "_self");
    }
  }
  return (
    <div className="w-75 mx-auto my-5 py-5">
      <form onSubmit={formik.handleSubmit}>
        <div className=" mb-3">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className=" form-control"
            placeholder="Enter your City"
            name="city"
          />
          {formik.touched.city && formik.errors.city ? (
            <p className=" text-danger">{formik.errors.city}</p>
          ) : (
            ""
          )}
        </div>

        <div className=" mb-3">
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" form-control"
            placeholder="Enter your Details"
            name="details"
          ></textarea>
          {formik.touched.details && formik.errors.details ? (
            <p className=" text-danger">{formik.errors.details}</p>
          ) : (
            ""
          )}
        </div>

        <div className=" mb-3">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            className=" form-control"
            placeholder="Enter your Phone"
            name="phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className=" text-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white d-block w-100"
        >
          Pay <i className=" fa-brands fa-cc-visa"></i>
        </button>
      </form>
    </div>
  );
}
