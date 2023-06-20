import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=>state.user);
  const userId = user.currentUser?.user?._id;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <img src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>090 078 601</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link to="/" className={styles.link}>
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link to="/menu" className={styles.link}>
            <li className={styles.listItem}>Menu</li>
          </Link>
          <Link to="/blog" className={styles.link}>
            <li className={styles.listItem}>Blog</li>
          </Link>
          <Link to="/" className={styles.link}>
            <img src="/img/logoo.png" alt="" width="175" height="89" />
          </Link>
          <Link to="/track" className={styles.link}>
            <li className={styles.listItem}>Tracking</li>
          </Link>
          <Link to="/contact" className={styles.link}>
            <li className={styles.listItem}>Contact</li>
          </Link>
          {user.currentUser ? 
          <Link to={`/myorders/${userId}`} className={styles.link}>
            <li className={styles.listItem}>Hello, {user.currentUser.user.name}</li> 
          </Link>
          : 
          <Link to="/login" className={styles.link}>
            <li className={styles.listItem}>Log in / sign up</li>
          </Link>}
        </ul>
      </div>
      <Link to="/cart">
        <div className={styles.item}>
          <div className={styles.cart}>
            <img src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar