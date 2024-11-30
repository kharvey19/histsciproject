import React, { useState } from "react";

function CategoryCards({ categories, calculateCategoryScore, insights }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryKeys = Object.keys(categories);
  const totalCategories = categoryKeys.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCategories);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCategories - 1 : prevIndex - 1
    );
  };

  const currentCategory = categoryKeys[currentIndex];
  const score = calculateCategoryScore(currentCategory);
  const level = score > 3 ? "High" : score > 2 ? "Moderate" : "Low";

  const capitalize = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };

  // Safely retrieve insights for the category
  const categoryInsight =
    insights[currentCategory]?.[level.toLowerCase()] ||
    "No specific insight available for this category.";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ fontSize: '25px'}}className="love-ya-like-a-sister-regular">{capitalize(currentCategory)}</h3>
        <p>
            <span style={{ fontWeight: 'bold' }}>Level:</span> {level}
        </p>
      
        <p>{categoryInsight}</p>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${(score / 4) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div style={styles.navigation}>
        <button onClick={handleBack} style={styles.button}>
          Back
        </button>
        <button onClick={handleNext} style={styles.button}>
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

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: '#dbe7e4',
      padding: '15px',
      margin: '15px auto',
      borderRadius: '8px',
      maxWidth: '600px',
      textAlign: 'left',
      minHeight: '200px', // Set a minimum height for consistent size
      height: '300px',    // Fixed height to prevent resizing
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Distribute content evenly
      overflow: 'hidden',             // Prevent content overflow
    },
    progressBar: {
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden",
      marginTop: "8px",
      marginRight: '20px',
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#76c7c0",
    },
    navigation: {
      marginTop: "16px",
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
    //   position: 'absolute', // Ensures buttons stay in the same spot
      bottom: '20px',       // Fixed distance from the bottom
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
  


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CategoryCards;
