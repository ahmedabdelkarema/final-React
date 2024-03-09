import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
export default function CategoriesSlider() {
  let [categoreyList, setCatList] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    let req = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCatList(req.data.data);
  }
  return (
    <div>
      <OwlCarousel items={6} className="owl-theme" loop>
        {categoreyList.map((element) => {
          return (
            <div className="item_cat">
              <img src={element.image} height={250} alt="" />
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}
