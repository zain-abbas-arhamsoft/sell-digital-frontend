import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import cartContext from "../contexts/cart/cartContext";
import SectionsHead from "../components/common/SectionsHead";
import Services from "../components/common/Services";
import { Api } from "../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  productDetailEndpoint,
  relatedProductDetailEndpoint,
  addCartItem,
  showCarts,
} from "../utils/Endpoint";
import RelatedProductCard from "../components/product/RelatedProductCard";
const ProductDetails = () => {
  useDocTitle("Product Details");
  const [productDetail, setProductDetail] = useState({});
  const [relatedProductDetail, setRelatedProductDetail] = useState([]);
  const [image, setImage] = useState([]);
  const { cartsLength } = useContext(cartContext);
  const {  handleActive, activeClass } = useActive(false);
  const { productID } = useParams();
  console.log('productID params',productID)
  const [previewImg, setPreviewImg] = useState(image[0]);

  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      cartsLength(data.cartCount);
    }
  };
  // handling Add-to-cart
  const handleAddItem = async (productDetail) => {
    if (!localStorage.getItem("E_COMMERCE_TOKEN")) {
      toast.error("please login to add item in cart");
      return;
    }
    handleActive(productDetail._id);
    setTimeout(() => {
      handleActive(false);
    }, 3000);
    const { statusCode } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        ...productDetail,
        quantity: 1, // Set the desired quantity value
      },
    });
    if (statusCode === true) {
      calculateCartItems();
    }
  };

  // setting the very-first image on re-render
  useEffect(() => {
    setPreviewImg(image[0]);
    handleActive(0);
  }, [image]);

  // // handling Preview image
  const handlePreviewImg = (i) => {
    setPreviewImg(image[i]);
    handleActive(i);
  };

  const getProductDetails = async () => {
    const { statusCode, data } = await Api.getProductDetail(
      `${productDetailEndpoint}${productID}`,
      {}
    );
    if (statusCode === true) {
      setProductDetail(data);
      setImage(data?.image);
      getRelatedProducts();
    }
  };
  const getRelatedProducts = async () => {
    const categoryId = productDetail.categoryId?._id;
    console.log('categoryId',categoryId)
    const productId = productDetail?._id;
    console.log('productId',productId)
    const { statusCode, data } = await Api.getRelatedDetail(
      relatedProductDetailEndpoint,
      {
        categoryId,
        productId,
      }
    );
    console.log('data',data)
    if (statusCode === true) {
      setRelatedProductDetail(data);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [productID]);
  // useEffect(() => {
  //   getRelatedProducts();
  // }, []);
  return (
    <>
      <section id="product_details">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <div className="prod_details_tabs">
                {image &&
                  image.map((img, i) => (
                    <div
                      key={i}
                      className={`tabs_item ${activeClass(i)}`}
                      onClick={() => handlePreviewImg(i)}
                    >
                      <img src={img} alt="product-img" />
                    </div>
                  ))}
              </div>
              <figure className="prod_details_img">
                <img src={previewImg} alt="product-img" />
              </figure>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{productDetail.title}</h1>
              <p className="prod_details_info">{productDetail.description}</p>

              <div className="prod_details_ratings">
                <h3>{productDetail.followers / 1000}K Followers</h3>
              </div>

              <div className="separator"></div>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">
                    {productDetail.price} &nbsp;
                    <small className="del_price">
                      <del>{productDetail.price + 100}</del>
                      {` PKR`}
                    </small>
                  </h2>
                  {/* <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p> */}
                  <span className="tax_txt">(Inclusive of all taxes)</span>
                </div>

                <div className="badge">
                  <span>
                    <IoMdCheckmark /> In Stock
                  </span>
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_offers">
                <h4>Offers and Discounts</h4>
                <br />
                <small>100Rs Discount on this Product</small>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                <button
                  type="button"
                  // className="btn"
                  className={`btn products_btn ${activeClass(
                    productDetail._id
                  )}`}
                  onClick={() => {
                    handleAddItem(productDetail);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="related_products" className="section">
        <div className="container">
          <SectionsHead heading="Related Products" />
          <div className="wrapper products_wrapper">
            {relatedProductDetail.length > 0 &&
              relatedProductDetail.map((item) => (
                <RelatedProductCard key={item.id} {...item} />
              ))}
          </div>
        </div>
      </section>

      <Services />
    </>
  );
};

export default ProductDetails;
