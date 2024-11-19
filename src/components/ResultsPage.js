import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const responses = location.state.responses;

  const categories = {
    baselineObedience: [1, 2, 3, 4],
    agenticState: [5, 6, 7, 8],
    fearAndCoercion: [9, 10, 11, 12],
    moralAutonomy: [13, 14, 15, 16],
    socialProof: [17, 18, 19, 20],
    ethicalAwareness: [21, 22, 23, 24],
    culturalNorms: [25],
  };

  const calculateCategoryScore = (category) => {
    const questionIndices = categories[category];
    const scores = questionIndices.map((index) => {
      const answer = responses[`q${index}`];
      if (answer === "Very likely" || answer === "Yes" || answer === "A lot" || answer === "Always") return 4;
      if (answer === "Somewhat likely" || answer === "Somewhat" || answer === "Often") return 3;
      if (answer === "Unlikely" || answer === "Very little" || answer === "Sometimes") return 2;
      if (answer === "Very unlikely" || answer === "No" || answer === "Not at all" || answer === "Never") return 1;
      return 0; // Default fallback
    });
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const calculateOverallScore = () => {
    const allScores = Object.keys(categories).map((category) =>
      calculateCategoryScore(category)
    );
    return allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  };

  const capitalize = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase()) // Capitalize first letter
      .trim();
  };

  const getOverallCategory = (overallScore) => {
    if (overallScore > 3) return "Highly Obedient";
    if (overallScore > 2) return "Moderately Obedient";
    return "Resistant to Authority";
  };

  const overallScore = calculateOverallScore();
  const overallCategory = getOverallCategory(overallScore);

  const insights = {
    baselineObedience: {
      high: "You demonstrate a high level of obedience to authority, similar to many participants in Milgram’s studies, where 65% of participants administered the highest shock level. This suggests a tendency to prioritize authority over personal morals.",
      low: "You show a strong resistance to authority, prioritizing moral autonomy over obedience. This aligns with the minority of Milgram's participants who defied authority despite intense pressure."
    },
    agenticState: {
      high: "You exhibit a tendency to defer responsibility to authority figures, entering what Milgram termed the 'agentic state.' This state allows individuals to view themselves as agents carrying out someone else’s will, reducing personal accountability.",
      low: "You demonstrate a strong sense of personal responsibility for your actions, resisting the 'agentic state.' Milgram observed this in the few participants who refused to comply with harmful orders, even under pressure."
    },
    fearAndCoercion: {
      high: "Your decisions appear to be strongly influenced by fear and coercion. In Milgram’s experiments, participants often cited fear of conflict or punishment as reasons for compliance, even when they were visibly distressed.",
      low: "You show resilience to fear and coercion, suggesting strong moral courage. This mirrors the minority of Milgram's participants who resisted authority despite potential consequences."
    },
    moralAutonomy: {
      high: "You exhibit strong moral autonomy, demonstrating the ability to challenge unethical orders and act according to your values. Milgram noted that such behavior was uncommon, but those who defied authority displayed high moral integrity.",
      low: "You appear to struggle with asserting moral autonomy, which may lead to compliance with unethical orders. This aligns with the majority of Milgram’s participants who prioritized obedience over ethical considerations."
    },
    socialProof: {
      high: "You are strongly influenced by the behavior of others. Milgram found that participants were more likely to obey when others complied and more likely to resist when others disobeyed, showing the power of group dynamics.",
      low: "You demonstrate independence from social proof, resisting peer influence. This reflects the behavior of participants in Milgram’s studies who defied orders regardless of group behavior."
    },
    ethicalAwareness: {
      high: "You display a high level of ethical awareness, recognizing and evaluating the morality of orders before acting. In Milgram’s experiments, participants with strong ethical awareness often expressed visible distress but occasionally resisted.",
      low: "You show a lower level of ethical awareness, which may make it harder to identify unethical actions. Milgram observed that participants with lower ethical awareness were more likely to comply without question."
    },
    culturalNorms: {
      high: "Your decisions are heavily influenced by societal expectations and norms. Milgram’s studies demonstrated that cultural and situational factors significantly shaped obedience levels, with participants adhering to what they perceived as 'normal' behavior.",
      low: "You exhibit independence from societal norms, making decisions based on personal principles. This aligns with participants in Milgram’s experiments who defied expectations and acted according to their values."
    }
  };

  return (
    <div style={styles.container}>
      <h1>Survey Results</h1>
      <p>Your responses have been analyzed based on Milgram's studies. Here are your results:</p>

      <div style={styles.card}>
        <h2>Overall Assessment</h2>
        <p><strong>Overall Score:</strong> {overallScore.toFixed(2)} / 4</p>
        <p><strong>Overall Category:</strong> {overallCategory}</p>
        {overallCategory === "Highly Obedient" && (
          <p>Your responses indicate a strong tendency to follow authority, aligning with the majority of Milgram's participants who obeyed even under morally questionable conditions.</p>
        )}
        {overallCategory === "Moderately Obedient" && (
          <p>Your responses suggest a balanced approach, with a tendency to obey authority in some situations while exercising moral judgment in others.</p>
        )}
        {overallCategory === "Resistant to Authority" && (
          <p>Your responses show strong resistance to authority, prioritizing personal values and moral autonomy over compliance. This aligns with the minority of Milgram's participants who defied orders under pressure.</p>
        )}
      </div>

      {Object.keys(categories).map((category, index) => {
        const score = calculateCategoryScore(category);
        const level = score > 3 ? "High" : score > 2 ? "Moderate" : "Low";
        const categoryInsight =
          score > 3
            ? insights[category].high
            : score > 2
            ? insights[category].moderate || insights[category].low
            : insights[category].low;

        return (
          <div key={index} style={styles.card}>
            <h3>{capitalize(category)}</h3>
            <p><strong>Level:</strong> {level}</p>
            <p>{categoryInsight}</p>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${(score / 4) * 100}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#121212',
    color: '#e0e0e0',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '15px',
    margin: '15px auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    maxWidth: '600px',
    textAlign: 'left',
  },
  progressBar: {
    height: '20px',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: '10px',
    marginTop: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: '10px',
    transition: 'width 0.3s ease',
  },
};

export default ResultsPage;
