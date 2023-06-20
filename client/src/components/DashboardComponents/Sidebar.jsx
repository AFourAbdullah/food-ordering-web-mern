// import React from 'react';
import styles from '../../styles/Dashboard.module.css'

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  return (
    <div className={styles.sidebar}>
      <h2 style={{display: 'flex', alignItems: 'center', margin: '0 0 10px'}}>Admin Dashboard</h2>
      <ul>
        <li
          className={selectedOption === 'users' ? 'selected' : ''}
          onClick={() => onOptionSelect('users')}
        >
          Users
        </li>
        <li
          className={selectedOption === 'products' ? 'selected' : ''}
          onClick={() => onOptionSelect('products')}
        >
          Products
        </li>
        <li
          className={selectedOption === 'orders' ? 'selected' : ''}
          onClick={() => onOptionSelect('orders')}
        >
          Orders
        </li>
        <li
          className={selectedOption === 'rewards' ? 'selected' : ''}
          onClick={() => onOptionSelect('rewards')}
        >
          Rewards
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;