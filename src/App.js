// import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { Link,useNavigate } from "react-router-dom";
import SearchNavbar from "./components/common/SearchNavbar";
import UpdateProfilePage from './pages/UpdateProfile';
import { CommonProvider } from './contexts/common/commonContext';
const App = () => {
  return (
    <>
      <CommonProvider>
        <FiltersProvider>
          <CartProvider>
            <Header />
            <SearchNavbar/>
            <RouterRoutes />
            <Footer />
            <BackTop />
          </CartProvider>
        </FiltersProvider>
      </CommonProvider>
    </>


  );
};

export default App;
