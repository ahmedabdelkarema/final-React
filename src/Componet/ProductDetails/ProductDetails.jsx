import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../userContext/cartContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { addCart, setItem } = useContext(CartContext);
  let prams = useParams();
  let [prodectId, setProductID] = useState();
  useEffect(() => {
    setProductID(prams.id);
  }, []);
  function setImges(e) {
    let imgs = document.querySelectorAll(".imgs");
    imgs.forEach((el) => {
      el.addEventListener("click", function (e) {
        let imgPath = e.target.getAttribute("src");
        document.getElementById("myImage")?.setAttribute("src", imgPath);
      });
    });
  }

  async function addToCart(id) {
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
    if (req.data.status == "success") {
      setItem(req.data.numOfCartItems);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    }
  }

  let { data, isLoading } = useQuery(
    ["productDetails", prodectId],
    getPrudctDetails
  );
  function getPrudctDetails(query) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`
    );
  }
  return (
    <>
      <Helmet>
        <title>Fresh Cart | ProductDitails </title>
      </Helmet>
      {isLoading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-black position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <div className=" container py-5">
          <div className="row align-items-center">
            <div className=" col-md-3">
              <div className="row g-0 align-items-center">
                <div className=" col-md-2">
                  {data?.data.data.images.map((element) => {
                    return (
                      <img
                        src={element}
                        onClick={setImges}
                        className=" w-100 imgs"
                        alt=""
                      />
                    );
                  })}
                </div>
                <div className=" col-md-10">
                  <img
                    src={data?.data.data.imageCover}
                    id="myImage"
                    className=" w-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className=" col-md-9">
              <h2>{data?.data.data.title}</h2>
              <p className=" text-muted my-3">{data?.data.data.description}</p>
              <h6 className="text-main">{data?.data.data.category.name}</h6>
              <div className=" d-flex justify-content-between">
                <span>{data?.data.data.price} EGP</span>
                <span>
                  <i className=" fa-solid fa-star rating-color"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addToCart(data?.data.data.id)}
                className="btn bg-main text-white d-block cursor-pointer my-3 w-75"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
