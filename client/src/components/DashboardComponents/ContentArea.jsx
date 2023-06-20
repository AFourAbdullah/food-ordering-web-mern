import UserData from './UserData';
import ProductData from './ProductData';
import styles from '../../styles/Dashboard.module.css'
import OrderData from './OrderData';
import RewardData from './RewardData';

const ContentArea = ({ selectedOption }) => {
  return (
    <div className={styles.contentArea}>
      {selectedOption === 'users' && <UserData />}
      {selectedOption === 'products' && <ProductData />}
      {selectedOption === 'orders' && <OrderData />}
      {selectedOption === 'rewards' && <RewardData />}
    </div>
  );
};

export default ContentArea;