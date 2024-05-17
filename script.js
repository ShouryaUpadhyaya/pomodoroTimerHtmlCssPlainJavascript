console.log("working");
const seconds = document.getElementById("secondsInput");
const minutes = document.getElementById("minutesInput");
const play = document.getElementById("play");
const workButton = document.getElementById("workButton");
const breakButton = document.getElementById("breakButton");
seconds.value = "00";
minutes.value = "50";
let statePlayButton = false;
let totalWorkTime = 0;
let totalBreakTime = 0;
let minutesId;
let secondsId;
let noTimePlayClicked = 0;
let startTime;
let stopTime;

// event listeners
play.addEventListener("click", (e) => {
  console.log(statePlayButton);
  if (statePlayButton === false) {
    startTimer();
  } else if (statePlayButton === true) {
    stopTimer();
  }
  noTimePlayClicked += 1;
  console.log(noTimePlayClicked);
});

workButton.addEventListener("click", (e) => {
  console.log("workButton pressed");
  //
});

breakButton.addEventListener("click", (e) => {
  console.log("break button pressed");
});

// Functions
function stopTimer() {
  clearInterval(secondsId);
  clearInterval(minutesId);
  console.log(`in stop timer ${statePlayButton}`);
  statePlayButton = false;
}

function secondsTimer() {
  secondsId = setInterval(() => {
    let currentSecond = parseInt(seconds.value);
    if (currentSecond === 0) {
      seconds.value = 59;
      minutes.value = (parseInt(minutes.value) - 1).toString().padStart(2, "0");
    } else {
      seconds.value = (currentSecond - 1).toString().padStart(2, "0");
    }
  }, 1000);
}

function minutesTimer() {
  minutesId = setInterval(() => {
    minutes.value = minutes.value.toString().padStart(2, "0");
    if (parseInt(minutes.value) === 0 && parseInt(seconds.value) === 0) {
      stopTimer();
      noTimePlayClicked = 0;
    }
  }, 1000);
}

function startTimer() {
  if (noTimePlayClicked === 0 && minutes.value > 0) {
    seconds.value = 59;
    minutes.value -= 1;
  }
  minutesTimer();
  secondsTimer();
  recordStartTime();
  statePlayButton = true;
}

function recordStartTime() {
  let minutesInSeconds = parseInt(minutes.value) * 60;
  let startTotalSeconds = parseInt(seconds.value) + minutesInSeconds;
  let startTimeMinutes = Math.floor(startTotalSeconds / 60);
  let startTimeSeconds = startTotalSeconds % 60;
  startTime = { minutes: startTimeMinutes, seconds: startTimeSeconds };
}
