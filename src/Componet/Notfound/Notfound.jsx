import React from "react";
import Error from "../../images/error.svg";
import { Helmet } from "react-helmet";
export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Notfound</title>
      </Helmet>
      <img
        className="text-center width-100 my-5 py-5 offset-3"
        src={Error}
        alt=""
      />
    </>
  );
}
