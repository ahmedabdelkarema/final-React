import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { UserConext } from "../userContext/userContext";
import { CartContext } from "../userContext/cartContext";
export default function Navbar() {
  let { item } = useContext(CartContext);
  let { userToken, data, setToken } = useContext(UserConext);
  let navegate = useNavigate();
  function Logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navegate("/login");
  }
  console.log(data);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            {" "}
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ? (
              <ul className="navbar-nav nav_center mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="product"
                  >
                    Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="wishList"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="brand">
                    Brand
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="categories"
                  >
                    Categoties
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              {userToken != null ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <div className=" position-relative">
                      <Link to={"cart"}>
                        <i className="nav-link fa-solid text-main fa-cart-shopping py-2"></i>
                      </Link>
                      <span className=" position-absolute top-0 end-0 translate-middle-y">
                        {item}
                      </span>
                    </div>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={Logout}>
                      {data?.name}Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link cursor-pointer" to="login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
