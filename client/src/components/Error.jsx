import React from 'react';

const NotFoundPage = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    subheading: {
      fontSize: '24px',
      marginBottom: '32px',
    },
    image: {
      width: '300px',
      marginBottom: '32px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Page Not Found</h2>
      <img
        src="/img/warning.png"
        alt="Error 404"
        style={styles.image}
      />
    </div>
  );
};

export default NotFoundPage;
