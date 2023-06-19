import React, { useContext, useState, useEffect, useRef } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import FilterBar from "../components/filters/FilterBar";
import ProductCard from "../components/product/ProductCard";
import Services from "../components/common/Services";
import filtersContext from "../contexts/filters/filtersContext";
import EmptyView from "../components/common/EmptyView";
import { Api } from "../utils/Api";
import commonContext from "../contexts/common/commonContext";
import { getAllProductEndpoint } from "../utils/Endpoint";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [isResetComplete, setIsResetComplete] = useState(false);
  useDocTitle("All Products");
  const searchedProduct = useContext(commonContext);
  console.log("View AllProducts", searchedProduct);
  const handleResetProducts = () => {
    resetProducts();
    setIsResetComplete(true);
  };

  const resetProducts = () => {
    console.log("resetProducts");
    setCurrentPage(1);
    setProducts([]);
    // setFilteredProducts([]);
    setLoadMoreVisible(true);
  };

  useEffect(() => {
    console.log("searchopen...", searchOpen);
    console.log("loadMoreVisible...", loadMoreVisible);
    console.log("products...", products);
    console.log("filteredProducts...", filteredProducts);
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      console.log("IF...");
      setFilteredProducts(searchedProduct.searchResults);
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length === 0
    ) {
      console.log("ELSE");
      setFilteredProducts([]);
    }
    if (
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length > 0
    ) {
      console.log("NEXT IF");
      setFilteredProducts(searchedProduct.searchResults.categoriesData);
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ){
      console.log("NEXT ELSE");
      setFilteredProducts([]);
    }
    setSearchOpen(searchedProduct.isSearchOpen);
  }, [searchedProduct]);

  useEffect(() => {
    console.log("searchOpen...", searchOpen);
    console.log("products...", products);
    console.log("fp", filteredProducts);
    if (filteredProducts.length > 0) {
      if (searchOpen === true) {
        console.log("if");
        // setFilteredProducts(searchedProduct.searchResults);
      } else {
        console.log("else...");
        console.log("page...", currentPage);
        setIsResetComplete(false); // Reset the completion flag
        handleResetProducts();
      }
    }
    // else {
    //   console.log("else filtered");
    //   setFilteredProducts([]);
    // }
  }, [searchOpen]);

  useEffect(() => {
    console.log("filteredProducts?", filteredProducts);
    console.log("searchOpen?", searchOpen);
  }, [filteredProducts]);

  useEffect(() => {
    // Load products only if resetProducts() is complete
    if (isResetComplete) {
      console.log("fine");
      console.log("page???", currentPage);
      loadProducts();
    }
  }, [isResetComplete]);

  const loadProducts = async () => {
    console.log(
      "{getAllProductEndpoint}?${new URLSearchParams(queryParams)",
      `${getAllProductEndpoint}?page=${currentPage}`
    );
    try {
      const { statusCode, data } = await Api.getAllProducts(
        `${getAllProductEndpoint}?page=${currentPage}`,
        {}
      );
      if (statusCode === true) {
        console.log("data.categoriesData...", data.categoriesData);
        console.log("data.hasMore", data.hasMore);
        if (products.length === 0) {
          console.log("inital", products);
          setProducts(data.categoriesData);
        } else {
          console.log("after initial", products);
          setProducts((prevProducts) => [
            ...prevProducts,
            ...data.categoriesData,
          ]);
        }
        if (data.hasMore === true) {
          setCurrentPage((prevPage) => prevPage + 1);
          setHasMore(data.hasMore);
        } else {
          setLoadMoreVisible(false);
        }
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    console.log("searchOpen", searchOpen);
    loadProducts();
  }, []);

  useEffect(() => {
    console.log("products...", products);
  }, [products]);
  const handleLoadMore = () => {
    console.log("load more");
    console.log("currentPage", currentPage);
    console.log("handleLoadMore");
    loadProducts();
  };

  return (
    <>
      {/* <section id="all_products" className="section">
        <FilterBar /> */}
      <div className="container">
        {/* {filteredProducts.length>0 || products.length > 0 ? ( */}
        <div className="wrapper products_wrapper">
          {console.log("---", searchOpen, filteredProducts)}
          {filteredProducts.length > 0 && searchOpen
            ? filteredProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))
            : !searchOpen &&
              products.map((item) => <ProductCard key={item.id} {...item} />)}
        </div>
        {/* ) : (
          <EmptyView icon={<BsExclamationCircle />} msg="No Results Found" />
        )} */}
      </div>
      {/* </section> */}
      {/* {hasMore && <button onClick={loadProducts}>Load More</button>} */}
      {!searchOpen && loadMoreVisible && (
            <div style={{"display":"flex", "justify-content": "center", "margin": "40px"}}>
                <button onClick={handleLoadMore} className="btn">Load More</button>
            </div>
      )}
      {/* <Services /> */}
    </>
  );
};

export default AllProducts;
