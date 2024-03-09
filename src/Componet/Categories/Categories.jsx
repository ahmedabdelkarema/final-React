import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function Categories() {
  let [categoriesList, setcategoriesList] = useState([]);
  let [Loding, setLoding] = useState(true);
  useEffect(() => {
    getcategoriesdApi();
  }, []);
  async function getcategoriesdApi() {
    let req = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(req.data.data);
    setcategoriesList(req.data.data);
    setLoding(false);
  }
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Categories</title>
      </Helmet>
      <div className=" container my-5 py-5">
        <div className="row">
          <h1 className="text-main text-center pb-2">All Categories</h1>
          {categoriesList.map((el) => {
            return (
              <div className=" col-md-4 gx-3 mb-4">
                <div className="product cursor-pointer">
                  <img src={el.image} className="w-100" height={350} alt="" />
                  <h6 className="text-main text-center py-2">{el.name}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
