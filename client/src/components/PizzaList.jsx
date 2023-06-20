import styles from "../styles/PizzaList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const PizzaList = () => {
  const [pizzaList, setPizzaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/");
        const pizzaProducts = response.data.products.filter(
          (product) => product.category === "pizza"
        );
        setPizzaList(pizzaProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>THE BEST PIZZA IN THE CITY</h2>
      <p className={styles.desc}>
        Enjoy authentic pizza made with fresh ingredients and baked to
        perfection. Vegetarian and gluten-free options available. Cozy
        atmosphere for dining with family and friends. Come taste our
        mouth-watering pizzas!
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 40,
          paddingLeft: 40,
          paddingRight: 40,
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {pizzaList.map((pizza) => (
          <ProductCard key={pizza.id} product={pizza} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        <a
          href="/menu"
          style={{
            padding: "16px 32px",
            backgroundColor: "#7d0d15",
            color: "#fff",
            borderRadius: 6,
          }}
        >
          View All Products
        </a>
      </div>
    </div>
  );
};

export default PizzaList;
