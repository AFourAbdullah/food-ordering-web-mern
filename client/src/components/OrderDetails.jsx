import { useState } from 'react';
import styles from '../styles/OrderDetails.module.css'
import { useSelector } from 'react-redux';
import { reset } from '../redux/cartSlice';

const OrderDetails = ({total, createOrder, setOpenModel}) => {

    const user = useSelector(state=>state.user)
    const walletAddress = user.currentUser?.user?.walletAddress;
    console.log(walletAddress)

    const [customer, setCustomer] = useState(user.currentUser ? user.currentUser.user.name : "");
    const [address, setAddress] = useState("");

    const handleClick = () => {
        createOrder({customer, userId: user.currentUser.user._id, address, total, method: 0, walletAddress});
        
        reset()
        setOpenModel(false)
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You will pay Rs. {total} after delivery</h1>
            <div className={styles.item}>
                <label className={styles.label}>Name</label>
                <input placeholder="" type="text" className={styles.input} value={customer} onChange={(e)=>setCustomer(e.target.value)} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <input placeholder="" type="text" className={styles.input} onChange={(e)=>setAddress(e.target.value)} />
            </div>
            <button className={styles.button} onClick={handleClick}>Order</button>
        </div>
    </div>
  )
}

export default OrderDetails