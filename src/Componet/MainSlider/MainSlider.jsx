import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import $ from "jquery";
import img1 from "../../images/grocery-banner-2.jpeg";
import img2 from "../../images/grocery-banner.png";
import img3 from "../../images/side-1.jpg";
import img4 from "../../images/side-2.jpg";
import img5 from "../../images/blog-img-2.jpeg";
export default function MainSlider() {
  return (
    <div className="row g-0 mt-5 mb-5 ">
      <div className="col-md-9">
        <OwlCarousel items={1} className="owl-theme" loop>
          <div className="item ">
            <img src={img1} className="w-100" height={500} alt="" />
          </div>
          <div className="item">
            <img src={img2} className="w-100" height={500} alt="" />
          </div>
          <div className="item">
            <img src={img5} className="w-100" height={500} alt="" />
          </div>
        </OwlCarousel>
      </div>
      <div className="col-md-3">
        <img src={img3} className="w-100" height={250} alt="" />
        <img src={img4} className="w-100" height={250} alt="" />
      </div>
    </div>
  );
}
