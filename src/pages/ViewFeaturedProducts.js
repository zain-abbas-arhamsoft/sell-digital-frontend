import React, { useContext, useState, useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import useDocTitle from "../hooks/useDocTitle";
import FilterBar from "../components/filters/FilterBar";
import ProductCard from "../components/product/ProductCard";
import Services from "../components/common/Services";
import filtersContext from "../contexts/filters/filtersContext";
import EmptyView from "../components/common/EmptyView";
import { Api } from "../utils/Api";
import commonContext from "../contexts/common/commonContext";
import { featuredProductEndpoint } from "../utils/Endpoint";

// import FeaturedProductCard from "../components/product/FeaturedProductCard";
const ViewfeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [isResetComplete, setIsResetComplete] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [check, setCheck] = useState(0);

  useDocTitle("All Products");
  const searchedProduct = useContext(commonContext);
  console.log("View searchedProduct...", searchedProduct);

  const handleResetProducts = () => {
    resetProducts();
    setIsResetComplete(true);
  };
  const resetProducts = () => {
    console.log("resetProducts");
    setCurrentPage(1);
    setFeaturedProducts([]);
    // setFilteredProducts([]);
    setLoadMoreVisible(true);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    console.log("searchopen...", searchOpen);
    console.log("loadMoreVisible...", loadMoreVisible);
    console.log("featuredProducts", featuredProducts);
    if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.length > 0
    ) {
      console.log("IF...");
      // setFilteredProducts(searchedProduct.searchResults);
      setFilteredProducts(
        searchedProduct.searchResults.filter((item) => item.products.productTag === "Featured")
      );
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
      setFilteredProducts(
        searchedProduct.searchResults.categoriesData.filter((item) => item.products.productTag === "Featured")
      );
      // setFilteredProducts(searchedProduct.searchResults.categoriesData);
    } else if (
      searchedProduct.searchResults &&
      searchedProduct.searchResults.categoriesData &&
      searchedProduct.searchResults.categoriesData.length === 0
    ) {
      console.log("NEXT ELSE");
      setFilteredProducts([]);
    }
    setSearchOpen(searchedProduct.isSearchOpen);
  }, [searchedProduct]);

  useEffect(() => {
    console.log("searchOpen...", searchOpen);
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
    console.log("featuredProducts?", featuredProducts);
    console.log("searchOpen?", searchOpen);
  }, [featuredProducts]);

  useEffect(() => {
    // Load products only if resetProducts() is complete
    if (isResetComplete) {
      console.log("page???", currentPage);
      loadProducts();
    }
  }, [isResetComplete]);

  const loadProducts = async () => {
    console.log(`${featuredProductEndpoint}?page=${currentPage}`);
    console.log(
      "{getAllProductEndpoint}?${new URLSearchParams(queryParams)",
      `${featuredProductEndpoint}?page=${currentPage}`
    );
    try {
      const { statusCode, data } = await Api.getFeaturedProducts(
        `${featuredProductEndpoint}?page=${currentPage}`,
        {}
      );
      if (statusCode === true) {
        console.log("data", data);
        console.log("data.categoriesData...", data.categoriesData);
        console.log("data.hasMore...", data.hasMore);
        if (featuredProducts.length === 0) {
          console.log("inital", featuredProducts);
          setFeaturedProducts(data.categoriesData);
        } else {
          console.log("after initial", featuredProducts);
          setFeaturedProducts((prevProducts) => [
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

 


  const handleLoadMore = () => {
    console.log("load more");
    console.log("currentPage", currentPage);
    console.log("handleLoadMore");
    loadProducts();
  };

  // useEffect(() => {
  //   if (searchedProduct.searchResults.length > 0) {
  //     // console.log('check if',check)
  //     // console.log("searchedProduct.......", searchedProduct);
  //     console.log(
  //       "searchedProduct.searchResults",
  //       searchedProduct.searchResults
  //     );
  //     setFeaturedProducts(
  //       searchedProduct.searchResults.filter((item) => item.products.productTag === "Featured")
  //     );
  //     // setCheck(1);
  //     // setFilteredProducts(searchedProduct.searchResults);
  //   } else {
  //     // console.log('check else',check)
  //     // setFilteredProducts([]);
  //   }
  // }, [searchedProduct]);

  // useEffect(() => {
  //   console.log("featured", featuredProducts);
  //   // console.log("filtered", filteredProducts);
  //   // console.log('check',check)
  // }, [featuredProducts]);
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
            : 
            !searchOpen &&
              featuredProducts.map((item) => <ProductCard key={item.id} {...item} />)}
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
      {/* <div className="container">
    
        <div className="wrapper products_wrapper">
        
          <></>
     
          <>
            {featuredProducts &&
              featuredProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
     
          </>
    
        </div>

    
      </div>
      {!searchOpen && loadMoreVisible && (
        <button onClick={handleLoadMore} className="btn">
          Load More
        </button>
      )} */}
      {/* </section> */}

      {/* <Services /> */}
    </>
  );
};

export default ViewfeaturedProducts;
