import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "../components/product/ProductCard";
import { useEffect, useState, useContext } from "react";
import { Api } from "../utils/Api";
import { featuredProductEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";

const FeaturedProducts = () => {
  const [state, setState] = useState({
    featuredProducts: [],
    filteredProducts: [],
    searchOpen: false,
  });
  const searchedProduct = useContext(commonContext);
  const featuredProductsRequest = async () => {
    const { statusCode, data } = await Api.getFeaturedProducts(
      featuredProductEndpoint,
      {}
    );
    if (statusCode === true) {
      setState((prevState) => ({
        ...prevState,
        featuredProducts: data.categoriesData,
      }));
    }
  };

  useEffect(() => {
    featuredProductsRequest();
  }, []);

  useEffect(() => {
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        filteredProducts: searchedProduct.searchResults.filter(
          (item) => item.products.productTag === "Featured"
        ),
      }));
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length === 0 &&
      searchedProduct.isSearchOpen === true
    ) {
      setState((prevState) => ({ ...prevState, filteredProducts: [] }));
    }
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        filteredProducts: searchedProduct.searchResults.categoriesData.filter(
          (item) => item.products.productTag === "Featured"
        ),
      }));
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      setState((prevState) => ({ ...prevState, filteredProducts: [] }));
    }
    setState((prevState) => ({
      ...prevState,
      searchOpen: searchedProduct.isSearchOpen,
    }));
  }, [searchedProduct]);

  const { featuredProducts, filteredProducts } = state;

  return (
    <>
      <div className="wrapper products_wrapper">
        <>
          {filteredProducts.length > 0
            ? filteredProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))
            : featuredProducts &&
              featuredProducts
                .slice(0, 11)
                .map((item) => <ProductCard key={item.id} {...item} />)}
        </>
        {filteredProducts.length >= 2 && (
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
