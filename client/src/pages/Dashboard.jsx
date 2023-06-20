import styles from '../styles/Dashboard.module.css'
import { useState } from 'react';
import Sidebar from '../components/DashboardComponents/Sidebar';
import ContentArea from '../components/DashboardComponents/ContentArea';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('users');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />
      <ContentArea selectedOption={selectedOption} />
    </div>
  );
};

export default Dashboard;