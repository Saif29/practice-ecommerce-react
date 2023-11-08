import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emptyCartAction } from "../../features/cartReducer";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || mobile === "" || zip === "" ||address === "") {
            alert('All fields are required!');
        }
        else {
            alert("Order Placed!");
            dispatch(emptyCartAction());
            navigate('/');
        }

    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <form className="checkout-form">
                <div className="form-group">
                    <div className="label-div">
                        <label>Name</label>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-div">
                        <label>Email</label>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-div">
                        <label>Mobile</label>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={(e) => {
                                setMobile(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-div">
                        <label>Zip Code</label>
                    </div>
                    <div className="input-div">
                        <input
                            onChange={(e) => {
                                setZip(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-div">
                        <label>Address</label>
                    </div>
                    <div className="input-div">
                        <textarea
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            rows="3"
                        />
                    </div>
                </div>
                <div className="btn-div">
                    <button
                        className="checkout-btn"
                        onClick={(e) => {
                            formSubmit(e);
                        }}
                    >
                        PLACE ORDER
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Checkout;
