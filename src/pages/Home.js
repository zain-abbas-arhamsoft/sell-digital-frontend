import React from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import Services from '../components/common/Services';
import AllProducts from "./AllProducts"
import FeaturedProduct from "./FeaturedProducts"
import { CommonProvider } from '../contexts/common/commonContext';
const Home = () => {
    return (
        // <CommonProvider>
        <main>
            <section id="">
                <HeroSlider />
            </section>


            <section id="" className="section">
                <div className="container">
                    <SectionsHead heading="Recently Added Products" />
                    <FeaturedSlider/>
                </div>
            </section>


            <section id="featured" className="section">
                <div className="container">
                    <SectionsHead heading="Featured Products" />
                    <FeaturedProduct />
                </div>
            </section>
            <section id="products" className="section">
                <div className="container">
                    <SectionsHead heading="View All Products" />
                    <AllProducts />
                </div>
            </section>
            <Services />
        </main>
        //  </CommonProvider>
    );
};

export default Home;;