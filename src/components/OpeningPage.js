import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const OpeningPage = () => {
  const [name, setName] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768); // Check if screen is large
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStart = () => {
    if (name) {
      localStorage.setItem("userName", name); // Save user name to localStorage
      navigate("/intro");
    } else {
      alert("Please enter your name to proceed.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "#e0e0e0",
    },
    card: {
      backgroundColor: "#1e1e1e",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "90%",
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: isLargeScreen ? "70px" : "normal", // Adjust font size dynamically

    },
    title: {
      fontSize: isLargeScreen ? "70px" : "40px", // Adjust font size dynamically
      color: "#ffffff",
      marginBottom: "40px",
    },
    description: {
      fontSize: isLargeScreen ? "20px" : "16px", // Adjust font size dynamically
      marginBottom: isLargeScreen ? "50px" : "16px", // Adjust font size dynamically
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "0px",
    },
    inputWrapper: {
      display: "flex", // Use flexbox to center the input
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      width: "100%",
      marginBottom: "30px",
    },
    input: {
      width: "100%",
      maxWidth: "400px",
      padding: "10px",
      border: "1px solid #444",
      borderRadius: "4px",
      fontSize: isLargeScreen ? "16px" : "14px",
      backgroundColor: "#2a2a2a",
      color: "#e0e0e0",
    },
    button: {
      padding: isLargeScreen ? "20px 20px" : "15px 15px",
      fontSize: isLargeScreen ? "16px" : "12px", // Adjust font size dynamically
      color: "#ffffff",
      backgroundColor: "#0096c7",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container} className="background-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="playfair">
          How Obedient to Authority are you?
        </h1>
        <p style={styles.description} className="georgia">
          Curious how your decisions about obedience to authority might have
          been judged by Milgram in the 1960s? Take this survey to explore how
          authority could influence your choices in challenging situations!
        </p>
        <div style={styles.inputWrapper}>
          <input
            className="georgia"
            type="text"
            placeholder="Enter your name"
            style={styles.input}
            value={name || ""} // Ensure value is always a string
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button onClick={handleStart} style={styles.button} className="georgia">
          Test Your Choices!
        </button>
      </div>
    </div>
  );
};

export default OpeningPage;
