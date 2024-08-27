const { ProfanityEngine } = require('profanity-check');

//immediate disallow for slurs or explicit sexual content
const slursOrSexualContent = [
    'nigger', 'nigga', 'sex', 'chink', 'fuck', 'rape' // replace with actual slurs/sexual terms
];

function checkForProfanity(text) {
    // false = no profanity, true = profanity
    if (!text) {
        return false;
    }

    const engine = new ProfanityEngine();

    // Split the text into words to scan each individually
    const words = text.toLowerCase().split(/\s+/);

    // Step 1: Check for any slurs or explicit sexual content
    for (const word of words) {
        if (slursOrSexualContent.includes(word)) {
            return true; // Immediately disallow the text if any slur or sexual content is found
        }
    }

    // Step 2: Rate the overall profanity level
    let profanityScore = 0;
    const profanityThreshold = 5; 

    for (const word of words) {
        if (engine.isProfane(word)) {
            if (['shit', 'hell', 'idiot', 'stupid', 'crap'].includes(word)) {
                profanityScore += 1; // Light profanity scores lower
            } else {
                profanityScore += 3; // Stronger profanity scores higher
            }
        }
    }

    // If the profanity score exceeds the threshold, disallow the text
    return profanityScore >= profanityThreshold;
}

module.exports = {
    checkForProfanity
};
