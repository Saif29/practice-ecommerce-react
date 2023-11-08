import { useNavigate, useParams } from "react-router-dom";
import "./productDetails.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../features/cartReducer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";


const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const allProducts = require("../../data/allProducts.json");
    const navigate = useNavigate();

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

    const product = allProducts
        .filter((x) => {
            return x.id === parseInt(id);
        })
        .at(0);
    return (
        <div className="details-page">
            <h1>
                {product.brand} {product.model}
            </h1>
            <div className="details-main">
                <div className="main-sub-1">
                    <div className="img-div">
                        <img className="detail-img" alt="" src={product.img} />
                    </div>
                </div>
                <div className="main-sub-2">
                    <div className="details1">
                        <p>
                            <b>Name: </b>
                        </p>{" "}
                        {product.brand} {product.model}
                    </div>
                    <div className="details2">
                        <div className="details2-1">
                            <p>
                                <b>RAM: </b>
                            </p>
                            {product.ram}
                        </div>
                        <div className="details2-1">
                            <p>
                                <b>STORAGE :</b>
                            </p>
                            {product.rom}
                        </div>
                        <div className="details2-1">
                            <p>
                                <b>Front Camera: </b>
                            </p>
                            {product["front-cam"]}
                        </div>
                        <div className="details2-1">
                            <p>
                                <b>Back Camera: </b>
                            </p>
                            {product["back-cam"]}
                        </div>
                        <div className="details2-1">
                            <p>
                                <b>SKU: </b>
                            </p>
                            {product.sku}
                        </div>
                        <div className="details2-1">
                            <p>
                                <b>Colors: </b>
                            </p>
                            <div >
                                {product.colors.map((x) => {
                                    return (
                                        <div
                                            className="color-div"
                                            style={{
                                                backgroundColor: `${x.color}`,
                                            }}
                                        >
                                        </div>
                                    );
                                })}
                                <div style={{ clear: "both" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="details1">
                        <p>
                            <b>Price: </b>
                        </p>{" "}
                        Rs.{product.price}
                    </div>
                    <div className="details1">
                        <p>
                            <b>Availablity</b>:
                        </p>
                        {inStock(product.quantity) ? (
                            <p style={{ color: "green" }}>In Stock</p>
                        ) : (
                            <p style={{ color: "red" }}>Out of Stock</p>
                        )}
                    </div>
                    <div>
                        <button
                            className="add-to-cart-btn"
                            disabled={!inStock(product.quantity)}
                            onClick={() => {
                                addToCart(
                                    product.brand,
                                    product.model,
                                    product.price,
                                    product.quantity
                                );
                            }}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
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

export default ProductDetails;
