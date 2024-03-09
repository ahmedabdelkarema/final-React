import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../userContext/cartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getUserCart, updateCart, removeCart, clareCart, setItem } =
    useContext(CartContext);
  let [cartData, setCartDAta] = useState(null);
  let [loding, setLoding] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setLoding(true);
    let req = await getUserCart().catch((err) => {
      if (err.response.data.statusMsg == "fail") {
        setCartDAta(null);
        setLoding(false);
      }
    });
    if (req?.data.status == "success") {
      setLoding(false);
      setCartDAta(req.data.data);
    }
  }
  async function removeItemCart(id) {
    let req = await removeCart(id);
    if (req?.data?.status == "success") {
      setItem(req.data.numOfCartItems);
      setCartDAta(req.data.data);
    }
  }
  async function clearData() {
    let req = await clareCart();
    if (req?.data?.message == "success") {
      cartData(null);
    }
  }
  async function updateCartItem(id, count) {
    if (count == 0) {
      removeItemCart(id);
    } else {
      let req = await updateCart(id, count);
      if (req?.data?.status == "success") {
        setCartDAta(req.data.data);
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Fresh Car | Wish</title>
      </Helmet>
      {loding ? (
        <>
          <div className=" loading d-flex justify-content-center align-items-center bg-black position-fixed top-0 end-0 start-0 bottom-0">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {cartData == null ? (
            <div className="alert alert-danger">Cart Empty</div>
          ) : (
            <div className=" container my-5 py-5">
              <button
                onClick={clearData}
                className="btn btn-danger btn-sm float-end"
              >
                Empty Cart
              </button>
              <div className=" clearfix"></div>
              {cartData.products.map((el) => {
                return (
                  <div className="row py-3 border-bottom border-3 align-items-center">
                    <div className=" col-md-10">
                      <div className="row align-items-center">
                        <div className=" col-md-1">
                          <img
                            src={el.product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className=" col-md-11">
                          <h6>{el.product.title}</h6>
                          <h5 className=" text-muted">Price: {el.price} EGP</h5>
                          <button
                            onClick={() => removeItemCart(el.product._id)}
                            className="btn  btn-danger btn-sm"
                          >
                            Remove <i className=" fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-2">
                      <Link to="/cart" className="btn bg-main mt-1">
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
