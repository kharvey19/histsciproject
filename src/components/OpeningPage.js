import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to the Obedience to Authority Survey</h1>
        <p style={styles.description}>
          This survey is inspired by Stanley Milgram's famous obedience experiments. 
          You'll explore how authority might influence your decisions in challenging scenarios.
        </p>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter your name"
              style={styles.input}
            />
          </div>
        <button onClick={handleStart} style={styles.button}>
          Start Survey
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
    maxWidth: '500px',
    display: 'flex',          // Add flexbox
    flexDirection: 'column',  // Arrange children vertically
    alignItems: 'center',     // Center horizontally
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#ffffff',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#bbbbbb',
  },
  inputWrapper: {
    width: '100%',            // Match the width of the parent
    textAlign: 'center',      // Center-align text inside inputWrapper
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
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};


export default OpeningPage;
