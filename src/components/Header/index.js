import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
    const noOfItems = useSelector((state) => state.cart.value.length);
    return (
        <div className="header">
            <div className="title">
                <Link to={"/"} className="title-link">
                    MOBILE SHOP
                </Link>
            </div>

            <div className="cart-div">
                <Link to={"/cart"} className="title-link">
                    <FaShoppingCart style={{ fontSize: "30px" }} />
                    {noOfItems === 0 ? (
                        ""
                    ) : (
                        <span className="badge badge-warning" id="lblCartCount">
                            {" "}
                            {noOfItems}{" "}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Header;
