import styles from "../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { reset } from "../redux/cartSlice";
import OrderDetails from "../components/OrderDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [openModel, setOpenModel] = useState(false);
  const navigate = useNavigate();

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const dispatch = useDispatch();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("/orders", data);
      res.status === 201 && navigate("/orders/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.error(error);
    }
  };

  const handleCOD = () => {
    setCash(true);
    setOpenModel(true);
  };

  const handleEmptyCart = () => {
    dispatch(reset());
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shippingDetails = details.purchase_units[0].shipping;
              createOrder({
                customer: shippingDetails.name.full_name,
                address: shippingDetails.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <img
                      src={product.img}
                      className={styles.pizza_image}
                      alt="product image"
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>Rs. {product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    Rs. {product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cart.products.length > 0 && (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <button
              style={{
                padding: "0.75rem 1rem",
                border: "none",
                backgroundColor: "teal",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={handleEmptyCart}
            >
              <img src="/img/bin.png" height="20" alt="" />
              Empty Cart
            </button>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>Rs. {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>Rs. 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>Rs. {cart.total}
          </div>

          {open && cart.quantity.length !== 0 && cart.total > 0 ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={handleCOD}>
                CASH ON DELIVERY
              </button>
              <div
                className={styles.payButton}
                style={{
                  backgroundColor: "white",
                  color: "#008cdd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25rem",
                }}
                onClick={() => navigate("/payment")}
              >
                <img src="/img/stripe.png" height="20" alt="" />
                PAY WITH STRIPE
              </div>
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              className={styles.button}
              onClick={() => user.currentUser && setOpen(true)}
            >
              CHECKOUT
            </button>
          )}
          {!user.currentUser && (
            <p
              style={{ display: "flex", alignSelf: "center", color: "#ff9966" }}
            >
              Log in to place an order
            </p>
          )}
        </div>
      </div>
      {cash && openModel && (
        <OrderDetails
          total={cart.total}
          createOrder={createOrder}
          setOpenModel={setOpenModel}
        />
      )}
    </div>
  );
};

export default Cart;
