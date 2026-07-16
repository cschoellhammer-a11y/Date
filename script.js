const screens = document.querySelectorAll(".screen");

const introContent = document.getElementById("introContent");
const giftButton = document.getElementById("giftButton");

const dateButtons = document.getElementById("dateButtons");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const errorPopup = document.getElementById("errorPopup");
const closePopup = document.getElementById("closePopup");

const speechBubble = document.getElementById("speechBubble");

const optionButtons =
  document.querySelectorAll(".option-button[data-choice]");

const timeButtons =
  document.querySelectorAll(".time-button");

const selectedActivityText =
  document.getElementById("selectedActivity");

const finalChoiceText =
  document.getElementById("finalChoice");

let selectedActivity = "";
let selectedTime = "";
let finalFireworksStarted = false;


function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}


async function showScreen(screenId) {
  const currentScreen =
    document.querySelector(".screen.active");

  const nextScreen =
    document.getElementById(screenId);

  if (currentScreen === nextScreen) {
    return;
  }

  if (currentScreen) {
    currentScreen.classList.add("leaving");

    await wait(650);

    currentScreen.classList.remove("active");
    currentScreen.classList.remove("leaving");
  }

  nextScreen.classList.add("active");
}


async function startIntro() {
  await wait(5000);

  introContent.classList.remove("hidden");
}


async function openGift() {
  giftButton.disabled = true;

  createConfetti(100);

  launchRocket({
    curve: "straight",
    targetX: window.innerWidth * 0.25,
    targetY: window.innerHeight * 0.28
  });

  await wait(350);

  launchRocket({
    curve: "right",
    targetX: window.innerWidth * 0.72,
    targetY: window.innerHeight * 0.26
  });

  await wait(1850);

  await showScreen("dateScreen");

  await wait(5000);

  dateButtons.classList.remove("hidden");
}


function moveNoButton() {
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const padding = 20;

  const maxX =
    window.innerWidth - buttonWidth - padding;

  const maxY =
    window.innerHeight - buttonHeight - padding;

  const randomX =
    padding + Math.random() * Math.max(1, maxX - padding);

  const randomY =
    padding + Math.random() * Math.max(1, maxY - padding);

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

  await showScreen("celebrationScreen");

  createConfetti(110);

  await wait(250);

  startDancerFireworks();

  await wait(1500);

  speechBubble.classList.remove("hidden");

  await wait(4300);

  await showScreen("activityScreen");
}


function selectActivity(event) {
  selectedActivity =
    event.currentTarget.dataset.choice;

  selectedActivityText.textContent =
    `Du har valgt: ${selectedActivity} ❤️`;

  showScreen("timeScreen");
}


async function selectTime(event) {
  selectedTime =
    event.currentTarget.dataset.time;

  finalChoiceText.textContent =
    `${selectedActivity} – ${selectedTime}`;

  await showScreen("finalScreen");

  createConfetti(140);

  startFinalDanceFireworks();
}


/* ======================================================
   CONFETTI
====================================================== */

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

    confetti.style.left =
      `${Math.random() * 100}vw`;

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration =
      `${2.5 + Math.random() * 2.5}s`;

    confetti.style.animationDelay =
      `${Math.random() * 0.8}s`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6500);
  }
}


/* ======================================================
   REALISTIC ROCKET SYSTEM
====================================================== */

function launchRocket({
  curve = "straight",
  targetX,
  targetY,
  heart = false
}) {
  const rocket = document.createElement("div");

  rocket.className = "rocket";

  const startX =
    window.innerWidth * (0.15 + Math.random() * 0.7);

  const startY =
    window.innerHeight + 30;

  rocket.style.left = `${startX}px`;
  rocket.style.top = `${startY}px`;

  document.body.appendChild(rocket);

  const duration =
    1150 + Math.random() * 550;

  const launchStart =
    performance.now();

  let lastSmokeTime = 0;

  function animateRocket(now) {
    const elapsed =
      now - launchStart;

    const progress =
      Math.min(elapsed / duration, 1);

    const eased =
      1 - Math.pow(1 - progress, 3);

    let currentX;
    let currentY;

    const deltaX =
      targetX - startX;

    const deltaY =
      targetY - startY;

    if (curve === "left") {
      currentX =
        startX +
        deltaX * eased -
        Math.sin(progress * Math.PI) * 130;
    } else if (curve === "right") {
      currentX =
        startX +
        deltaX * eased +
        Math.sin(progress * Math.PI) * 130;
    } else if (curve === "loop") {
      const loopStrength =
        Math.sin(progress * Math.PI * 2) *
        (1 - progress) *
        125;

      currentX =
        startX +
        deltaX * eased +
        loopStrength;
    } else {
      currentX =
        startX + deltaX * eased;
    }

    currentY =
      startY + deltaY * eased;

    rocket.style.left =
      `${currentX}px`;

    rocket.style.top =
      `${currentY}px`;

    const angle =
      Math.atan2(
        currentY - startY,
        currentX - startX
      );

    rocket.style.transform =
      `rotate(${angle + Math.PI / 2}rad)`;

    if (now - lastSmokeTime > 38) {
      createSmoke(currentX, currentY + 20);

      lastSmokeTime = now;
    }

    if (progress < 1) {
      requestAnimationFrame(animateRocket);
    } else {
      rocket.remove();

      if (heart) {
        explodeHeart(currentX, currentY);
      } else {
        explodeFirework(currentX, currentY);
      }
    }
  }

  requestAnimationFrame(animateRocket);
}


function createSmoke(x, y) {
  const smoke = document.createElement("div");

  smoke.className = "smoke";

  smoke.style.left =
    `${x + (Math.random() - 0.5) * 10}px`;

  smoke.style.top =
    `${y + (Math.random() - 0.5) * 8}px`;

  document.body.appendChild(smoke);

  setTimeout(() => {
    smoke.remove();
  }, 1400);
}


function explodeFirework(x, y) {
  const colors = [
    "#ff1744",
    "#ff9500",
    "#ffe600",
    "#00e5ff",
    "#36ff75",
    "#c65cff",
    "#ffffff"
  ];

  const color =
    colors[Math.floor(Math.random() * colors.length)];

  const particleAmount =
    54;

  for (
    let particleIndex = 0;
    particleIndex < particleAmount;
    particleIndex += 1
  ) {
    const particle =
      document.createElement("div");

    particle.className = "spark";

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = color;
    particle.style.color = color;

    document.body.appendChild(particle);

    const angle =
      (Math.PI * 2 * particleIndex) /
      particleAmount +
      Math.random() * 0.08;

    const speed =
      75 + Math.random() * 150;

    const gravity =
      95 + Math.random() * 55;

    const startTime =
      performance.now();

    const lifespan =
      1100 + Math.random() * 700;

    function animateParticle(now) {
      const elapsed =
        (now - startTime) / 1000;

      const progress =
        Math.min(
          (now - startTime) / lifespan,
          1
        );

      const moveX =
        Math.cos(angle) * speed * elapsed;

      const moveY =
        Math.sin(angle) * speed * elapsed +
        gravity * elapsed * elapsed;

      particle.style.transform =
        `translate(${moveX}px, ${moveY}px)`;

      particle.style.opacity =
        `${1 - progress}`;

      particle.style.width =
        `${5 - progress * 3}px`;

      particle.style.height =
        `${5 - progress * 3}px`;

      if (progress < 1) {
        requestAnimationFrame(animateParticle);
      } else {
        particle.remove();
      }
    }

    requestAnimationFrame(animateParticle);
  }
}


/* ======================================================
   HEART FIREWORK
====================================================== */

function explodeHeart(centerX, centerY) {
  const totalParticles = 90;

  for (
    let index = 0;
    index < totalParticles;
    index += 1
  ) {
    const particle =
      document.createElement("div");

    particle.className =
      "heart-particle";

    particle.style.left =
      `${centerX}px`;

    particle.style.top =
      `${centerY}px`;

    document.body.appendChild(particle);

    const t =
      (Math.PI * 2 * index) /
      totalParticles;

    /*
      Mathematical heart shape
    */
    const heartX =
      16 * Math.pow(Math.sin(t), 3);

    const heartY =
      -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

    const scale =
      Math.min(
        window.innerWidth / 62,
        8
      );

    const targetX =
      heartX * scale;

    const targetY =
      heartY * scale;

    const startTime =
      performance.now();

    const duration =
      1450;

    function animateHeart(now) {
      const progress =
        Math.min(
          (now - startTime) / duration,
          1
        );

      const eased =
        1 - Math.pow(1 - progress, 3);

      particle.style.transform =
        `translate(
          ${targetX * eased}px,
          ${targetY * eased}px
        )`;

      if (progress > 0.72) {
        particle.style.opacity =
          `${1 - (progress - 0.72) / 0.28}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateHeart);
      } else {
        particle.remove();
      }
    }

    requestAnimationFrame(animateHeart);
  }
}


/* ======================================================
   FIREWORK SEQUENCES
====================================================== */

async function startDancerFireworks() {
  const centerX =
    window.innerWidth / 2;

  const centerY =
    window.innerHeight * 0.43;

  launchRocket({
    curve: "straight",
    targetX: centerX - 230,
    targetY: centerY - 90
  });

  await wait(500);

  launchRocket({
    curve: "right",
    targetX: centerX + 230,
    targetY: centerY - 120
  });

  await wait(650);

  launchRocket({
    curve: "loop",
    targetX: centerX,
    targetY: centerY - 180
  });
}


async function startFinalDanceFireworks() {
  if (finalFireworksStarted) {
    return;
  }

  finalFireworksStarted = true;

  const centerX =
    window.innerWidth / 2;

  const centerY =
    window.innerHeight * 0.42;

  launchRocket({
    curve: "left",
    targetX: centerX - 280,
    targetY: centerY - 80
  });

  await wait(450);

  launchRocket({
    curve: "straight",
    targetX: centerX + 270,
    targetY: centerY - 110
  });

  await wait(500);

  launchRocket({
    curve: "loop",
    targetX: centerX - 130,
    targetY: centerY - 180
  });

  await wait(550);

  launchRocket({
    curve: "right",
    targetX: centerX + 130,
    targetY: centerY - 170
  });

  /*
    Final rocket forms a heart above the couple.
  */
  await wait(1600);

  launchRocket({
    curve: "loop",
    targetX: centerX,
    targetY: Math.max(145, centerY - 210),
    heart: true
  });
}


/* ======================================================
   EVENT LISTENERS
====================================================== */

giftButton.addEventListener(
  "click",
  openGift
);

yesButton.addEventListener(
  "click",
  acceptDate
);

noButton.addEventListener(
  "mouseenter",
  moveNoButton
);

noButton.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();

    moveNoButton();
  }
);

noButton.addEventListener(
  "click",
  showErrorPopup
);

closePopup.addEventListener(
  "click",
  () => {
    errorPopup.classList.remove("visible");
  }
);

optionButtons.forEach((button) => {
  button.addEventListener(
    "click",
    selectActivity
  );
});

timeButtons.forEach((button) => {
  button.addEventListener(
    "click",
    selectTime
  );
});

window.addEventListener(
  "resize",
  () => {
    noButton.style.position = "relative";
    noButton.style.left = "auto";
    noButton.style.top = "auto";
  }
);

startIntro();
