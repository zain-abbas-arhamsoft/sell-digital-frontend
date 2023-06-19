import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useActive from "../hooks/useActive";
import ProductCard from "../components/product/ProductCard";
import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { getAllProductEndpoint } from "../utils/Endpoint";
import commonContext from "../contexts/common/commonContext";
import { useContext } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  // const [check, setCheck] = useState(0);
  const searchedProduct = useContext(commonContext);
  console.log("searchedProdutct AllProducts", searchedProduct);

  const getAllProducts = async () => {
    console.log("getAllProductEndpoint", getAllProductEndpoint);
    const { statusCode, data } = await Api.getAllProducts(
      getAllProductEndpoint,
      {}
    );
    console.log("View all data...", data.categoriesData);
    if (statusCode === true) {
      setProducts(data.categoriesData);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      setFilteredProducts(searchedProduct.searchResults);
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length === 0
    ) {
      // setCheck(1);
      setFilteredProducts([]);
    }

    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      setFilteredProducts(searchedProduct.searchResults.categoriesData);
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      // setCheck(1);
      setFilteredProducts([]);
    }
    setSearchOpen(searchedProduct.isSearchOpen);
  }, [searchedProduct]);

  // useEffect(() => {
  //   console.log("search", searchedProduct);
  //   if (
  //     searchedProduct.searchResults &&
  //     searchedProduct.searchResults.length > 0
  //   ) {
  //     setCheck(1);
  //     console.log("searchedProduct.......", searchedProduct);
  //     console.log(
  //       "searchedProduct.searchResults.......",
  //       searchedProduct.searchResults
  //     );
  //     setFilteredProducts(searchedProduct.searchResults);
  //   } else {
  //     console.log("else search");
  //     setFilteredProducts([]);
  //   }
  //   if (
  //     searchedProduct.searchResults.categoriesData &&
  //     searchedProduct.searchResults.categoriesData.length > 0
  //   ) {
  //     console.log("next if");
  //     setFilteredProducts(searchedProduct.searchResults.categoriesData);
  //   } else {
  //     setFilteredProducts([]);
  //   }
  // }, [searchedProduct]);

  useEffect(() => {
    console.log("products", products);
    console.log("filteredProducts", filteredProducts);
  }, [products]);
  return (
    <>
      <div className="wrapper products_wrapper">
        {searchOpen === true && filteredProducts.length === 0 ? (
          <></>
        ) : (
          <>
            {filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))
              : products &&
                products
                  .slice(0, 9)
                  .map((item) => <ProductCard key={item.id} {...item} />)}
          </>
        )}
        {filteredProducts.length > 7 || products.length > 7 ? (
          <div className="card products_card browse_card">
            <Link to="/all-products">
              Browse All <br /> Products <BsArrowRight />
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AllProducts;
