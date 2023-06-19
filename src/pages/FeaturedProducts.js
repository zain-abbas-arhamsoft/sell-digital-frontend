import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
// import useActive from "../hooks/useActive";
import ProductCard from "../components/product/ProductCard";
// import FeaturedProductCard from "../components/product/FeaturedProductCard";

import { useEffect, useState, useContext } from "react";
import { Api } from "../utils/Api";
import { featuredProductEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";
const FeaturedProducts = () => {
  const [featuredproducts, setFeaturedProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  // const [searchedProducts, setSearchedProducts] = useState([]);
  // const [check, setCheck] = useState(0);
  const searchedProduct = useContext(commonContext);
  console.log("searchedProdutct Featured Products", searchedProduct);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const featuredProducts = async () => {
    console.log("featuredProductEndpoint", featuredProductEndpoint);
    const { statusCode, data } = await Api.getFeaturedProducts(
      featuredProductEndpoint,
      {}
    );
    console.log("featuredProducts...", data);
    if (statusCode === true) {
      setFeaturedProducts(data.categoriesData);
    }
  };
  useEffect(() => {
    featuredProducts();
  }, []);

  useEffect(() => {
    console.log("enter");
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      setFilteredProducts(
        searchedProduct.searchResults.filter(
          (item) => item.products.productTag === "Featured"
        )
      );
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length === 0 &&
      searchedProduct.isSearchOpen === true
    ) {
      console.log("else if");
      // setCheck(1);
      setFilteredProducts([]);
    }

    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      console.log("next if");
      setFilteredProducts(
        searchedProduct.searchResults.categoriesData.filter(
          (item) => item.products.productTag === "Featured"
        )
      );
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      console.log("next else");
      // setCheck(1);
      setFilteredProducts([]);
    }
    setSearchOpen(searchedProduct.isSearchOpen);
  }, [searchedProduct]);
  // useEffect(() => {
  //   if (searchedProduct.searchResults && searchedProduct.searchResults.length > 0) {
  //     // setSearchedProducts(searchedProduct.searchResults)
  //     setCheck(1);
  //     console.log("searchedProduct.......", searchedProduct);
  //     console.log(
  //       "searchedProduct.searchResults.......",
  //       searchedProduct.searchResults
  //     );
  //     setFilteredProducts(
  //       searchedProduct.searchResults.filter(
  //         (item) => item.products.productTag === "Featured"
  //       )
  //     );
  //   } else if (
  //     searchedProduct.searchResults.categoriesData &&
  //     searchedProduct.searchResults.categoriesData.length > 0
  //   ) {
  //     setFilteredProducts(
  //       searchedProduct.searchResults.categoriesData.filter(
  //         (item) => item.products.productTag === "Featured"
  //       )
  //     );
  //   } else {
  //     setFilteredProducts([]);
  //   }
  // }, [searchedProduct]);

  useEffect(() => {
    console.log("filteredProducts", filteredProducts);
  }, [filteredProducts]);
  return (
    <>
      <div className="wrapper products_wrapper">
        { searchOpen === true && filteredProducts.length === 0 ? (
          <></>
        ) : (
          <>
            {filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))
              : featuredproducts &&
                featuredproducts
                  .slice(0, 11)
                  .map((item) => <ProductCard key={item.id} {...item} />)}
          </>
        )}
        {(featuredproducts.length > 2 || filteredProducts.length > 2) && (
          <div className="card products_card browse_card">
            <Link to="/featured-products">
              Browse Featured <br /> Products <BsArrowRight />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedProducts;
