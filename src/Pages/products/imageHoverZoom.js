import './products.css';

const ImageHoverZoom = ({ imagePath }) => {
    return (
        <div className="product-img">
            <img src={imagePath} alt="" className="mobile-img-sm" />
        </div>
    );
};
export default ImageHoverZoom;
