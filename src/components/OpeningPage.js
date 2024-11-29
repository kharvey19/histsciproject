import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/Users/katherineharvey/Desktop/histsci/src/App.css'; 

const OpeningPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name) {
      localStorage.setItem('userName', name); // Save user name to localStorage
      navigate('/survey');
    } else {
      alert('Please enter your name to proceed.');
    }
  };

  return (
    <div style={styles.container} className="background-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="love-ya-like-a-sister-regular">How Obedient to Authority are you?</h1>
        <p style={styles.description} className="funnel-sans-light" >
        Curious how your decisions about obedience to authority might have been judged by Milgram in the 1960s? Take this survey to explore how authority could influence your choices in challenging situations!        </p>
          <div style={styles.inputWrapper}>
            <input
              className="funnel-sans-light"
              type="text"
              placeholder="Enter your name"
              style={styles.input}
              value={name || ''} // Ensure value is always a string
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        <button onClick={handleStart} style={styles.button} className="funnel-sans-light">
          Test Your Choices!
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


export default OpeningPage;
