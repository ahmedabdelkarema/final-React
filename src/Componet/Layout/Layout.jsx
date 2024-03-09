import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { CartContext } from "../userContext/cartContext";

export default function Layout() {
  return (
    <>
      <div>
        <Navbar />
        <div className=" container">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
}
