import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/UserData.css";

import AddButton from "../AddButton";
import Add from "../Add";

const ProductData = () => {
  const [close, setClose] = useState(true);
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        Product Data
      </h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th> Image </th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ width: "5%" }}>{product._id}</td>
              <td style={{ width: "15%" }}>
                <img src={product.img} width="75" />
              </td>
              <td style={{ width: "15%" }}>{product.title}</td>
              <td style={{ width: "35%" }}>{product.desc}</td>
              <td style={{ width: "10%" }}>Rs. {product.prices[0]}</td>
              <td style={{ width: "20%" }}>
                <button
                  className="dashboardBtn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AddButton setClose={setClose} />
      </div>
      {!close && <Add setClose={setClose} />}
    </>
  );
};

export default ProductData;
