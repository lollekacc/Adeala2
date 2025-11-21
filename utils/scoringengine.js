// utils/scoringEngine.js


export function scoringEngine(plan, answers) {
let score = 0;


// 1. CATEGORY MATCH
if (answers.category && plan.category === answers.category) {
score += 30;
}


// 2. DATA NEED
if (answers.dataNeed) {
if (plan.dataAmount >= answers.dataNeed) {
score += 40;
} else {
score -= 20;
}
}


// 3. SPEED NEED
if (answers.speedNeed) {
const speedText = plan.speed ? plan.speed.toLowerCase() : "";


if (answers.speedNeed === "high" && speedText.includes("1000"))
score += 30;
if (answers.speedNeed === "medium" && speedText.includes("100"))
score += 20;
if (answers.speedNeed === "low") score += 10;
}


// 4. OPERATOR PREFERENCE
if (answers.preferredOperator) {
if (plan.operator === answers.preferredOperator) {
score += 15;
}
}


// 5. BUDGET RANGE
if (answers.budget && plan.price) {
if (plan.price <= answers.budget) score += 25;
else score -= 20;
}


// 6. FAMILY SIZE HANDLING
if (answers.peopleCount) {
if (plan.category === "familj") score += 25;
else if (answers.peopleCount > 1) score -= 30;
}


return score;
}