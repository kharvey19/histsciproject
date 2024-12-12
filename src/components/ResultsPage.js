import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Score from "react-score-indicator";
import CategoryCards from "./Carousel.js";
import refuseImage from "../assets/background.jpg";
import highlyObedientImage from "../assets/obedient.jpg";
import moderatelyObedientImage from "../assets/mod.jpg";
import resistantToAuthorityImage from "../assets/resistant.jpg";
import ScoreMeter from "./Score";

const BASE_URL = "https://limitless-earth-51296-7806e27eec8d.herokuapp.com";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  const location = useLocation();
  const [responses, setResponses] = useState(location.state?.responses || null);
  const [loading, setLoading] = useState(!responses);

  const categories = {
    baselineObedience: [1, 2, 3, 4],
    agenticState: [5, 6, 7, 8],
    fearAndCoercion: [9, 10, 11, 12],
    moralAutonomy: [13, 14, 15, 16],
    socialProof: [17, 18, 19, 20],
    ethicalAwareness: [21, 22, 23, 24],
    culturalNorms: [25],
  };

  const categoryWeights = {
    baselineObedience: 0.25,
    agenticState: 0.2,
    fearAndCoercion: 0.2,
    moralAutonomy: 0.15,
    socialProof: 0.1,
    ethicalAwareness: 0.1,
    culturalNorms: 0.05,
  };

  const historicalProfiles = [
    {
      name: "The Obedient Soldier",
      description:
        "This profile reflects high obedience, strong deferral of responsibility (agentic state), and low moral autonomy, similar to many soldiers in Nazi Germany who justified harmful actions as 'just following orders.' Soldiers in this group are influenced by the authority of their commanders, peer pressure, and social proof, which allow them to follow orders even when those orders lead to ethically questionable actions.",
      detailedExplanation:
        "This profile highlights how soldiers might follow orders without questioning authority, even when it goes against their personal morals. In this case, obedience to authority and peer pressure play a key role. High <strong>obedience</strong> and low <strong>moral autonomy</strong> are key characteristics, meaning the individual will prioritize authority over their own ethical compass, just as many Milgram participants did. Social proof and the group dynamic strongly influence their decisions, similar to how Milgram's participants often followed the experimenter's orders because they saw others doing the same.",
      threshold: 67,
      img: highlyObedientImage,
    },
    {
      name: "The Moderate Soldier",
      description:
        "This profile highlights obedience driven by fear, coercion, and social proof, similar to U.S. soldiers in the Vietnam War who followed orders to carry out civilian massacres. These soldiers were under intense stress and social pressure, leading them to comply with immoral orders. Some of them experienced moral conflict but succumbed to the overwhelming influence of authority and fear of punishment or rejection.",
      detailedExplanation:
        "Soldiers in this profile were pressured into obedience due to <strong>fear</strong> of consequences, <strong>coercion</strong>, and the <strong>social proof</strong> of their peers. This mirrors the findings from Milgram's study, where participants were more likely to obey when they feared punishment or were reassured by the experimenter's authority. Although these soldiers did show some level of <strong>moral conflict</strong>, they ultimately prioritized obedience and fear of retribution over their ethical concerns. Their <strong>moderate obedience</strong> and <strong>moderate moral autonomy</strong> make them more susceptible to authority in stressful situations.",
      threshold: 34,
      img: moderatelyObedientImage,
    },
    {
      name: "The Resistor",
      description:
        "This profile demonstrates high moral autonomy and resistance to authority, similar to individuals who resisted unethical orders in wartime, such as members of the White Rose resistance group during World War II. These individuals displayed strong moral clarity and were willing to risk their lives to stand up against immoral actions, refusing to comply with harmful orders even under extreme pressure.",
      detailedExplanation:
        "Individuals in this profile demonstrate a high level of <strong>moral autonomy</strong> and resistance to authority, willing to act according to their personal ethical standards rather than conforming to orders. Their <strong>low obedience</strong> and high <strong>ethical awareness</strong> indicate that they would resist authority figures if the orders conflicted with their moral values. They refuse to defer responsibility to authority and instead focus on their personal responsibility, reflecting the actions of the minority of Milgram participants who chose to disobey authority despite the social pressure to conform.",
      threshold: 0,
      img: resistantToAuthorityImage,
    },
  ];

  useEffect(() => {
    if (!responses) {
      const fetchLastSurveyData = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/survey/last`);
          const data = await res.json();
          setResponses(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching last survey data:", error);
          setLoading(false);
        }
      };

      fetchLastSurveyData();
    }
  }, [responses]);

  const calculateCategoryScore = (category) => {
    const questionIndices = categories[category];
    const scores = questionIndices.map((index) => {
      console.log("Current index:", index); // Log index
      console.log(responses);
      const answer = responses[`q${index}`];
      console.log(`Answer for q${index}:`, answer); // Log the corresponding answer
      if (
        answer === "Very likely" ||
        answer === "Yes" ||
        answer === "A lot" ||
        answer === "Always"
      )
        return 4;
      if (
        answer === "Somewhat likely" ||
        answer === "Somewhat" ||
        answer === "Often"
      )
        return 3;
      if (
        answer === "Unlikely" ||
        answer === "Very little" ||
        answer === "Sometimes"
      )
        return 2;
      if (
        answer === "Very unlikely" ||
        answer === "No" ||
        answer === "Not at all" ||
        answer === "Never"
      )
        return 1;
      return 0;
    });
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const calculateOverallScore = () => {
    return Object.keys(categories).reduce((total, category) => {
      const categoryScore = calculateCategoryScore(category);
      const weight = categoryWeights[category] || 0;
      return total + categoryScore * weight;
    }, 0);
  };

  const findClosestProfile = (overallScore) => {
    const score = (overallScore / 4) * 100;
    for (const profile of historicalProfiles) {
      if (score >= profile.threshold) {
        return profile;
      }
    }
    return null;
  };

  const overallScore = calculateOverallScore();
  const closestProfile = findClosestProfile(overallScore);

  const capitalize = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim();
  };

  const getOverallCategory = (overallScore) => {
    if (overallScore > 3) return "Highly Obedient";
    if (overallScore > 2) return "Moderately Obedient";
    return "Resistant to Authority";
  };

  const findMostInfluentialCategory = () => {
    let maxScore = 0;
    let mostInfluentialCategory = "";

    Object.keys(categories).forEach((category) => {
      const categoryScore =
        calculateCategoryScore(category) * (categoryWeights[category] || 1); // Weighted score
      if (categoryScore > maxScore) {
        maxScore = categoryScore;
        mostInfluentialCategory = category;
      }
    });

    return mostInfluentialCategory;
  };

  const mostInfluentialCategory = findMostInfluentialCategory();

  const overallCategory = getOverallCategory(overallScore);

  const insights = {
    baselineObedience: {
      high: "You demonstrate a high level of obedience to authority, similar to many participants in Milgram’s studies, where 65% of participants administered the highest shock level. This suggests a tendency to prioritize authority over personal morals.",
      moderate:
        "You show a balanced approach to authority. While you may comply in structured environments, you still demonstrate some level of personal judgment. This suggests a tendency to weigh orders against personal values in certain situations.",
      low: "You show a strong resistance to authority, prioritizing moral autonomy over obedience. This aligns with the minority of Milgram's participants who defied authority despite intense pressure.",
    },
    agenticState: {
      high: "You exhibit a tendency to defer responsibility to authority figures, entering what Milgram termed the 'agentic state.' This state allows individuals to view themselves as agents carrying out someone else’s will, reducing personal accountability.",
      moderate:
        "You may experience moments of deferring responsibility, but you also display some personal accountability. This suggests a willingness to take responsibility in less stressful scenarios, while potentially relying on authority in high-pressure situations.",
      low: "You demonstrate a strong sense of personal responsibility for your actions, resisting the 'agentic state.' Milgram observed this in the few participants who refused to comply with harmful orders, even under pressure.",
    },
    fearAndCoercion: {
      high: "Your decisions appear to be strongly influenced by fear and coercion. In Milgram’s experiments, participants often cited fear of conflict or punishment as reasons for compliance, even when they were visibly distressed.",
      moderate:
        "You are somewhat influenced by fear and coercion but retain the ability to act independently in less threatening situations. This suggests a tendency to weigh fear against personal values, making context-dependent decisions.",
      low: "You show resilience to fear and coercion, suggesting strong moral courage. This mirrors the minority of Milgram's participants who resisted authority despite potential consequences.",
    },
    moralAutonomy: {
      high: "You exhibit strong moral autonomy, demonstrating the ability to challenge unethical orders and act according to your values. Milgram noted that such behavior was uncommon, but those who defied authority displayed high moral integrity.",
      moderate:
        "You show some moral autonomy, questioning unethical orders in certain situations. However, this may depend on the context and the level of external pressure.",
      low: "You appear to struggle with asserting moral autonomy, which may lead to compliance with unethical orders. This aligns with the majority of Milgram’s participants who prioritized obedience over ethical considerations.",
    },
    socialProof: {
      high: "You are strongly influenced by the behavior of others. Milgram found that participants were more likely to obey when others complied and more likely to resist when others disobeyed, showing the power of group dynamics.",
      moderate:
        "Your decisions are somewhat influenced by the behavior of others. While group actions play a role in shaping your choices, you maintain some level of independent thought in certain situations.",
      low: "You demonstrate independence from social proof, resisting peer influence. This reflects the behavior of participants in Milgram’s studies who defied orders regardless of group behavior.",
    },
    ethicalAwareness: {
      high: "You display a high level of ethical awareness, recognizing and evaluating the morality of orders before acting. In Milgram’s experiments, participants with strong ethical awareness often expressed visible distress but occasionally resisted.",
      moderate:
        "You display moderate ethical awareness, occasionally considering the morality of orders before acting. However, this may not consistently override other factors, such as fear or group dynamics.",
      low: "You show a lower level of ethical awareness, which may make it harder to identify unethical actions. Milgram observed that participants with lower ethical awareness were more likely to comply without question.",
    },
    culturalNorms: {
      high: "Your decisions are heavily influenced by societal expectations and norms. Milgram’s studies demonstrated that cultural and situational factors significantly shaped obedience levels, with participants adhering to what they perceived as 'normal' behavior.",
      moderate:
        "You are moderately influenced by societal norms, allowing external expectations to shape your actions in some cases. However, you still retain the ability to act independently in specific scenarios.",
      low: "You exhibit independence from societal norms, making decisions based on personal principles. This aligns with participants in Milgram’s experiments who defied expectations and acted according to their values.",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!responses) {
    return (
      <div style={styles.container}>
        <h2>Error loading results. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div>
        <h1 className="playfair">Survey Results</h1>
        <p className="georgia">
          Your responses have been analyzed based on Milgram's studies. Here are
          your results:
        </p>

        <div>
          <div>
            <div style={styles.card}>
              <h2 className="playfair">Overall Assessment</h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ScoreMeter value={((overallScore / 4) * 100).toFixed(2)} />
              </div>

              <div className="georgia" style={{ textAlign: "center" }}>
                {/* Button to toggle explanation */}
                <button
                  className="georgia"
                  onClick={toggleExplanation}
                  style={{
                    margin: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#0096c7",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  What does this mean?
                </button>

                {/* Explanation text */}
                {showExplanation && (
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "8px",
                      marginTop: "10px",
                      backgroundColor: "#00000010",
                      fontSize: "13px",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "20px",
                        marginTop: "15px",
                        textAlign: "left",
                        margin: "10px",
                      }}
                    >
                      <p style={{ marginBottom: "5px" }}>
                        <span style={{ fontWeight: "bold" }}>Below 33%:</span>{" "}
                        You are on the more resistant side, showing strong moral
                        autonomy and a lower likelihood of following authority.
                      </p>
                      <p style={{ marginBottom: "5px" }}>
                        <span style={{ fontWeight: "bold" }}>34%–66%:</span> You
                        are moderately influenced by obedience traits, balancing
                        moral independence and a willingness to follow
                        authority.
                      </p>
                      <p style={{ marginBottom: "5px" }}>
                        <span style={{ fontWeight: "bold" }}>Above 67%:</span>{" "}
                        You are highly obedient, showing a stronger tendency to
                        align with authority figures.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {overallCategory === "Highly Obedient" && (
                <p className="georgia">
                  Your results show that you have astrong tendency to follow
                  authority! This aligns with the majority of Milgram's
                  participants (around 65%) who continued to administer shocks
                  up to the maximum voltage despite clear signs of distress from
                  the learner.
                </p>
              )}
              {overallCategory === "Moderately Obedient" && (
                <p className="georgia">
                  Your results show that you have a balanced approach when
                  making decisions! You have a tendency to obey authority in
                  some situations while you exercise moral judgment in others.
                </p>
              )}
              {overallCategory === "Resistant to Authority" && (
                <p className="georgia">
                  Your results show that you have a strong resistance to
                  authority! You prioritize personal values and moral autonomy
                  over compliance. Aka, you stand up for what you believe in!
                </p>
              )}
            </div>

            <div style={styles.card}>
              <h2 className="playfair">Your Most Influential Element</h2>
              {mostInfluentialCategory ? (
                <>
                  <p>
                    <span className="georgia" style={{ fontWeight: "bold" }}>
                      {capitalize(mostInfluentialCategory)}:{" "}
                    </span>
                    {insights[mostInfluentialCategory]?.high}
                  </p>
                </>
              ) : (
                <p>
                  Unable to determine the most influential element at this time.
                </p>
              )}
            </div>

            <div style={styles.card}>
              <h2 className="playfair">
                {" "}
                Elements that Impact your Obedience to Authority{" "}
              </h2>

              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  marginBottom: "40px",
                }}
              >
                <div style={{ paddingLeft: "20px", paddingBottom: "40px" }}>
                  <CategoryCards
                    categories={categories}
                    calculateCategoryScore={calculateCategoryScore}
                    insights={insights}
                  />
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h2 className="playfair">
                Historical Profile: {closestProfile.name}
              </h2>
              <div style={{ textAlign: "center" }}>
                <img
                  src={closestProfile.img}
                  alt={`${overallCategory} illustration`}
                  style={styles.image2}
                />
              </div>

              {closestProfile ? (
                <>
                  <p className="georgia">{closestProfile.description}</p>
                </>
              ) : (
                <p>No closely matching historical profile found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="georgia"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0096c7",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/thank-you")}
      >
        Finish Survey
      </button>
    </div>
  );
};

const styles = {
  image: {
    width: "100%", // Let the image take up full width of its container
    maxWidth: "700px", // Maximum width for the image
    height: "auto", // Maintain aspect ratio
    objectFit: "contain", // Prevent distortion
    borderRadius: "4px",
    marginBottom: "100px",
  },
  image2: {
    width: "100%", // Let the image take up full width of its container
    maxWidth: "300px", // Maximum width for the image
    height: "auto", // Maintain aspect ratio
    objectFit: "contain", // Prevent distortion
    borderRadius: "4px",
  },
  sideBySideContainer: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: 'stretch', // Ensures equal height for children
    // gap: '20px', // Space between the cards
    alignItems: "stretch",
    marginBottom: "20px",
    margin: "0 auto", // Centers the container horizontally
    width: "90%", // Adjust the width as needed
    maxWidth: "1200px", // Ensure it doesn't stretch too much on large screens
    gap: "40px",
  },
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#dbe7e4",
    color: "black",
    minHeight: "100vh", // Ensures it covers at least the viewport height
    height: "auto", // Allows it to grow as content expands
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    backgroundPosition: "top left",
  },
  card: {
    backgroundColor: "#dbe7e4",
    padding: "2px",
    margin: "15px auto",
    borderRadius: "8px",
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    maxWidth: "600px",
    textAlign: "left",
    // border: '1px solid black',
  },
  progressBar: {
    height: "20px",
    width: "100%",
    backgroundColor: "#333",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
};

export default ResultsPage;
