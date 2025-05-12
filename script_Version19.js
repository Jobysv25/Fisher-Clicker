let score = 0;
let money = 0;
let clickMultiplier = 1;
let moneyPerClick = 1;
let autoClickerActive = false;
let autoClickerCost = 1000;
let helperCost = 50000;
let sharkUpgradeCost = 100000000;
let doubleMoneyCost = 30;
let tripleMoneyCost = 100;
let fishUpgradeCost = 5000;
let rebirthCost = 5000000000; // Cost for Rebirth Upgrade
let helperMultiplier = 1;
let rebirthCount = 0; // Tracks how many times the player has rebirthed

const scoreElement = document.getElementById('score');
const moneyElement = document.getElementById('money');
const fish = document.getElementById('fish');
const autoClickerButton = document.getElementById('auto-clicker-button');
const helperUpgradeButton = document.getElementById('helper-upgrade-button');
const sharkUpgradeButton = document.getElementById('shark-upgrade-button');
const doubleMoneyButton = document.getElementById('double-money-button');
const tripleMoneyButton = document.getElementById('triple-money-button');
const fishUpgradeButton = document.getElementById('fish-upgrade-button');
const rebirthUpgradeButton = document.getElementById('rebirth-upgrade-button');
const bubblesContainer = document.getElementById('bubbles-container');
const medalContainer = document.getElementById('medal-container');

fish.addEventListener('click', () => {
  score += clickMultiplier;
  money += moneyPerClick * helperMultiplier;
  updateUI();
  checkUpgradeAvailability();
});

function checkUpgradeAvailability() {
  autoClickerButton.disabled = money < autoClickerCost;
  helperUpgradeButton.disabled = money < helperCost;
  sharkUpgradeButton.disabled = money < sharkUpgradeCost;
  doubleMoneyButton.disabled = money < doubleMoneyCost;
  tripleMoneyButton.disabled = money < tripleMoneyCost;
  fishUpgradeButton.disabled = money < fishUpgradeCost;
  rebirthUpgradeButton.disabled = money < rebirthCost; // Disable if insufficient funds
}

function updateUI() {
  scoreElement.textContent = score;
  moneyElement.textContent = money;
  doubleMoneyButton.textContent = `Double Money (Cost: $${doubleMoneyCost})`;
  tripleMoneyButton.textContent = `Triple Money (Cost: $${tripleMoneyCost})`;
  fishUpgradeButton.textContent = `Fish Upgrade (Cost: $${fishUpgradeCost})`;
  rebirthUpgradeButton.textContent = `Rebirth (Cost: $${rebirthCost})`;
}

// Rebirth Upgrade
rebirthUpgradeButton.addEventListener('click', () => {
  if (money >= rebirthCost) {
    money = 0;
    score = 0;
    rebirthCount++;
    const medal = document.createElement('img');
    medal.src = "medal-icon.png";
    medal.classList.add("medal");
    medalContainer.appendChild(medal);
    updateUI();
    checkUpgradeAvailability();
    alert(`Rebirth successful! You have rebirthed ${rebirthCount} time(s). Your money and score have been reset.`);
  }
});

// Add bubbles randomly
function spawnBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.left = `${Math.random() * 90}vw`; // Random horizontal position
  bubble.addEventListener('click', () => {
    money += 5; // Add $5 per click
    updateUI();
    bubble.remove(); // Remove bubble after click
  });

  bubblesContainer.appendChild(bubble);

  // Remove the bubble after it floats out of view
  setTimeout(() => {
    if (bubble.parentNode) {
      bubble.remove();
    }
  }, 4000); // Matches the animation duration
}

// Generate bubbles periodically
setInterval(spawnBubble, 2000); // Spawn a bubble every 2 seconds

updateUI();
checkUpgradeAvailability();