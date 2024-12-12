import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const IntroductionPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    navigate("/survey"); // Navigate to the survey page
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "#e0e0e0",
      padding: "20px", // Added padding for better spacing on small screens
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
    },
    title: {
      fontSize: isLargeScreen ? "70px" : "40px", // Dynamic title size
      color: "#ffffff",
      marginBottom: "20px",
      marginTop: "20px",
    },
    description: {
      fontSize: isLargeScreen ? "20px" : "16px", // Dynamic description size
      marginBottom: isLargeScreen ? "50px" : "30px",
      marginLeft: "20px",
      marginRight: "20px",
      lineHeight: "1.6", // Improved readability
    },
    button: {
      padding: isLargeScreen ? "20px 40px" : "15px 30px", // Dynamic button size
      fontSize: isLargeScreen ? "16px" : "14px",
      color: "#ffffff",
      backgroundColor: "#0096c7",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container} className="background-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="playfair">
          Welcome!
        </h1>
        <p style={styles.description} className="georgia">
          Thanks for taking the time to complete this survey! The survey is
          based on Stanley Milgram’s famous experiments on obedience to
          authority, which showed how people often follow orders even when it
          conflicts with their personal values.
          <br />
          <br />
          This survey explores similar ideas, like how fear, social pressure,
          and moral independence shape decision-making. By answering a few
          questions, you’ll get a better understanding of how these factors
          influence your choices and see how you might react in real-world,
          high-pressure scenarios.
          <br />
          <br />
          While this survey doesn’t carry the emotional intensity or immediate
          pressures of real-world situations or controlled experiments with
          actors simulating high-stakes environments, we encourage you to
          imagine yourself in challenging scenarios as you respond. This
          reflection can help bring your answers closer to how you might feel or
          act under pressure.
        </p>
        <button onClick={handleNext} style={styles.button} className="georgia">
          Start the Survey
        </button>
      </div>
    </div>
  );
};

export default IntroductionPage;
