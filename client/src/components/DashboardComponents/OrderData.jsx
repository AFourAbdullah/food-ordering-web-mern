import { useState, useEffect } from "react";
import "../../styles/UserData.css";
import axios from "axios";

const OrderData = () => {
  const [orders, setOrders] = useState([]);
  const status = ["Preparing", "On the way", "Delivered"];

  const handleStatus = async (id) => {
    const item = orders.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/orders/");
        setOrders(response.data);
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
        Order Data
      </h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>Rs. {order.total}</td>
              <td>{order.address}</td>
              <td>
                {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
              </td>
              <td>{status[order.status]}</td>
              <td>
                <button
                  className="dashboardBtn"
                  onClick={() => handleStatus(order._id)}
                >
                  Next Stage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderData;
