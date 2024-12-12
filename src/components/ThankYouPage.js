import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/"); // Redirect to the home page or any other page
  };

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768); // Update state based on screen size
    };

    window.addEventListener("resize", handleResize);

    // Ensure the page opens at the top
    window.scrollTo(0, 0);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#dbe7e4",
      color: "#333",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      display: "flex",
      flexDirection: isLargeScreen ? "row" : "column", // Stack vertically on small screens
      flexWrap: "wrap", // Allows wrapping on small screens
      justifyContent: "space-between",
      alignItems: "flex-start",
      maxWidth: "1200px",
      width: "100%",
      gap: "20px", // Adds space between elements
    },
    leftSide: {
      flex: 1,
      padding: "20px",
      textAlign: "left",
      minWidth: "300px", // Minimum width for smaller screens
      maxWidth: "100%", // Ensures it fits within its container
      boxSizing: "border-box",
    },
    rightSide: {
      flex: 1,
      padding: "20px",
      textAlign: "left",
      minWidth: "300px", // Minimum width for smaller screens
      maxWidth: "100%", // Ensures it fits within its container
      boxSizing: "border-box",
      borderLeft: isLargeScreen ? "1px solid black" : "none", // Conditionally apply border
      height: "650px",
    },
    heading: {
      fontSize: "30px",
      marginBottom: "20px",
    },
    subheading: {
      fontSize: "24px",
      marginTop: "20px",
      marginBottom: "10px",
    },
    message: {
      fontSize: "18px",
      marginBottom: "20px",
      lineHeight: "1.6",
    },
    bibliography: {
      lineHeight: "1.6",
      wordWrap: "break-word", // Ensures long text like URLs wrap onto the next line
      overflowWrap: "break-word", // For broader browser compatibility
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#0096c7",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <div style={styles.leftSide}>
          <h1
            className="playfair"
            style={{ ...styles.heading, color: "black" }}
          >
            Thank You for Completing the Survey!
          </h1>
          <p className="georgia" style={{ ...styles.message, color: "black" }}>
            Reflecting on these topics helps us understand how the dynamics of
            authority and ethical decision-making affect our own behaviors and
            choices. This survey explored Milgram's ideas and themes in a less
            intense context, yet it highlights how these concepts remain
            relevant today, showing that the challenges of obedience and moral
            autonomy continue to shape our interactions and decisions.
          </p>
          <img
            src={require("../assets/happy.jpg")}
            alt=""
            style={{
              width: "100%",
              maxWidth: "400px",
              display: "block",
              margin: "auto",
            }}
          />
        </div>

        <div style={styles.rightSide}>
          <h2
            className="playfair"
            style={{ ...styles.subheading, color: "black" }}
          >
            Bibliography
          </h2>
          <div
            className="georgia"
            style={{ ...styles.bibliography, color: "black" }}
          >
            <p>
              Browning, C. (n.d.). Ordinary men. The Montréal Review.
              <a
                href="https://www.themontrealreview.com/Articles/Ordinary_Men.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://www.themontrealreview.com/Articles/Ordinary_Men.php
              </a>
            </p>
            <p>
              Dumbach, A. E., & Newborn, J. (2023). Sophie Scholl and the White
              Rose. Oneworld.
            </p>
            <p>
              Kelman, Herbert, and V. Lee Hamilton. The My Lai Massacre: A
              Military Crime of Obedience. 1989.
              <a
                href="https://catcher.sandiego.edu/items/cas/Prieto_kelman_hamilton_1989_my_lai_massacre.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://catcher.sandiego.edu/items/cas/Prieto_kelman_hamilton_1989_my_lai_massacre.pdf
              </a>
            </p>
            <p>
              Milgram, S. (1963b). Behavioral study of obedience. The Journal of
              Abnormal and Social Psychology, 67(4), 371–378.
              <a
                href="https://doi.org/10.1037/h0040525"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://doi.org/10.1037/h0040525
              </a>
            </p>
            <p>
              Yale University Library. Photographs of Milgram. Digital
              Collections.
              <a
                href="https://collections.library.yale.edu/catalog?f%5Bcreator_ssim%5D%5B%5D=Milgram,%20Stanley,%201933-1984."
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://collections.library.yale.edu/catalog?f%5Bcreator_ssim%5D%5B%5D=Milgram,%20Stanley,%201933-1984
              </a>
            </p>
          </div>
        </div>
      </div>

      <button
        className="georgia"
        style={styles.button}
        onClick={handleButtonClick}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
