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

const heartFireworkGif =
  document.getElementById(
    "heartFireworkGif"
  );


let selectedActivity = "";
let selectedTime = "";
let finalSequenceStarted = false;


const wait = (milliseconds) =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );


/* ======================================
   SKIFT MELLEM SIDER
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
   ERROR POPUP
====================================== */

function showErrorPopup() {

  errorPopup.classList.add(
    "visible"
  );

  setTimeout(() => {

    errorPopup.classList.remove(
      "visible"
    );

  }, 1800);

}


/* ======================================
   JA-KNAP
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

  await wait(1550);

  speechBubble.classList.remove(
    "hidden"
  );

  await wait(4000);

  await showScreen(
    "activityScreen"
  );

}


/* ======================================
   VALG AF AKTIVITET
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
   VALG AF TIDSPUNKT
====================================== */

async function selectTime(event) {

  selectedTime =
    event.currentTarget.dataset.time;

  finalChoiceText.textContent =
    `${selectedActivity} – ${selectedTime}`;

  await showScreen(
    "finalScreen"
  );

  if (!finalSequenceStarted) {

    finalSequenceStarted = true;

    fireworks.launchShow([

      {
        delay: 0,
        x: 0.16,
        y: 0.34,
        path: "curveRight"
      },

      {
        delay: 400,
        x: 0.84,
        y: 0.31,
        path: "curveLeft"
      },

      {
        delay: 820,
        x: 0.31,
        y: 0.19,
        path: "loop"
      },

      {
        delay: 1220,
        x: 0.69,
        y: 0.19,
        path: "straight"
      }

    ]);

    setTimeout(() => {

      heartFireworkGif.classList.add(
        "visible"
      );

    }, 2500);

  }

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

    this.canvas = canvas;

    this.context =
      canvas.getContext("2d");

    this.devicePixelRatio =
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
      (time) =>
        this.animate(time)
    );

  }


  resize() {

    this.width =
      window.innerWidth;

    this.height =
      window.innerHeight;

    this.canvas.width =
      this.width *
      this.devicePixelRatio;

    this.canvas.height =
      this.height *
      this.devicePixelRatio;

    this.canvas.style.width =
      `${this.width}px`;

    this.canvas.style.height =
      `${this.height}px`;

    this.context.setTransform(
      this.devicePixelRatio,
      0,
      0,
      this.devicePixelRatio,
      0,
      0
    );

  }


  launchShow(items) {

    items.forEach(
      (item) => {

        setTimeout(() => {

          this.launch(
            item.x * this.width,
            item.y * this.height,
            item.path
          );

        }, item.delay);

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

    const startY =
      this.height + 30;

    this.rockets.push({

      startX,
      startY,

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


  getRocketPosition(
    rocket,
    progress
  ) {

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    const baseX =
      rocket.startX +
      (
        rocket.targetX -
        rocket.startX
      ) *
      eased;

    const baseY =
      rocket.startY +
      (
        rocket.targetY -
        rocket.startY
      ) *
      eased;

    let offsetX = 0;
    let offsetY = 0;


    if (
      rocket.path ===
      "curveLeft"
    ) {

      offsetX =
        -Math.sin(
          Math.PI *
          progress
        ) *
        130;

    }


    if (
      rocket.path ===
      "curveRight"
    ) {

      offsetX =
        Math.sin(
          Math.PI *
          progress
        ) *
        130;

    }


    if (
      rocket.path ===
      "loop"
    ) {

      const fade =
        1 - progress;

      offsetX =
        Math.sin(
          Math.PI *
          2 *
          progress
        ) *
        110 *
        fade;

      offsetY =
        Math.cos(
          Math.PI *
          2 *
          progress
        ) *
        45 *
        fade;

    }


    return {

      x:
        baseX +
        offsetX,

      y:
        baseY +
        offsetY

    };

  }


  burst(
    x,
    y,
    hue
  ) {

    const amount =
      85 +
      Math.floor(
        Math.random() *
        35
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
        amount +
        (
          Math.random() -
          0.5
        ) *
        0.05;

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

        life:
          1.25 +
          Math.random() *
          0.9,

        age: 0,

        drag: 0.982,

        gravity:
          78 +
          Math.random() *
          40,

        hue:
          hue +
          (
            Math.random() -
            0.5
          ) *
          24,

        brightness:
          58 +
          Math.random() *
          28,

        size:
          1.8 +
          Math.random() *
          2.2,

        twinkle:
          Math.random() *
          Math.PI *
          2

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


    context.globalCompositeOperation =
      "source-over";

    context.fillStyle =
      "rgba(0, 0, 0, 0.10)";

    context.fillRect(
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
            this.getRocketPosition(
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
            22
          ) {

            rocket.trail.shift();

          }


          rocket.trail.forEach(
            (point, index) => {

              point.alpha *=
                0.92;

              const radius =
                1 +
                (
                  index /
                  rocket.trail.length
                ) *
                2.2;


              const glow =
                context.createRadialGradient(

                  point.x,
                  point.y,
                  0,

                  point.x,
                  point.y,
                  radius * 5

                );


              glow.addColorStop(

                0,

                `hsla(
                  ${rocket.hue},
                  100%,
                  85%,
                  ${point.alpha}
                )`

              );


              glow.addColorStop(

                0.35,

                `hsla(
                  ${rocket.hue},
                  100%,
                  58%,
                  ${
                    point.alpha *
                    0.75
                  }
                )`

              );


              glow.addColorStop(

                1,

                `hsla(
                  ${rocket.hue},
                  100%,
                  45%,
                  0
                )`

              );


              context.fillStyle =
                glow;

              context.beginPath();

              context.arc(

                point.x,
                point.y,

                radius * 5,

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

            2.2,

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


          const remaining =

            1 -

            particle.age /
            particle.life;


          const flicker =

            0.72 +

            Math.sin(

              time *
              0.018 +

              particle.twinkle

            ) *

            0.28;


          const alpha =

            remaining *
            flicker;


          const glow =

            context.createRadialGradient(

              particle.x,
              particle.y,
              0,

              particle.x,
              particle.y,

              particle.size *
              5

            );


          glow.addColorStop(

            0,

            `hsla(
              ${particle.hue},
              100%,
              ${
                particle.brightness +
                18
              }%,
              ${alpha}
            )`

          );


          glow.addColorStop(

            0.35,

            `hsla(
              ${particle.hue},
              100%,
              ${
                particle.brightness
              }%,
              ${
                alpha *
                0.8
              }
            )`

          );


          glow.addColorStop(

            1,

            `hsla(
              ${particle.hue},
              100%,
              ${
                particle.brightness
              }%,
              0
            )`

          );


          context.fillStyle =
            glow;

          context.beginPath();

          context.arc(

            particle.x,
            particle.y,

            particle.size *
            5,

            0,
            Math.PI *
            2

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
