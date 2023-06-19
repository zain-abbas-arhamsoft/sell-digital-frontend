import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
// import { displayMoney } from '../../helpers/utils';
import productsData from "../../data/productsData";
import { getAllProductEndpoint } from "../../utils/Endpoint";
import { Api } from "../../utils/Api";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "./image1.jpg";
import img2 from "./image2.jpg";
import img3 from "./image3.jpg";
import img4 from "./image4.jpg";
import img6 from "./img6.png";


import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "./HeroSlider.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const slides = [
  { image: img1, type: 'youtube' },
  { image: img2, type: 'facebook' },
  { image: img3, type: 'instagram' },
  { image: img4, type: 'tiktok' },

];

const HeroSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [backcolor, setbackcolor] = useState();
  const [carousel, setCarousel] = useState([]);

  const getImageCarousel = async () => {
    const { statusCode, data } = await Api.getAllProducts(
      getAllProductEndpoint,
      {}
    );
    console.log("carousel data", data);
    if (statusCode === true) {
      setCarousel(data?.categoriesData);
    }
  };
  useEffect(() => {
    getImageCarousel();
  }, []);

  useEffect(() => {
    console.log("carousel...", carousel);
  }, [carousel]);
  const heroProducts = productsData.filter(
    (item) => item.tag === "hero-product"
  );

  return (
    // <Swiper
    //     modules={[Pagination, A11y, Autoplay]}
    //     loop={true}
    //     speed={400}
    //     spaceBetween={100}
    //     slidesPerView={1}
    //     pagination={{ clickable: true }}
    //     autoplay={{
    //         delay: 4000,
    //         disableOnInteraction: false,
    //     }}
    // >
    //     {
    //        carousel && carousel.map((item, i) => {
    //             console.log('item',item)
    //             const {name} = item;
    //             const { id, title, tagline, productImage, productPrice, originalPrice, path,productName } = item.products;
    //             // const newPrice = displayMoney(finalPrice);
    //             // const oldPrice = displayMoney(originalPrice);
    //             return (
    //                 <SwiperSlide
    //                     key={id}
    //                     className={`wrapper hero_wrapper hero_slide-${i}`}
    //                 >
    //                     <div className="hero_item_txt">
    //                         <h3>{name}</h3>
    //                         <h1>{productName}</h1>
    //                         <h2 className="hero_price">
    //                             {productPrice} &nbsp;
    //                             <small><del>{Number(productPrice) +100}</del></small>
    //                         </h2>
    //                         <Link to={`${path}${id}`} className="btn">Shop Now</Link>
    //                     </div>
    //                     <figure className="hero_item_img">
    //                         {/* <img src={productImage[0]} alt="product-img" /> */}
    //                         <img src={`http://localhost:8083/images/${productImage[0]}`} alt='img' width={"100px"} height={"150px"}/>
    //                     </figure>
    //                 </SwiperSlide>
    //             );
    //         })
    //     }
    // </Swiper>

    <>
      <div className="slider-container">
        <div className="first-half1">
          <div className="first-half-content">
            <h2 style={{ "font-size": "70px", color: "#ad0000" }}>
              Sell Digital
            </h2>
            <small
              style={{
                "font-size": "41px",
                "font-weight": "700",
                "margin-top": "10px",
              }}
            >
              Digital Account Marketplace
            </small>
            <ul className="bullet-list">
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                100% verified Accounts
              </li>
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                Secure transactions
              </li>
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                Fast Delivery
              </li>
            </ul>

            <div className="heroSilder-buttons">
              <button type="submit" className="red-button">
                Know More
              </button>
              <button className="blue-button" onClick={""}>
                Join Now
              </button>
            </div>
          </div>
        </div>

        <div className={` second-half`} >
          <div className={`myclass social-account-color ${slides[currentSlideIndex].type}`}>
            <div className="small-slider" style={{ marginLeft: "-50px" }}>
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
                onChange={slideIndex => setCurrentSlideIndex(slideIndex)}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div
              className="small-slider"
              style={{ marginLeft: "auto", marginRight: "-50px" }}
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="small-slider" style={{ marginLeft: "-50px" }}>
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
