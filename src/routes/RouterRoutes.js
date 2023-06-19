import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import ViewAllProducts from '../pages/ViewAllProducts';
import ViewFeaturedProducts from "../pages/ViewFeaturedProducts"
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import  ResetPassword  from '../pages/ResetPassword';
import UpdateProfilePage from '../pages/UpdateProfile';
import SessionManager from '../pages/SessionManager';
const RouterRoutes = () => {
    useScrollRestore();
    return (
        <>
        <SessionManager/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<ViewAllProducts />} />
                <Route path="/featured-products" element={<ViewFeaturedProducts />} />
                <Route path="/product-details/:productID" element={<ProductDetails />} />
                <Route path="/update-profile" element={<UpdateProfilePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;