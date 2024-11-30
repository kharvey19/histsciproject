import React from "react";
import PropTypes from "prop-types";

const ScoreMeter = ({ value }) => {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const dashArray = (circumference * value) / 100;

  // Inline styles
  const styles = {
    scoreWrap: {
      position: "relative", // Set the container as a reference point for absolute positioning
      width: "200px",
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    scoreBar: {
      position: "relative", // Keeps the SVG in place
    },
    scoreValue: {
      position: "absolute", // Overlap the text on top of the SVG
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Center the text within the SVG
      textAlign: "center",
    },
    scoreName: {
      fontSize: "16px",
      margin: "0", // No extra margin
    },
    scoreNumber: {
      fontSize: "24px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.scoreWrap}>
      <div style={styles.scoreBar}>
        <svg width="200" height="120" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth="25"
            strokeDasharray={`${circumference}`}
            // stroke="#e0e0e0"
          ></circle>
          {/* Gradient progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth="25"
            strokeLinecap="round"
            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
            stroke="url(#score-gradient)"
            transform="rotate(-175 100 100)" /* Rotate circle to start from top */
          ></circle>
          {/* Gradient definition */}
          <defs>
            <linearGradient id="score-gradient">
              <stop offset="0%" stopColor="red" />
              <stop offset="25%" stopColor="orange" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div style={styles.scoreValue}>
        <div style={styles.scoreName}>Score</div>
        <div style={styles.scoreNumber}>{Math.round(value)}%</div>
      </div>
    </div>
  );
};

ScoreMeter.propTypes = {
  value: PropTypes.number.isRequired, // Value should be a number between 0 and 100
};

export default ScoreMeter;
