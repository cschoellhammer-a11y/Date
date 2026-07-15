const screens = document.querySelectorAll(".screen");

const introContent = document.getElementById("introContent");
const giftButton = document.getElementById("giftButton");

const dateButtons = document.getElementById("dateButtons");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const errorPopup = document.getElementById("errorPopup");
const closePopup = document.getElementById("closePopup");

const speechBubble = document.getElementById("speechBubble");

const optionButtons = document.querySelectorAll(".option-button[data-choice]");
const timeButtons = document.querySelectorAll(".time-button");

const selectedActivityText = document.getElementById("selectedActivity");
const finalChoiceText = document.getElementById("finalChoice");

let selectedActivity = "";
let selectedTime = "";

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(screenId);

  nextScreen.classList.add("active");
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function startIntro() {
  await wait(5000);

  introContent.classList.remove("hidden");
}

async function openGift() {
  createParty();

  giftButton.disabled = true;

  await wait(1600);

  showScreen("dateScreen");

  await wait(5000);

  dateButtons.classList.remove("hidden");
}

function moveNoButton() {
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const padding = 15;

  const maxX = window.innerWidth - buttonWidth - padding;
  const maxY = window.innerHeight - buttonHeight - padding;

  const randomX = Math.max(
    padding,
    Math.floor(Math.random() * maxX)
  );

  const randomY = Math.max(
    padding,
    Math.floor(Math.random() * maxY)
  );

  noButton.style.position = "fixed";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function showErrorPopup() {
  errorPopup.classList.add("visible");

  setTimeout(() => {
    errorPopup.classList.remove("visible");
  }, 1800);
}

async function acceptDate() {
  noButton.style.display = "none";

  showScreen("celebrationScreen");

  createParty();

  await wait(1300);

  speechBubble.classList.remove("hidden");

  await wait(3500);

  showScreen("activityScreen");
}

function selectActivity(event) {
  selectedActivity = event.currentTarget.dataset.choice;

  selectedActivityText.textContent =
    `Du har valgt: ${selectedActivity} ❤️`;

  showScreen("timeScreen");
}

function selectTime(event) {
  selectedTime = event.currentTarget.dataset.time;

  finalChoiceText.textContent =
    `${selectedActivity} – ${selectedTime}`;

  showScreen("finalScreen");

  createParty();

  setInterval(() => {
    createFireworks(2);
  }, 1500);
}

function createParty() {
  createConfetti(120);
  createFireworks(8);
}

function createConfetti(amount) {
  const colors = [
    "#ff006e",
    "#00b4d8",
    "#ff5400",
    "#8338ec",
    "#06d6a0",
    "#ffffff",
    "#ff4d6d"
  ];

  for (let index = 0; index < amount; index += 1) {
    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left = `${Math.random() * 100}vw`;

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;

    confetti.style.animationDelay =
      `${Math.random() * 0.7}s`;

    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6000);
  }
}

function createFireworks(amount) {
  const colors = [
    "#ff006e",
    "#00b4d8",
    "#ff5400",
    "#8338ec",
    "#06d6a0",
    "#ffffff"
  ];

  for (let fireworkIndex = 0; fireworkIndex < amount; fireworkIndex += 1) {
    const centerX =
      window.innerWidth * (0.1 + Math.random() * 0.8);

    const centerY =
      window.innerHeight * (0.1 + Math.random() * 0.55);

    const fireworkColor =
      colors[Math.floor(Math.random() * colors.length)];

    for (let particleIndex = 0; particleIndex < 30; particleIndex += 1) {
      const particle = document.createElement("div");

      particle.classList.add("firework-particle");

      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.background = fireworkColor;

      const angle =
        (Math.PI * 2 * particleIndex) / 30;

      const distance =
        70 + Math.random() * 110;

      particle.style.setProperty(
        "--move-x",
        `${Math.cos(angle) * distance}px`
      );

      particle.style.setProperty(
        "--move-y",
        `${Math.sin(angle) * distance}px`
      );

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1300);
    }
  }
}

giftButton.addEventListener("click", openGift);

yesButton.addEventListener("click", acceptDate);

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

noButton.addEventListener("click", showErrorPopup);

closePopup.addEventListener("click", () => {
  errorPopup.classList.remove("visible");
});

optionButtons.forEach((button) => {
  button.addEventListener("click", selectActivity);
});

timeButtons.forEach((button) => {
  button.addEventListener("click", selectTime);
});

window.addEventListener("resize", () => {
  noButton.style.position = "relative";
  noButton.style.left = "auto";
  noButton.style.top = "auto";
});

startIntro();
