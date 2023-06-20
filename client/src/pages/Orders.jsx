import styles from "../styles/Order.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, useNotification } from "web3uikit";

const Orders = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    setShowModal(true);

    fetchData();
  }, [id]);

  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>Rs. {order.total}</span>
              </td>
            </tr>
          </table>
        </div>

        <div className={styles.row}>
          <div className={statusClass(0)}>
            <img src="/img/paid.png" alt="" width="30" height="30" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <img src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div className={statusClass(1)}>
            <img src="/img/bake.png" alt="" width="30" height="30" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <img src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <img src="/img/bike.png" alt="" width="30" height="30" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <img src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
          <div className={statusClass(3)}>
            <img src="/img/delivered.png" alt="" width="30" height="30" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <img src="/img/checked.png" alt="" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>Rs. {order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>Rs. 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>Rs. {order.total}
          </div>
          <button disabled className={styles.button}>
            {order.method === 0 ? "KEEP YOUR CASH READY" : "PAID"}
          </button>
        </div>
      </div>
      <Modal
        isVisible={showModal}
        onCancel={hideModal}
        onCloseButtonPressed={hideModal}
        onOk={hideModal}
      >
        <h1>COngratulations</h1>
      </Modal>
    </div>
  );
};

export default Orders;
