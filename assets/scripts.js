// ===============================
// FETCH PLANS LOGIC
// ===============================
async function fetchPlans(userInput) {
  try {
    const response = await fetch('/api/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    });

    const result = await response.json();
    console.log("Backend response:", result);

    const output = document.getElementById("result");
    if (output) {
      output.innerHTML = JSON.stringify(result, null, 2);
    }

    return result;

  } catch (err) {
    console.error("Error fetching plans:", err);
  }
}


// ===================================================================
// IMPORTANT:
// All old chat logic is removed because your new chat widget uses 
// assets/chat.js and partials/chat.html
//
// This ensures scripts.js does not crash the page.
// ===================================================================


// (If you need functions for your quiz or filters, they stay here later.)
