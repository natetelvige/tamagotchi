const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('nameInput');
const petContainer = document.getElementById('petContainer');
const petNameDisplay = document.getElementById('petName');
const petExpression = document.getElementById('petExpression');
const hungerStat = document.getElementById('hungerStat');
const happinessStat = document.getElementById('happinessStat');
const energyStat = document.getElementById('energyStat');
const message = document.getElementById('message');

const feedBtn = document.getElementById('feedBtn');
const playBtn = document.getElementById('playBtn');
const petBtn = document.getElementById('petBtn');
const sleepBtn = document.getElementById('sleepBtn');

let hunger = 5;    // 0 (full) - 10 (starving)
let happiness = 5; // 0 (sad) - 10 (happy)
let energy = 5;    // 0 (exhausted) - 10 (energetic)
let petName = '';
let sleeping = false;

// Kaomoji expressions for different states
function getExpression() {
  if (sleeping) {
    if (energy > 7) return "(づ｡--‿‿--｡)づ zzz";           // Sleeping peacefully
    return "(－_－) Zzz";                               // Sleeping tired
  }
  if (hunger >= 8) return "(×﹏×)";                       // Very hungry sad
  if (hunger >= 5 && happiness < 4) return "(T_T)";       // Hungry and sad
  if (hunger >= 5) return "((｡•́︿•̀｡)";                         // Hungry but okay
  if (energy <= 2) return "(－.－) ᶻ 𝗓 𐰁";                   // Sleepy
  if (happiness >= 8) return "(˶ᵔ ᵕ ᵔ˶) ‹𝟹";                    // Very happy
  if (happiness >= 5) return "૮ ˶ᵔ ᵕ ᵔ˶ ა";                   // Happy neutral
  if (happiness >= 3) return "(－_－)";                    // Tired or meh
  return "(；⌣̀_⌣́)";                                     // Sad
}

function updateStats() {
  hungerStat.textContent = hunger;
  happinessStat.textContent = happiness;
  energyStat.textContent = energy;
  petExpression.textContent = getExpression();
}

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    if (message.textContent === text) message.textContent = '';
  }, 3500);
}

// Start the game
startBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter a name for your pet!");
    return;
  }
  petName = name;
  petNameDisplay.textContent = petName;
  document.getElementById('nameInputContainer').style.display = 'none';
  petContainer.style.display = 'block';
  sleeping = false;
  hunger = 5;
  happiness = 5;
  energy = 5;
  updateStats();
};

// Feed the pet
feedBtn.onclick = () => {
  if (sleeping) {
    showMessage(`${petName} is sleeping, can't eat now! 😴`);
    return;
  }
  if (hunger > 0) {
    hunger = Math.max(hunger - 3, 0);
    happiness = Math.min(happiness + 1, 10);
    updateStats();
    showMessage(`${petName} enjoyed the food! 🍎`);
  } else {
    showMessage(`${petName} is not hungry! 🍽️`);
  }
};

// Play with the pet
playBtn.onclick = () => {
  if (sleeping) {
    showMessage(`${petName} is sleeping, let's not disturb... 😴`);
    return;
  }
  if (hunger >= 8) {
    showMessage(`${petName} is too hungry to play! 😢`);
    return;
  }
  if (energy <= 1) {
    showMessage(`${petName} is too tired to play! 😪`);
    return;
  }
  if (happiness < 10) {
    happiness = Math.min(happiness + 2, 10);
    hunger = Math.min(hunger + 2, 10);
    energy = Math.max(energy - 2, 0);
    updateStats();
    showMessage(`${petName} had fun playing! 🎾`);
  } else {
    showMessage(`${petName} is already happy! 😊`);
  }
};

// Pet the Tamagotchi
petBtn.onclick = () => {
  if (sleeping) {
    showMessage(`${petName} is sleeping. Pet them when awake! 💤`);
    return;
  }
  happiness = Math.min(happiness + 1, 10);
  energy = Math.min(energy + 1, 10);
  updateStats();
  showMessage(`Aww, ${petName} loved being petted! 🐾`);
};

// Put the Tamagotchi to sleep or wake it up
sleepBtn.onclick = () => {
  if (!sleeping) {
    sleeping = true;
    showMessage(`${petName} is going to sleep... 😴`);
    petExpression.textContent = getExpression();
    sleepBtn.textContent = "Wake Up ☀️";
  } else {
    sleeping = false;
    energy = Math.min(energy + 5, 10);
    happiness = Math.min(happiness + 1, 10);
    showMessage(`${petName} woke up refreshed! ☀️`);
    sleepBtn.textContent = "Sleep 😴";
    updateStats();
  }
};

// Hunger, energy, happiness change over time
setInterval(() => {
  if (petContainer.style.display === 'block') {
    if (!sleeping) {
      hunger = Math.min(hunger + 1, 10);
      energy = Math.max(energy - 1, 0);
      happiness = Math.max(happiness - 1, 0);
    } else {
      // Sleeping recovers energy slowly
      energy = Math.min(energy + 1, 10);
      // Hunger still increases but slower
      if (hunger < 10) hunger += 0.5;
    }
    updateStats();

    if (hunger >= 9) {
      showMessage(`${petName} is very hungry! Please feed! 🍎`);
    }
    if (energy <= 2 && !sleeping) {
      showMessage(`${petName} is very sleepy! Try making it sleep 😴`);
    }
    if (happiness <= 1 && !sleeping) {
      showMessage(`${petName} is feeling sad! Play or pet them! 🎾🐾`);
    }
  }
}, 15000);
