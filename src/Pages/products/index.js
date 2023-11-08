import "./products.css";
import ImageHoverZoom from "./imageHoverZoom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../features/cartReducer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState, Suspense } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
    const [x, setX] = useState(0);
    const navigate = useNavigate();
    const total = 29;
    //const productsList = require("../../data/allProducts.json");
    const [productsList, setProductsList] = useState([]);
    const limitPerPage = 5;
    const fetchData = () => {
        setTimeout(() => {
            let pageNo = Math.ceil(productsList.length / limitPerPage) + 1;
            console.log(
                "page no: " +
                    pageNo +
                    "limit: " +
                    limitPerPage +
                    "len: " +
                    productsList.length
            );
            Axios.get(
                `http://localhost:3001/products?_limit=${limitPerPage}&_page=${pageNo}`
            ).then((Response) => {
                const data = [...productsList, ...Response.data];
                setProductsList(data);
            });
        }, 1000);
    };
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const addToCart = (brand, model, price) => {
        const name = brand + " " + model;
        dispatch(cartAction({ name: name, price: price }));
        setShow(true);
    };

    useEffect(() => {
        if (x === 0) {
            fetchData();
            setX(1);
        }
    });

    const inStock = (q) => {
        if (q > 0) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="products-page">
            <div className="Title">
                <h1>All Products</h1>
            </div>
            <div className="products-container">
                <InfiniteScroll
                    dataLength={productsList.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={productsList.length < total}
                    loader={<h4>Loading...</h4>}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        {productsList.map((p) => {
                            const id = p.id;
                            return (
                                <div className="individual-product" key={id}>
                                    <div
                                        onClick={() =>
                                            navigate(`/product/${id}`)
                                        }
                                    >
                                        <ImageHoverZoom imagePath={p.img} />
                                        <div className="product-text">
                                            <div>
                                                <h3>
                                                    {p.brand} {p.model}
                                                </h3>
                                            </div>
                                            <div>
                                                <h4>Rs. {p.price}</h4>
                                            </div>
                                            <div
                                                style={
                                                    inStock(p.quantity)
                                                        ? { color: "green" }
                                                        : { color: "red" }
                                                }
                                            >
                                                {inStock(p.quantity) ? (
                                                    <b>In Stock</b>
                                                ) : (
                                                    <b>Out of Stock</b>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-btn">
                                        <button
                                            className="add-to-cart-btn"
                                            disabled={!inStock(p.quantity)}
                                            onClick={() => {
                                                addToCart(
                                                    p.brand,
                                                    p.model,
                                                    p.price,
                                                    p.quantity
                                                );
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </Suspense>
                </InfiniteScroll>

                <div style={{ clear: "both" }}></div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Added to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>The product is added to cart!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Continue Shopping
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            navigate("/cart");
                        }}
                    >
                        Go to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;
