import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://limitless-earth-51296-7806e27eec8d.herokuapp.com"; // Your Heroku app URL

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 568);

  // Listen for screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 568); // Update state based on screen size
    };

    window.addEventListener("resize", handleResize);

    // Ensure the page opens at the top
    window.scrollTo(0, 0);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    question: {
      fontSize: "35px",
    },
    text: {
      fontSize: isLargeScreen ? "25px" : "20px",
      marginLeft: "40px",
      marginRight: "40px",
      marginBottom: isLargeScreen ? "45px" : "20px",
      color: "black",
      textAlign: "center",
      fontWeight: "bold",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#dbe7e4",
      color: "#e0e0e0",
      width: "100vw", // Prevent horizontal shrinking
      paddingTop: isLargeScreen ? "40px" : "0",
    },
    progressBarContainer: {
      height: "25px",
      backgroundColor: "#d6ccc2",
      minWidth: "20px", // Prevent it from collapsing
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#0096c7",
      transition: "width 0.3s ease",
      // zIndex: 1, // Ensures visibility
    },
    content: {
      display: "flex",
      flex: 1,
      padding: "20px",
      backgroundColor: "#dbe7e4",
      gap: isLargeScreen ? "0px" : "normal",
    },
    leftSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#dbe7e4",
      borderRadius: "8px",
      marginRight: isLargeScreen ? "10px" : "0",
      marginLeft: isLargeScreen ? "120px" : "0",
      marginTop: isLargeScreen ? "60px" : "10px",
      marginBottom: isLargeScreen ? "50px" : "0",
    },
    image: {
      maxWidth: "80%",
      borderRadius: "8px",
      marginTop: isLargeScreen ? "20px" : "0",
    },
    rightSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      paddingBottom: isLargeScreen ? "0" : "50px",
      backgroundColor: "#dbe7e4",
      borderRadius: "8px",
      marginRight: isLargeScreen ? "100px" : "0",
      marginLeft: isLargeScreen ? "20px" : "0",
      marginTop: isLargeScreen ? "60px" : "0",
      marginBottom: "50px",
    },
    button: {
      margin: "10px",
      padding: isLargeScreen ? "22px 30px" : "10px 10px",
      color: "black",
      border: "1px solid black",
      borderRadius: "5px",
      cursor: "pointer",
      width: "80%",
      textAlign: "center",
      fontSize: isLargeScreen ? "20px" : "15px",
    },
  };

  const questions = [
    // Baseline Obedience
    {
      id: 1,
      text: "If an authority figure asked you to perform a task that conflicts with your personal values, how likely are you to comply?",
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/1.jpg"),
    },
    {
      id: 2,
      text: "If the task involves harming someone indirectly, would you proceed because you are 'just following orders'?",
      options: ["Yes", "No", "Not sure"],
      image: require("../assets/2.jpg"),
    },
    {
      id: 3,
      text: "Do you believe authority figures should always be obeyed, regardless of personal beliefs?",
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/3.jpg"),
    },

    {
      id: 4,
      text: "How much do you rely on the assumption that authority figures have better judgment than you?",
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/4.jpg"),
    },
    // Agentic State
    {
      id: 5,
      text: "If a superior told you that they would take full responsibility for your actions, would you feel less accountable?",
      options: ["Yes", "No", "Not sure"],
      image: require("../assets/5.jpg"),
    },
    {
      id: 6,
      text: "Do you believe that responsibility lies with the person giving the orders, not the person carrying them out?",
      options: ["Yes", "No", "Depends on the context"],
      image: require("../assets/6.jpg"),
    },
    {
      id: 7,
      text: "Would you be more likely to follow an order if it came from someone with expertise or higher authority?",
      options: ["Yes", "No", "Depends on the task"],
      image: require("../assets/7.jpg"),
    },
    {
      id: 8,
      text: "If you followed an order and caused harm, how much personal guilt would you feel?",
      options: ["A lot", "Some", "Very little", "None"],
      image: require("../assets/8.jpg"),
    },

    // Fear and Coercion
    {
      id: 9,
      text: "If refusing to follow orders would lead to job loss or punishment, how likely are you to comply?",
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/9.jpg"),
    },
    {
      id: 10,
      text: "If social rejection is a possible consequence of disobedience, how much does that influence your decision?",
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/10.jpg"),
    },
    {
      id: 11,
      text: "How likely are you to follow instructions if they are given under strict deadlines or high-pressure scenarios?",
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/11.jpg"),
    },
    {
      id: 12,
      text: "Does fear of confrontation with an authority figure make you more likely to obey?",
      options: ["Yes", "No", "Not sure"],
      image: require("../assets/12.jpeg"),
    },

    // Moral Autonomy
    {
      id: 13,
      text: "How comfortable are you in questioning authority when you believe their instructions are wrong?",
      options: [
        "Very uncomfortable",
        "Somewhat uncomfortable",
        "Comfortable",
        "Very comfortable",
      ],
      image: require("../assets/13.jpg"),
    },
    {
      id: 14,
      text: "If you were instructed to perform an action you believed was unethical, and the authority figure insisted that the responsibility would fall entirely on them, how likely are you to refuse the order?",
      options: ["Always", "Often", "Sometimes", "Rarely"],
      image: require("../assets/14.jpg"),
    },
    {
      id: 15,
      text: "Do you believe individuals have a moral duty to disobey unethical orders?",
      options: ["Yes", "No", "Depends on the context"],
      image: require("../assets/15.jpg"),
    },
    {
      id: 16,
      text: "How often do you trust your moral compass over instructions from an authority figure?",
      options: ["Always", "Often", "Sometimes", "Rarely"],
      image: require("../assets/16.jpg"),
    },

    // Social Proof
    {
      id: 17,
      text: "If you see others complying with an order, how much more likely are you to follow it?",
      options: [
        "A lot more likely",
        "Somewhat more likely",
        "Not much more likely",
        "Not at all",
      ],
      image: require("../assets/17.jpg"),
    },
    {
      id: 18,
      text: "If others refused to follow an unethical order, would it encourage you to resist as well?",
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/18.jpg"),
    },
    {
      id: 19,
      text: "When faced with a morally questionable situation, how much do the actions of your peers influence your decision?",
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/19.jpg"),
    },
    {
      id: 20,
      text: "If you were the only one refusing an order, how much harder would it be for you to stand firm?",
      options: [
        "A lot harder",
        "Somewhat harder",
        "Not much harder",
        "Not at all harder",
      ],
      image: require("../assets/20.jpg"),
    },

    // Ethical Awareness
    {
      id: 21,
      text: "How confident are you in recognizing unethical actions or instructions?",
      options: [
        "Very confident",
        "Somewhat confident",
        "Not very confident",
        "Not confident at all",
      ],
      image: require("../assets/21.png"),
    },
    {
      id: 22,
      text: "Do you evaluate the ethical consequences of your actions before following orders?",
      options: ["Always", "Sometimes", "Rarely", "Never"],
      image: require("../assets/22.jpg"),
    },
    {
      id: 23,
      text: "Do you believe it’s always your responsibility to question the ethics of an order?",
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/23.jpg"),
    },
    {
      id: 24,
      text: "If someone told you an action was unethical, how much would that impact your decision to do it?",
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/24.jpeg"),
    },

    // Cultural and Societal Norms
    {
      id: 25,
      text: "How much do societal expectations influence your decision to obey authority figures?",
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/25.jpeg"),
    },
  ];

  const handleAnswer = async (answer) => {
    const updatedResponses = {
      ...responses,
      [`q${questions[currentQuestionIndex].id}`]: answer, // Add the current answer
    };

    setResponses(updatedResponses); // Update the state

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      // Final question answered; submit responses to the server
      console.log("Final Responses:", updatedResponses); // Debugging log

      try {
        await fetch(`${BASE_URL}/api/survey`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: localStorage.getItem("userName") || "Anonymous",
            responses: updatedResponses,
          }),
        });

        navigate("/results", { state: { responses: updatedResponses } }); // Navigate to ResultsPage
      } catch (error) {
        console.error("Error submitting survey responses:", error);
      }
    }
  };

  return (
    <div styles={{ color: "#e0e0e0" }}>
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`, // Corrected with backticks
          }}
        />
      </div>
      <div
        style={{
          ...styles.container,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Progress Bar */}

        {/* Content Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Allows wrapping when space is limited
            flexDirection: "row", // Default layout
            justifyContent: "center", // Centers content
          }}
        >
          {/* Left Section: Question and Picture */}
          <div
            style={{
              ...styles.leftSection,
              flex: "1 1 300px", // Flexible sizing, minimum width
            }}
          >
            <p className="playfair" style={styles.text}>
              {questions[currentQuestionIndex].text}
            </p>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={styles.button}
                className="georgia surveybutton"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Right Section: Picture */}
          <div
            style={{
              ...styles.rightSection,
              flex: "1 1 300px", // Flexible sizing, minimum width
              marginTop: "20px", // Adds spacing when stacked
            }}
          >
            <img
              src={questions[currentQuestionIndex].image}
              alt={`Question ${currentQuestionIndex + 1} Illustration`}
              style={{
                ...styles.image,
                width: "100%", // Makes image responsive
                maxWidth: "400px", // Optional max size
                margin: "auto", // Centers the image
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
