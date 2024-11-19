import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    // Baseline Obedience
    { text: "If an authority figure asked you to perform a task that conflicts with your personal values, how likely are you to comply?", options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"] },
    { text: "If the task involves harming someone indirectly, would you proceed because you are 'just following orders'?", options: ["Yes", "No", "Not sure"] },
    { text: "Do you believe authority figures should always be obeyed, regardless of personal beliefs?", options: ["Yes", "No", "Depends on the situation"] },
    { text: "How much do you rely on the assumption that authority figures have better judgment than you?", options: ["A lot", "Somewhat", "Very little", "Not at all"] },

    // Agentic State
    { text: "If a superior told you that they would take full responsibility for your actions, would you feel less accountable?", options: ["Yes", "No", "Not sure"] },
    { text: "Do you believe that responsibility lies with the person giving the orders, not the person carrying them out?", options: ["Yes", "No", "Depends on the context"] },
    { text: "Would you be more likely to follow an order if it came from someone with expertise or higher authority?", options: ["Yes", "No", "Depends on the task"] },
    { text: "If you followed an order and caused harm, how much personal guilt would you feel?", options: ["A lot", "Some", "Very little", "None"] },

    // Fear and Coercion
    { text: "If refusing to follow orders would lead to job loss or punishment, how likely are you to comply?", options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"] },
    { text: "If social rejection is a possible consequence of disobedience, how much does that influence your decision?", options: ["A lot", "Somewhat", "Very little", "Not at all"] },
    { text: "How likely are you to follow instructions if they are given under strict deadlines or high-pressure scenarios?", options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"] },
    { text: "Does fear of confrontation with an authority figure make you more likely to obey?", options: ["Yes", "No", "Not sure"] },

    // Moral Autonomy
    { text: "How comfortable are you in questioning authority when you believe their instructions are wrong?", options: ["Very uncomfortable", "Somewhat uncomfortable", "Comfortable", "Very comfortable"] },
    { text: "If pressured to act quickly, do you still consider the ethical implications of your actions?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { text: "Do you believe individuals have a moral duty to disobey unethical orders?", options: ["Yes", "No", "Depends on the context"] },
    { text: "How often do you trust your moral compass over instructions from an authority figure?", options: ["Always", "Often", "Sometimes", "Rarely"] },

    // Social Proof
    { text: "If you see others complying with an order, how much more likely are you to follow it?", options: ["A lot more likely", "Somewhat more likely", "Not much more likely", "Not at all"] },
    { text: "If others refused to follow an unethical order, would it encourage you to resist as well?", options: ["Yes", "No", "Depends on the situation"] },
    { text: "When faced with a morally questionable situation, how much do the actions of your peers influence your decision?", options: ["A lot", "Somewhat", "Very little", "Not at all"] },
    { text: "If you were the only one refusing an order, how much harder would it be for you to stand firm?", options: ["A lot harder", "Somewhat harder", "Not much harder", "Not at all harder"] },

    // Ethical Awareness
    { text: "How confident are you in recognizing unethical actions or instructions?", options: ["Very confident", "Somewhat confident", "Not very confident", "Not confident at all"] },
    { text: "Do you evaluate the ethical consequences of your actions before following orders?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { text: "Do you believe it’s always your responsibility to question the ethics of an order?", options: ["Yes", "No", "Depends on the situation"] },
    { text: "If someone told you an action was unethical, how likely are you to reconsider it?", options: ["Very likely", "Somewhat likely", "Unlikely", "Very unlikely"] },

    // Cultural and Societal Norms
    { text: "How much do societal expectations influence your decision to obey authority figures?", options: ["A lot", "Somewhat", "Very little", "Not at all"] },
  ];

  const handleAnswer = (answer) => {
    setResponses({ ...responses, [`q${currentQuestionIndex + 1}`]: answer });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { responses } });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{questions[currentQuestionIndex].text}</p>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={styles.button}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#e0e0e0',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SurveyPage;
