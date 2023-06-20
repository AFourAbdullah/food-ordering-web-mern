import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user.currentUser?.user?._id;
  const [orders, setOrders] = useState([]);
  const status = ["Preparing", "On the way", "Delivered"];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/orders/myorders/${userId}`); // Replace 'userId123' with the actual userId
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div style={{ padding: "20px", minHeight: "60vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>My Orders</h1>
      <div style={{ marginBottom: "20px" }}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Total</th>
                <th>Address</th>
                <th>Payment Method</th>
                <th>Status</th>
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
                    {order.method === 0 ? <span>Cash</span> : <span>Card</span>}
                  </td>
                  <td>{status[order.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "teal",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
