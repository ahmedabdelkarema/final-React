import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../userContext/cartContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";

export default function Home() {
  let { addCart, item, setItem } = useContext(CartContext);
  let [page, setPage] = useState(1);
  function getProductApi(queryData) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`
    );
  }
  let { isError, isLoading, isFetching, data, refetch } = useQuery(
    ["productApi", page],
    getProductApi,
    {}
  );

  function getPageNumber(event) {
    let page = event.target.getAttribute("pageNumber");
    setPage(page);
  }

  async function AddTrueCart(id) {
    let req = await addCart(id).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    });
    if (req?.data?.status == "success") {
      setItem((item) => item++);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    }
  }
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Products</title>
      </Helmet>
      <div className=" container-fluid mt-5 my-5 py-5">
        <div className="row g-3">
          {isLoading ? (
            <div className=" loading d-flex justify-content-center align-items-center bg-black position-fixed top-0 end-0 start-0 bottom-0">
              <span className="loader"></span>
            </div>
          ) : (
            data?.data.data.map((element) => {
              return (
                <div key={element.id} className=" col-md-3">
                  <div className="product p-3 rounded-3 cursor-pointer">
                    <Link to={"/ProductDetails/" + element.id}>
                      <img src={element.imageCover} alt="" className="w-100" />
                      <h6 className="text-main">{element.category.name}</h6>
                      <h5>{element.title.split(" ").slice(0, 2).join(" ")}</h5>
                      <div className=" d-flex justify-content-between">
                        <span>{element.price}EGP</span>
                        <span>
                          <i className=" fa-solid fa-star rating-color"></i>{" "}
                          {element.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        AddTrueCart(element.id);
                      }}
                      className="btn bg-main text-white d-block w-100"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
