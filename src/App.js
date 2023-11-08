import Products from "./Pages/products";
import Header from "./components/Header";
import VerticalNav from "./components/VerticalNav";
import ProductDetails from './Pages/productDetails'
import ProductBrand from "./Pages/productBrand";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/notfound";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <div className="main">
                    <div className="vertical-nav">
                        <VerticalNav />
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/brand/:brand" element={<ProductBrand />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
