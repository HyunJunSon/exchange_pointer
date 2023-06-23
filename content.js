// Listen for mouse events on the page
document.addEventListener("mousedown", handleMouseDown);

// Handle mouse down event
function handleMouseDown(event) {
  if (event.button === 0 && event.target.textContent) {
    const amount = event.target.textContent.trim();
    if (amount.startsWith("$")) {
      const value = parseFloat(amount.substring(1));
      if (!isNaN(value)) {
        const rate = getExchangeRate(); // Replace with your API call to fetch exchange rate
        const convertedAmount = (value * rate).toFixed(2);
        showExchangeRate(event.clientX, event.clientY, convertedAmount);
      }
    }
  }
}

// Function to fetch exchange rate from API
async function getExchangeRate() {
    const apiUrl = 'https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID'; // Replace with your Open Exchange Rates app ID
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Extract the exchange rate from the response data
      const exchangeRate = data?.rates?.KRW; // Replace 'KRW' with the desired currency code
  
      if (exchangeRate) {
        return exchangeRate;
      } else {
        throw new Error('Exchange rate not found in the API response');
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }
  

// Function to display the exchange rate above the mouse pointer
function showExchangeRate(x, y, amount) {
  const rateElement = document.createElement("div");
  rateElement.style.position = "fixed";
  rateElement.style.top = `${y}px`;
  rateElement.style.left = `${x}px`;
  rateElement.style.background = "rgba(0, 0, 0, 0.7)";
  rateElement.style.color = "white";
  rateElement.style.padding = "5px";
  rateElement.style.borderRadius = "5px";
  rateElement.style.zIndex = "9999";
  rateElement.textContent = `Korean Won: ${amount}`;

  document.body.appendChild(rateElement);

  // Remove the element after a delay (e.g., 3 seconds)
  setTimeout(() => {
    rateElement.remove();
  }, 3000);
}