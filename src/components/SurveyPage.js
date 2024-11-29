import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    // Baseline Obedience
    { id: 1, 
      text: "If an authority figure asked you to perform a task that conflicts with your personal values, how likely are you to comply?", 
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"], 
      image: require("../assets/values.jpeg"), },
    { id: 2, 
      text: "If the task involves harming someone indirectly, would you proceed because you are 'just following orders'?", 
      options: ["Yes", "No", "Not sure"], 
      image: require("../assets/harm.png")},
    { id: 3, 
      text: "Do you believe authority figures should always be obeyed, regardless of personal beliefs?", 
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/authority.jpg") },
      
    { id: 4, 
      text: "How much do you rely on the assumption that authority figures have better judgment than you?", 
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/judgment.jpg")},
    // Agentic State
    { id: 5, 
      text: "If a superior told you that they would take full responsibility for your actions, would you feel less accountable?", 
      options: ["Yes", "No", "Not sure"],
      image: require("../assets/accountability.jpg") },
    { id: 6,
      text: "Do you believe that responsibility lies with the person giving the orders, not the person carrying them out?", 
      options: ["Yes", "No", "Depends on the context"],
      image: require("../assets/responsibility.jpg") },
    { id: 7, 
      text: "Would you be more likely to follow an order if it came from someone with expertise or higher authority?", 
      options: ["Yes", "No", "Depends on the task"],
      image: require("../assets/expertise.png") },
    { id: 8, 
      text: "If you followed an order and caused harm, how much personal guilt would you feel?", 
      options: ["A lot", "Some", "Very little", "None"],
      image: require("../assets/guilt.jpg") },
  
    // Fear and Coercion
    { id: 9, 
      text: "If refusing to follow orders would lead to job loss or punishment, how likely are you to comply?",
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/jobloss.jpg") },
    { id: 10, 
      text: "If social rejection is a possible consequence of disobedience, how much does that influence your decision?", 
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/social.png") },
    { id: 11, 
      text: "How likely are you to follow instructions if they are given under strict deadlines or high-pressure scenarios?", 
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/deadlines.jpg") },
    { id: 12, 
      text: "Does fear of confrontation with an authority figure make you more likely to obey?", 
      options: ["Yes", "No", "Not sure"],
      image: require("../assets/confrontation.jpg") },
  
    // Moral Autonomy
    { id: 13, 
      text: "How comfortable are you in questioning authority when you believe their instructions are wrong?", 
      options: ["Very uncomfortable", "Somewhat uncomfortable", "Comfortable", "Very comfortable"],
      image: require("../assets/wrong.jpeg") },
    { id: 14, 
      text: "If pressured to act quickly, do you still consider the ethical implications of your actions?", 
      options: ["Always", "Sometimes", "Rarely", "Never"],
      image: require("../assets/ethics.jpg") },
    { id: 15, 
      text: "Do you believe individuals have a moral duty to disobey unethical orders?", 
      options: ["Yes", "No", "Depends on the context"],
      image: require("../assets/morality.jpg") },
    { id: 16, 
      text: "How often do you trust your moral compass over instructions from an authority figure?", 
      options: ["Always", "Often", "Sometimes", "Rarely"],
      image: require("../assets/compass.jpeg") },
  
    // Social Proof
    { id: 17, 
      text: "If you see others complying with an order, how much more likely are you to follow it?", 
      options: ["A lot more likely", "Somewhat more likely", "Not much more likely", "Not at all"],
      image: require("../assets/comply.jpg") },
    { id: 18, 
      text: "If others refused to follow an unethical order, would it encourage you to resist as well?",
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/refuse.jpg") },
    { id: 19, 
      text: "When faced with a morally questionable situation, how much do the actions of your peers influence your decision?", 
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/follow.jpeg") },
    { id: 20, 
      text: "If you were the only one refusing an order, how much harder would it be for you to stand firm?", 
      options: ["A lot harder", "Somewhat harder", "Not much harder", "Not at all harder"],
      image: require("../assets/others.jpg") },
  
    // Ethical Awareness
    { id: 21, 
      text: "How confident are you in recognizing unethical actions or instructions?", 
      options: ["Very confident", "Somewhat confident", "Not very confident", "Not confident at all"],
      image: require("../assets/confident.jpg") },
    { id: 22, 
      text: "Do you evaluate the ethical consequences of your actions before following orders?", 
      options: ["Always", "Sometimes", "Rarely", "Never"],
      image: require("../assets/evaluate.jpg") },
    { id: 23, 
      text: "Do you believe it’s always your responsibility to question the ethics of an order?", 
      options: ["Yes", "No", "Depends on the situation"],
      image: require("../assets/res.jpg") },
    { id: 24, 
      text: "If someone told you an action was unethical, how likely are you to reconsider it?", 
      options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"],
      image: require("../assets/telling.jpg") },
  
    // Cultural and Societal Norms
    { id: 25, 
      text: "How much do societal expectations influence your decision to obey authority figures?", 
      options: ["A lot", "Somewhat", "Very little", "Not at all"],
      image: require("../assets/expectation.jpg") },
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
      console.log('Final Responses:', updatedResponses); // Debugging log
  
      try {
        await fetch('http://localhost:5000/api/survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: localStorage.getItem('userName') || 'Anonymous',
            responses: updatedResponses, // Ensure the last response is included
          }),
        });
        navigate('/results', { state: { responses: updatedResponses } }); // Navigate to ResultsPage
      } catch (error) {
        console.error('Error submitting survey responses:', error);
      }
    }
  };
  

  return (
    <div style={styles.container} className="background-container">
      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {/* Left Section: Question and Picture */}
        <div style={styles.leftSection}>
          <h2 style={styles.question}className="love-ya-like-a-sister-regular">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p className="funnel-sans-light" style={styles.text}>{questions[currentQuestionIndex].text}</p>
          <img
            src={questions[currentQuestionIndex].image} // Dynamically set the image URL
            alt={`Question ${currentQuestionIndex + 1} Illustration`}
            style={styles.image}
          />

        </div>

        {/* Right Section: Buttons */}
        <div style={styles.rightSection}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              style={styles.button}
              className="funnel-sans-light surveybutton" 
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  question: {
    fontSize: '35px'

  },
  text: {
    fontSize: '18px', 
    marginLeft: '40px',
    marginRight: '40px',
    marginBottom: '45px'
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#e0e0e0",
  },
  progressBarContainer: {
    height: "25px",
    backgroundColor: "#333",
    marginBottom: "20px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0096c7",
    transition: "width 0.3s ease",
  },
  content: {
    display: "flex",
    flex: 1,
    padding: "20px",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: '#1e1e1e', 
    borderRadius: '8px',
    marginRight: '20px',
    marginLeft: '60px',
    marginTop: '60px',
    marginBottom: '50px',
  },
  image: {
    maxWidth: "80%",
    borderRadius: "8px",
    marginTop: "20px",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    marginLeft: '20px',
    marginRight: '60px',
    marginTop: '60px',
    marginBottom: '50px',
  },
  button: {
    margin: "10px",
    padding: "42px 30px",
    // backgroundColor:' #0096c7',
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "80%",
    textAlign: "center",
    fontSize: '20px',
    
  },
};

export default SurveyPage;