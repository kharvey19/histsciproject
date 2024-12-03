// Intermediate Page (IntroductionPage.jsx)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const IntroductionPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/survey'); // Navigate to the survey page
  };

  return (
    <div style={styles.container} className="background-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="love-ya-like-a-sister-regular">Welcome!</h1>
        <p style={styles.description} className="funnel-sans-light">
          Thanks for taking the time to complete this survey! The survey is based on Stanley Milgram’s famous experiments on obedience to authority, which showed how people often follow orders even when it conflicts with their personal values. 
          <br />
          <br />
          This survey explores similar ideas, like how fear, social pressure, and moral independence shape decision-making. By answering a few questions, you’ll get a better understanding of how these factors influence your choices and see how you might react in real-world, high-pressure scenarios.
        </p>
        <button onClick={handleNext} style={styles.button} className="funnel-sans-light">
          Start the Survey
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#e0e0e0',
    },
    card: {
      backgroundColor: '#1e1e1e',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      width: '90%',
      maxWidth: '800px',
      display: 'flex',          // Add flexbox
      flexDirection: 'column',  // Arrange children vertically
      alignItems: 'center',     // Center horizontally
    },
    title: {
      fontSize: '70px',
      // marginBottom: '20px',
      color: '#ffffff',
    },
    description: {
      fontSize: '20px',
      marginBottom: '50px',
      marginLeft: '50px',
      marginRight: '50px',
      // color: '#bbbbbb',
    },
    inputWrapper: {
      width: '100%',            // Match the width of the parent
      textAlign: 'center',  
      marginBottom: '30px',   
    },
    input: {
      width: '100%',            // Full width inside wrapper
      maxWidth: '400px',        // Restrict max width
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #444',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: '#2a2a2a',
      color: '#e0e0e0',
    },
    button: {
      padding: '20px 20px',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#0096c7',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };
  
export default IntroductionPage;
  