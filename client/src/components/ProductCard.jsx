import styles from "../styles/ProductCard.module.css"; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.productCard}>
      {product && (
        <>
          <div className={styles.productImage}>
            <img src={product.img} alt="Product" className={styles.Image} />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "10px 0",
                alignItems: "center",
              }}
            >
              <h3 className={styles.productName}>{product.title}</h3>
              <h3 className={styles.productPrice}>
                <sub>Rs. {product.prices[0]}</sub>
              </h3>
            </div>
            <p className={styles.productDescription}>{product.desc}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <button className={styles.cartButton} onClick={() => handleButtonClick(product._id)}>{product.category === "pizza" ? "Customize" : "Add to Cart"}</button>
            </div> 
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
