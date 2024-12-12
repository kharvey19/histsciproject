import React, { useState, useEffect } from "react";

function CategoryCards({ categories, calculateCategoryScore, insights }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryKeys = Object.keys(categories);
  const totalCategories = categoryKeys.length;

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 568);

  // Listen for screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 568); // Update state based on screen size
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCategories);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCategories - 1 : prevIndex - 1,
    );
  };

  const currentCategory = categoryKeys[currentIndex];
  const score = calculateCategoryScore(currentCategory);
  const level = score > 3 ? "High" : score > 2 ? "Moderate" : "Low";

  const capitalize = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };

  const split = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
      .trim() // Remove leading/trailing spaces
      .toLowerCase(); // Convert the entire string to lowercase
  };

  const percentage = Math.round((score / 4) * 100);

  const categoryInsight =
    insights[currentCategory]?.[level.toLowerCase()] ||
    "No specific insight available for this category.";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#00000010",
    },
    percentageText: {
      marginTop: "8px", // Space between the bar and the text
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333",
    },
    card: {
      // backgroundColor: "#00000010",

      // backgroundColor: "#dbe7e4",
      padding: "15px",
      margin: "15px auto",
      borderRadius: "8px",
      maxWidth: "600px",
      textAlign: "left",
      minHeight: "300px", // Set a minimum height for consistent size
      height: isLargeScreen ? "350px" : "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // Distribute content evenly
      overflow: "hidden", // Prevent content overflow
    },
    progressBar: {
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden",
      marginTop: "8px",
      marginRight: "20px",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#76c7c0",
    },
    navigation: {
      marginTop: "0px",
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
      bottom: "20px", // Fixed distance from the bottom
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#0096c7",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ fontSize: "25px" }} className="playfair">
          {capitalize(currentCategory)}
        </h3>
        <p style={{ marginBottom: "0", marginTop: "0" }}>
          <span
            className="georgia"
            style={{ fontWeight: "bold", marginBottom: "0" }}
          >
            Level:
          </span>{" "}
          {level}
        </p>

        <p className="georgia">{categoryInsight}</p>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${percentage}%`,
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Centers horizontally
            marginTop: "0",
            fontWeight: "bold",
            marginBottom: "0",

            width: "100%", // Optional: ensures the div spans full width
          }}
        >
          <p className="georgia">
            {" "}
            You are {percentage}% influenced by your {split(currentCategory)}{" "}
          </p>
        </div>
      </div>
      <div style={styles.navigation}>
        <button className="georgia" onClick={handleBack} style={styles.button}>
          Back
        </button>
        <button className="georgia" onClick={handleNext} style={styles.button}>
          Next
        </button>
      </div>
    </div>
  );
}

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   card: {
//     // border: "1px solid #ccc",
//     // borderRadius: "8px",
//     // padding: "16px",
//     // width: "300px",
//     // textAlign: "center",
//     backgroundColor: '#dbe7e4',
//     padding: '15px',
//     margin: '15px auto',
//     borderRadius: '8px',
//     // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
//     // border: '1px solid black',
//     maxWidth: '600px',
//     textAlign: 'left',
//   },
//   progressBar: {
//     height: "10px",
//     backgroundColor: "#e0e0e0",
//     borderRadius: "5px",
//     overflow: "hidden",
//     marginTop: "8px",
//     marginRight: '20px'
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#76c7c0",
//   },
//   navigation: {
//     marginTop: "16px",
//     display: "flex",
//     justifyContent: "space-between",
//     width: "200px",
//   },
//   button: {
//     padding: "8px 16px",
//     backgroundColor: "#0096c7",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

export default CategoryCards;
