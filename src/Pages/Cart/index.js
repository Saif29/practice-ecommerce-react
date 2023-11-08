import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartAction, removeItemAction } from "../../features/cartReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var total = 0;
    const shipping = 200;
    const [x, setX] = useState(0);

    const deleteItem = (item) => {
        dispatch(removeItemAction(item));
        setX(0);
    };

    let finalList = [];

    cartItems.forEach((x) => {
        if (
            finalList.some((val) => {
                return val["name"] == x["name"];
            })
        ) {
            finalList.forEach((k) => {
                if (k["name"] === x["name"]) {
                    k["occurrence"]++;
                }
            });
        } else {
            let a = {};
            a["name"] = x["name"];
            a["price"] = x["price"];
            a["occurrence"] = 1;
            finalList.push(a);
        }
    });

    return (
        <div className="cart-page">
            {finalList.length > 0 ? (
                <div className="cart-container">
                    <h1>Cart</h1>
                    <div className="cart-inner-container">
                        <div className="cart-table-div">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th style={{ minWidth: "30px" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalList.map((i) => {
                                        total = total + i.price * i.occurrence;
                                        return (
                                            <tr key={i.name}>
                                                <td>{i.name}</td>
                                                <td>{i.price}</td>
                                                <td>{i.occurrence}</td>
                                                <td
                                                    className="td-delete"
                                                    onClick={() => {
                                                        deleteItem(i.name);
                                                    }}
                                                >
                                                    <FaTrash />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-total-div">
                            <h3>Total</h3>
                            <div className="inner-total-div">
                                <div className="total-inner-1">
                                    <div>
                                        <p>
                                            <b>Sub Total:</b>
                                        </p>
                                        Rs.{total}
                                    </div>
                                    <div>
                                        {" "}
                                        <p>
                                            <b>Shipping Charges:</b>
                                        </p>
                                        Rs.{shipping}
                                    </div>
                                </div>
                                <div className="total-inner-2">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <b style={{ color: "green" }}>
                                        Rs.{total + shipping}
                                    </b>
                                </div>
                            </div>
                            <div className="cart-total-buttons">
                                <button
                                    style={{ backgroundColor: "red" }}
                                    onClick={() => {
                                        dispatch(emptyCartAction());
                                    }}
                                >
                                    Clear Cart
                                </button>
                                <button
                                    style={{ backgroundColor: "black" }}
                                    onClick={() => {
                                        navigate('/checkout')
                                    }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    EMPTY CART
                </h1>
            )}
        </div>
    );
};

export default Cart;
