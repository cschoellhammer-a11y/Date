const screens =
  document.querySelectorAll(".screen");

const introContent =
  document.getElementById("introContent");

const giftButton =
  document.getElementById("giftButton");

const dateButtons =
  document.getElementById("dateButtons");

const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const errorPopup =
  document.getElementById("errorPopup");

const closePopup =
  document.getElementById("closePopup");

const speechBubble =
  document.getElementById("speechBubble");

const optionButtons =
  document.querySelectorAll(
    ".option-button[data-choice]"
  );

const timeButtons =
  document.querySelectorAll(
    ".time-button"
  );

const selectedActivityText =
  document.getElementById(
    "selectedActivity"
  );

const finalChoiceText =
  document.getElementById(
    "finalChoice"
  );

const typingText =
  document.getElementById(
    "typingText"
  );

const typingCursor =
  document.getElementById(
    "typingCursor"
  );

const blackoutScreen =
  document.getElementById(
    "blackoutScreen"
  );


let selectedActivity = "";
let selectedTime = "";
let endingStarted = false;


const wait = (milliseconds) => {

  return new Promise(
    (resolve) => {

      setTimeout(
        resolve,
        milliseconds
      );

    }
  );

};


/* ======================================
   SKÆRMSKIFT
====================================== */

async function showScreen(screenId) {

  const currentScreen =
    document.querySelector(
      ".screen.active"
    );

  const nextScreen =
    document.getElementById(
      screenId
    );

  if (currentScreen === nextScreen) {
    return;
  }

  if (currentScreen) {

    currentScreen.classList.add(
      "leaving"
    );

    await wait(720);

    currentScreen.classList.remove(
      "active",
      "leaving"
    );

  }

  nextScreen.classList.add(
    "active"
  );

}


/* ======================================
   STARTSIDE
====================================== */

async function startIntro() {

  await wait(5000);

  introContent.classList.remove(
    "hidden"
  );

}


/* ======================================
   GAVE
====================================== */

async function openGift() {

  giftButton.disabled = true;

  fireworks.launchShow([

    {
      delay: 0,
      x: 0.24,
      y: 0.28,
      path: "straight"
    },

    {
      delay: 280,
      x: 0.74,
      y: 0.25,
      path: "curveRight"
    },

    {
      delay: 560,
      x: 0.50,
      y: 0.18,
      path: "curveLeft"
    }

  ]);

  await wait(1750);

  await showScreen(
    "dateScreen"
  );

  await wait(5000);

  dateButtons.classList.remove(
    "hidden"
  );

}


/* ======================================
   NEJ-KNAP
====================================== */

function moveNoButton() {

  const padding = 18;

  const maxX =
    Math.max(
      padding,
      window.innerWidth -
      noButton.offsetWidth -
      padding
    );

  const maxY =
    Math.max(
      padding,
      window.innerHeight -
      noButton.offsetHeight -
      padding
    );

  noButton.style.position =
    "fixed";

  noButton.style.left =
    `${
      padding +
      Math.random() *
      (maxX - padding)
    }px`;

  noButton.style.top =
    `${
      padding +
      Math.random() *
      (maxY - padding)
    }px`;

}


/* ======================================
   POPUP
====================================== */

function showErrorPopup() {

  errorPopup.classList.add(
    "visible"
  );

  setTimeout(
    () => {

      errorPopup.classList.remove(
        "visible"
      );

    },
    1800
  );

}


/* ======================================
   JA
====================================== */

async function acceptDate() {

  noButton.style.display =
    "none";

  await showScreen(
    "celebrationScreen"
  );

  fireworks.launchShow([

    {
      delay: 0,
      x: 0.18,
      y: 0.34,
      path: "straight"
    },

    {
      delay: 360,
      x: 0.82,
      y: 0.31,
      path: "curveLeft"
    },

    {
      delay: 760,
      x: 0.34,
      y: 0.20,
      path: "loop"
    },

    {
      delay: 1140,
      x: 0.66,
      y: 0.20,
      path: "curveRight"
    }

  ]);

  await wait(1500);

  speechBubble.classList.remove(
    "hidden"
  );

  await wait(4000);

  await showScreen(
    "activityScreen"
  );

}


/* ======================================
   AKTIVITET
====================================== */

function selectActivity(event) {

  selectedActivity =
    event.currentTarget.dataset.choice;

  selectedActivityText.textContent =
    `Du har valgt: ${selectedActivity} ❤️`;

  showScreen(
    "timeScreen"
  );

}


/* ======================================
   TIDSPUNKT
====================================== */

async function selectTime(event) {

  selectedTime =
    event.currentTarget.dataset.time;

  finalChoiceText.textContent =
    `${selectedActivity} – ${selectedTime}`;

  await showScreen(
    "finalScreen"
  );

  fireworks.launchShow([

    {
      delay: 0,
      x: 0.15,
      y: 0.33,
      path: "curveRight"
    },

    {
      delay: 400,
      x: 0.85,
      y: 0.30,
      path: "curveLeft"
    },

    {
      delay: 800,
      x: 0.30,
      y: 0.18,
      path: "loop"
    },

    {
      delay: 1200,
      x: 0.70,
      y: 0.18,
      path: "straight"
    },

    {
      delay: 1800,
      x: 0.50,
      y: 0.15,
      path: "loop"
    }

  ]);

  if (!endingStarted) {

    endingStarted = true;

    await wait(7000);

    await startTypingEnding();

  }

}


/* ======================================
   TYPING-FUNKTIONER
====================================== */

async function typeMessage(
  message,
  speed = 85
) {

  typingText.textContent = "";

  for (
    let index = 0;
    index < message.length;
    index += 1
  ) {

    typingText.textContent +=
      message[index];

    await wait(
      speed +
      Math.random() * 45
    );

  }

}


async function deleteMessage(
  speed = 45
) {

  while (
    typingText.textContent.length > 0
  ) {

    typingText.textContent =
      typingText.textContent.slice(
        0,
        -1
      );

    await wait(
      speed +
      Math.random() * 30
    );

  }

}


async function startTypingEnding() {

  await showScreen(
    "typingScreen"
  );

  await wait(900);


  await typeMessage(
    "Jeg elsker dig"
  );

  await wait(1800);

  await deleteMessage();


  await wait(500);


  await typeMessage(
    "Glæder mig til du kommer hjem"
  );

  await wait(1900);

  await deleteMessage();


  await wait(500);


  await typeMessage(
    "Måske der også er en lille gave..."
  );

  await wait(2800);


  typingCursor.style.display =
    "none";

  blackoutScreen.classList.add(
    "visible"
  );

}


/* ======================================
   EVENT LISTENERS
====================================== */

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

    errorPopup.classList.remove(
      "visible"
    );

  }
);

optionButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      selectActivity
    );

  }
);

timeButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      selectTime
    );

  }
);

window.addEventListener(
  "resize",
  () => {

    noButton.style.position =
      "relative";

    noButton.style.left =
      "auto";

    noButton.style.top =
      "auto";

  }
);


startIntro();


/* ======================================
   CANVAS-FYRVÆRKERI
====================================== */

class FireworkEngine {

  constructor(canvas) {

    this.canvas =
      canvas;

    this.context =
      canvas.getContext("2d");

    this.pixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    this.rockets = [];
    this.particles = [];

    this.lastTime =
      performance.now();

    this.resize();

    window.addEventListener(
      "resize",
      () => this.resize()
    );

    requestAnimationFrame(
      (time) => this.animate(time)
    );

  }


  resize() {

    this.width =
      window.innerWidth;

    this.height =
      window.innerHeight;

    this.canvas.width =
      this.width *
      this.pixelRatio;

    this.canvas.height =
      this.height *
      this.pixelRatio;

    this.canvas.style.width =
      `${this.width}px`;

    this.canvas.style.height =
      `${this.height}px`;

    this.context.setTransform(
      this.pixelRatio,
      0,
      0,
      this.pixelRatio,
      0,
      0
    );

  }


  launchShow(items) {

    items.forEach(
      (item) => {

        setTimeout(
          () => {

            this.launch(
              item.x * this.width,
              item.y * this.height,
              item.path
            );

          },
          item.delay
        );

      }
    );

  }


  launch(
    targetX,
    targetY,
    path = "straight"
  ) {

    const startX =
      this.width *
      (
        0.12 +
        Math.random() *
        0.76
      );

    this.rockets.push({

      startX,

      startY:
        this.height + 30,

      targetX,

      targetY,

      path,

      age: 0,

      duration:
        1.35 +
        Math.random() *
        0.35,

      hue:
        Math.floor(
          Math.random() *
          360
        ),

      trail: []

    });

  }


  rocketPosition(
    rocket,
    progress
  ) {

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    let x =
      rocket.startX +
      (
        rocket.targetX -
        rocket.startX
      ) *
      eased;

    let y =
      rocket.startY +
      (
        rocket.targetY -
        rocket.startY
      ) *
      eased;


    if (
      rocket.path === "curveLeft"
    ) {

      x -=
        Math.sin(
          Math.PI *
          progress
        ) *
        130;

    }


    if (
      rocket.path === "curveRight"
    ) {

      x +=
        Math.sin(
          Math.PI *
          progress
        ) *
        130;

    }


    if (
      rocket.path === "loop"
    ) {

      const fade =
        1 - progress;

      x +=
        Math.sin(
          Math.PI *
          2 *
          progress
        ) *
        110 *
        fade;

      y +=
        Math.cos(
          Math.PI *
          2 *
          progress
        ) *
        45 *
        fade;

    }


    return {
      x,
      y
    };

  }


  burst(
    x,
    y,
    hue
  ) {

    const amount =
      90 +
      Math.floor(
        Math.random() *
        40
      );

    for (
      let index = 0;
      index < amount;
      index += 1
    ) {

      const angle =
        (
          Math.PI *
          2 *
          index
        ) /
        amount;

      const speed =
        85 +
        Math.random() *
        165;

      this.particles.push({

        x,
        y,

        velocityX:
          Math.cos(angle) *
          speed,

        velocityY:
          Math.sin(angle) *
          speed,

        age: 0,

        life:
          1.3 +
          Math.random() *
          0.9,

        drag: 0.982,

        gravity:
          75 +
          Math.random() *
          45,

        hue:
          hue +
          (
            Math.random() -
            0.5
          ) *
          25,

        size:
          1.8 +
          Math.random() *
          2.5

      });

    }

  }


  animate(time) {

    const deltaTime =
      Math.min(
        (
          time -
          this.lastTime
        ) /
        1000,
        0.033
      );

    this.lastTime =
      time;

    const context =
      this.context;


    context.clearRect(
      0,
      0,
      this.width,
      this.height
    );


    context.globalCompositeOperation =
      "lighter";


    this.rockets =
      this.rockets.filter(
        (rocket) => {

          rocket.age +=
            deltaTime;

          const progress =
            Math.min(
              rocket.age /
              rocket.duration,
              1
            );

          const position =
            this.rocketPosition(
              rocket,
              progress
            );


          rocket.trail.push({

            x: position.x,
            y: position.y,
            alpha: 1

          });


          if (
            rocket.trail.length >
            20
          ) {

            rocket.trail.shift();

          }


          rocket.trail.forEach(
            (point, index) => {

              point.alpha *=
                0.91;

              const size =
                2 +
                (
                  index /
                  rocket.trail.length
                ) *
                3;


              context.fillStyle =
                `hsla(
                  ${rocket.hue},
                  100%,
                  65%,
                  ${point.alpha}
                )`;

              context.beginPath();

              context.arc(
                point.x,
                point.y,
                size,
                0,
                Math.PI * 2
              );

              context.fill();

            }
          );


          context.fillStyle =
            "#ffffff";

          context.beginPath();

          context.arc(
            position.x,
            position.y,
            3,
            0,
            Math.PI * 2
          );

          context.fill();


          if (
            progress >= 1
          ) {

            this.burst(
              position.x,
              position.y,
              rocket.hue
            );

            return false;

          }


          return true;

        }
      );


    this.particles =
      this.particles.filter(
        (particle) => {

          particle.age +=
            deltaTime;


          if (
            particle.age >=
            particle.life
          ) {

            return false;

          }


          particle.velocityX *=
            particle.drag;

          particle.velocityY =
            particle.velocityY *
            particle.drag +
            particle.gravity *
            deltaTime;


          particle.x +=
            particle.velocityX *
            deltaTime;

          particle.y +=
            particle.velocityY *
            deltaTime;


          const opacity =
            1 -
            particle.age /
            particle.life;


          context.fillStyle =
            `hsla(
              ${particle.hue},
              100%,
              65%,
              ${opacity}
            )`;

          context.beginPath();

          context.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );

          context.fill();


          return true;

        }
      );


    context.globalCompositeOperation =
      "source-over";


    requestAnimationFrame(
      (nextTime) =>
        this.animate(nextTime)
    );

  }

}


const fireworks =
  new FireworkEngine(

    document.getElementById(
      "fireworksCanvas"
    )

  );
