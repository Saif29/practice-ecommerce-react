import "./productBrand.css";
import ImageHoverZoom from "./imageHoverZoom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../features/cartReducer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Axios from 'axios';

const ProductBrand = () => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productsList, setProductsList] = useState([]);
    Axios.get("http://localhost:3001/products").then((Response) => {
        setProductsList(Response.data);
    })
    const filtered = productsList.filter((x) => {
        return x.brand === brand;
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const addToCart = (brand, model, price) => {
        const name = brand + " " + model;
        dispatch(cartAction({ name: name, price: price }));
        setShow(true)
    };

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
                <h1>{brand} Products</h1>
            </div>
            <div className="products-container">
                {filtered.map((p) => {
                    const id = p.id;
                    return (
                        <div className="individual-product" key={id}>
                            <div onClick={() => navigate(`/product/${id}`)}>
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
                    <Button variant="primary" onClick={() => {navigate('/cart')}}>
                        Go to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductBrand;
