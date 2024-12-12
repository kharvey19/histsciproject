const historicalProfiles = [
  {
    name: "The Obedient Soldier",
    threshold: 67,
    description:
      "This profile reflects high obedience, strong deferral of responsibility (agentic state), and low moral autonomy.",
  },
  {
    name: "The Moderate Soldier",
    threshold: 34,
    description:
      "This profile highlights obedience driven by fear, coercion, and social proof.",
  },
  {
    name: "The Resistor",
    threshold: 0,
    description:
      "This profile demonstrates high moral autonomy and resistance to authority.",
  },
];

const findClosestProfile = (overallScore) => {
  for (const profile of historicalProfiles) {
    if (overallScore >= profile.threshold) {
      return profile;
    }
  }
  return null;
};

const printClosestProfile = (overallScore) => {
  const profile = findClosestProfile(overallScore);
  if (profile) {
    console.log(`Closest Profile: ${profile.name}`);
    console.log(`Description: ${profile.description}`);
  } else {
    console.log("No matching historical profile found.");
  }
};

if (require.main === module) {
  const testScores = [20, 44, 80];
  testScores.forEach((score) => {
    console.log(`\nTesting with score: ${score}`);
    printClosestProfile(score);
  });
}

module.exports = { findClosestProfile, printClosestProfile };
