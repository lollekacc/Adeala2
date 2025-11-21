// utils/priceCalculator.js


export default function calculatePrice(plan, peopleCount) {
// 1. SOLO PLANS
if (!plan.isFamilyPlan) {
return plan.price;
}


// 2. PACKAGED FAMILY PLANS
if (plan.familyPriceType === "packaged") {
const index = peopleCount - 1;


if (!plan.prices || !plan.prices[index]) {
console.warn("⚠️ Missing price for peopleCount:", peopleCount, "in plan:", plan.title);
return null;
}


return plan.prices[index];
}


// 3. ADDON FAMILY PLANS
if (plan.familyPriceType === "addon") {
if (!plan.price || !plan.addonPrice) {
console.warn("⚠️ Missing base or addon price in addon-plan:", plan.title);
return null;
}


if (peopleCount === 1) {
return plan.price;
}


const extraMembers = peopleCount - 1;
return plan.price + extraMembers * plan.addonPrice;
}


// 4. PER-PERSON FAMILY PLANS
if (plan.familyPriceType === "perPerson") {
if (!plan.price) {
console.warn("⚠️ Missing per-person price for plan:", plan.title);
return null;
}


return plan.price * peopleCount;
}


// 5. UNKNOWN
console.warn("⚠️ Unknown plan type:", plan.title);
return null;
}