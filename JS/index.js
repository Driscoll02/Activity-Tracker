const overviewColour = "#111e88";

const stepsColour = "#e66a75";
const caloriesColour = "#2ecc71";
const waterColour = "#2982bd";

const sleepColour = "#cf9fff";
const achievementsColour = "#f1c40f";

const largeCardDateText = document.getElementById("dateText");

const profileButtonParent = document.getElementById("profile-container");
const createProfileButton = document.getElementById("createProfileButton");
const createProfileText = document.getElementById("createProfileText");

const progressBarArr = document.querySelectorAll(".circular-progress");
const progressValArr = document.querySelectorAll(".value-container");

const vertProgressBarArr = document.querySelectorAll(".bar");

let stepsTextValue = document.querySelector(".steps-h1");
let caloriesTextValue = document.querySelector(".calories-h1");
let waterTextValue = document.querySelector(".water-h1");

let sleepTextValue = document.querySelector(".sleep-h1");

const recommendedSteps = 10000;
const recommendedCalories = 2500;
const recommendedWater = 3700;

const recommendedSleep = 8;

var activityValues = {
  stepsValue: 0,
  caloriesValue: 0,
  waterValue: 0,
  sleepValue: 0,
};

let currentIndex = 0;
let currentVerticalIndex = 0;

function displayProgress() {
  if (localStorage.getItem("values") != null) {
    let gradientColour = "";

    console.log(localStorage.getItem("values").split(",")[0]);

    if (currentIndex == 0) {
      gradientColour = overviewColour;

      const averageSteps = (parseInt(localStorage.getItem("values").split(",")[0]) * recommendedSteps) / 1000000;
      const averageCalories = (parseInt(localStorage.getItem("values").split(",")[1]) / recommendedCalories) * 100;
      const averageWater = (parseInt(localStorage.getItem("values").split(",")[2]) / recommendedWater) * 100;
      const averageSleep = (parseInt(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep;

      const statAverage = ((averageSteps + averageCalories + averageWater + averageSleep) / 4).toFixed(1);

      progressValArr[currentIndex].textContent = `${statAverage}%`;
      progressBarArr[currentIndex].style.background = `conic-gradient(${gradientColour} ${statAverage * 3.6}deg, #fff ${statAverage * 3.6}deg)`;
    } else if (currentIndex == 1) {
      gradientColour = stepsColour;
      progressValArr[currentIndex].textContent = `${((parseInt(localStorage.getItem("values").split(",")[0]) / recommendedSteps) * 100).toFixed(2)}%`;
      progressBarArr[currentIndex].style.background = `conic-gradient(${gradientColour} ${(parseInt(localStorage.getItem("values").split(",")[0]) / 100) * 3.6}deg, #fff ${
        (parseInt(localStorage.getItem("values").split(",")[0]) / 100) * 3.6
      }deg)`;
      stepsTextValue.textContent = localStorage.getItem("values").split(",")[0];
    } else if (currentIndex == 2) {
      gradientColour = caloriesColour;
      progressValArr[currentIndex].textContent = `${((parseInt(localStorage.getItem("values").split(",")[1]) / recommendedCalories) * 100).toFixed(1)}%`;
      progressBarArr[currentIndex].style.background = `conic-gradient(${gradientColour} ${(parseInt(localStorage.getItem("values").split(",")[1]) / 2500) * 100 * 3.6}deg, #fff ${
        (parseInt(localStorage.getItem("values").split(",")[1]) / 2500) * 100 * 3.6
      }deg)`;
      caloriesTextValue.textContent = localStorage.getItem("values").split(",")[1];
    } else if (currentIndex == 3) {
      gradientColour = waterColour;
      progressValArr[currentIndex].textContent = `${((parseInt(localStorage.getItem("values").split(",")[2]) / recommendedWater) * 100).toFixed(2)}%`;
      progressBarArr[currentIndex].style.background = `conic-gradient(${gradientColour} ${(parseInt(localStorage.getItem("values").split(",")[2]) / 3700) * 100 * 3.6}deg, #fff ${
        (parseInt(localStorage.getItem("values").split(",")[2]) / 3700) * 100 * 3.6
      }deg)`;
      console.log((parseInt(localStorage.getItem("values").split(",")[2]) / 3700) * 100);
      waterTextValue.textContent = localStorage.getItem("values").split(",")[2] / 1000 + "L";
    }

    currentIndex++;
  } else {
    progressBarArr[currentIndex].style.background = `conic-gradient(#fff ${0}deg, #fff ${0}deg)`;
    currentIndex++;
  }
}

function displayVerticalProgress() {
  if (localStorage.getItem("values") != null) {
    let barColor = "";

    if (currentVerticalIndex == 0) {
      if (((activityValues.sleepValue * 100) / recommendedSleep).toFixed(0) < 100) {
        barColor = sleepColour;
        vertProgressBarArr[currentVerticalIndex].textContent = ((parseInt(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep).toFixed(0) + "%";
        vertProgressBarArr[currentVerticalIndex].style.height = vertProgressBarArr[currentVerticalIndex].textContent;
      } else {
        vertProgressBarArr[currentVerticalIndex].textContent = ((parseInt(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep).toFixed(0) + "%";
        vertProgressBarArr[currentVerticalIndex].style.height = "100%";
        vertProgressBarArr[currentVerticalIndex].style.borderRadius = "10px";
      }
    }

    sleepTextValue.textContent = localStorage.getItem("values").split(",")[3] + " Hours";

    currentVerticalIndex++;
  } else {
    vertProgressBarArr[currentVerticalIndex].style.height = "0%";
    vertProgressBarArr[currentVerticalIndex].textContent = "";
  }
}

progressBarArr.forEach((element) => displayProgress());
vertProgressBarArr.forEach((vertElement) => displayVerticalProgress());

const dateInput = document.getElementById("dateInput");
dateInput.value = new Date().toISOString().split("T")[0];

let input = dateInput.value;
let reversedDate = input.replace(/T.*/, "").split("-").reverse().join("-");
console.log(reversedDate);
largeCardDateText.textContent = reversedDate;

dateInput.addEventListener("change", function () {
  let input = dateInput.value;
  let reversedDate = input.replace(/T.*/, "").split("-").reverse().join("-");
  largeCardDateText.textContent = reversedDate;
});