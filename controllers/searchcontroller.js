// controllers/searchController.js


import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


import calculatePrice from "../utils/priceCalculator.js";
import { scoringEngine } from "../utils/scoringEngine.js";


// Fix ESM paths for Node v22+
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Load JSON manually
const plansPath = join(__dirname, "../data/plans.json");
const plans = JSON.parse(readFileSync(plansPath, "utf8"));


export const searchPlans = (req, res) => {
try {
const answers = req.body;
const peopleCount = Number(answers.peopleCount) || 1;


const results = plans.map(plan => {
const score = scoringEngine(plan, answers);


const totalPrice =
plan.category === "familj"
? calculatePrice(plan, peopleCount)
: plan.price;


return {
...plan,
totalPrice,
score
};
});


results.sort((a, b) => {
if (b.score === a.score) {
return a.totalPrice - b.totalPrice;
}
return b.score - a.score;
});

console.log("BODY RECEIVED:", answers);

return res.json({
success: true,
count: results.length,
results
});
} catch (error) {
console.error("Search error:", error);
return res.status(500).json({
success: false,
error: "Server error in searchController"
});
}
};