import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function Brands() {
  let [brandList, setBrandList] = useState([]);
  let [Loding, setLoding] = useState(true);
  useEffect(() => {
    getBrandApi();
  }, []);
  async function getBrandApi() {
    let req = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    console.log(req.data.data);
    setBrandList(req.data.data);
    setLoding(false);
  }
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Brands</title>
      </Helmet>
      <div className=" container my-5 py-5">
        <div className="row">
          <h1 className="text-main text-center pb-2">All Brands</h1>
          {brandList.map((el) => {
            return (
              <div className=" col-md-3">
                <div className="product cursor-pointer">
                  <img src={el.image} className="w-100" alt="" />
                  <h6 className="text-main text-center">{el.name}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
