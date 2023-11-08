import { Link } from "react-router-dom";
import "./VerticalNav.css";

const VerticalNav = () => {
    const productList = require("../../data/allProducts.json");
    const brands = [];
    productList.map((x) => brands.push(x.brand));
    const unique = brands.filter((x, i, a) => a.indexOf(x) === i);

    return (
        <div className="ver-nav">
            <Link className="ver-link" to={{ pathname: "/" }}>
                <div className="ver-nav-items">All Products</div>
            </Link>
            {unique.map((b) => {
                return (
                    <Link
                        className="ver-link"
                        key={b}
                        to={{ pathname: `brand/${b}` }}
                    >
                        <div className="ver-nav-items">{b}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default VerticalNav;
