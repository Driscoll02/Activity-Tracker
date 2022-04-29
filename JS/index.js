// Variables
const overviewColour = "#111e88";

const stepsColour = "#e66a75";
const caloriesColour = "#2ecc71";
const waterColour = "#2982bd";

const sleepColour = "#cf9fff";
const achievementsColour = "#f1c40f";

const largeCardDateText = document.getElementById("dateText");

const progressBarArr = document.querySelectorAll(".circular-progress");
const progressValArr = document.querySelectorAll(".value-container");

const vertProgressBarArr = document.querySelectorAll(".bar");

let stepsTextValue = document.querySelector(".steps-h1");
let caloriesTextValue = document.querySelector(".calories-h1");
let waterTextValue = document.querySelector(".water-h1");

let sleepTextValue = document.querySelector(".sleep-h1");

// Recommended value intakes
const recommendedSteps = 10000;
const recommendedCalories = 2500;
const recommendedWater = 3700;

const recommendedSleep = 8;

// Object to store default activity values
var activityValues = {
  stepsValue: 0,
  caloriesValue: 0,
  waterValue: 0,
  sleepValue: 0,
};

let currentIndex = 0;
let currentVerticalIndex = 0;

// To display progress on dashboard
function displayProgress() {
  // Check that localstorage key exists
  if (localStorage.getItem("values") != null) {
    let gradientColour = "";

    if (currentIndex == 0) {
      gradientColour = overviewColour;

      // Get the average of all values
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
	
	let calcExpression = ((parseFloat(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep);

    if (currentVerticalIndex == 0) {
      if (calcExpression <= 100) {
        barColor = sleepColour;
        vertProgressBarArr[currentVerticalIndex].textContent = ((parseFloat(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep).toFixed(0) + "%";
        vertProgressBarArr[currentVerticalIndex].style.height = (parseFloat(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep + "%";
		if(calcExpression == 100) {
			vertProgressBarArr[currentVerticalIndex].style.borderRadius = "10px";
		}
      } else if (calcExpression > 100){
        vertProgressBarArr[currentVerticalIndex].textContent = ((parseFloat(localStorage.getItem("values").split(",")[3]) * 100) / recommendedSleep).toFixed(0) + "%";
        vertProgressBarArr[currentVerticalIndex].style.height = "100%";
        vertProgressBarArr[currentVerticalIndex].style.borderRadius = "10px";
      }
    }

    sleepTextValue.textContent = localStorage.getItem("values").split(",")[3] + " Hours";

    currentVerticalIndex++;
  }
  
	
  if (localStorage.getItem("values") == null || localStorage.getItem("values").split(",")[3] == "0") {
    vertProgressBarArr[0].style.height = "0%";
    vertProgressBarArr[0].textContent = "";
  }

  if (localStorage.getItem("completedAchievements") != null) {
    document.getElementById("achievements-h1").innerText = localStorage.getItem("completedAchievements") + " / 8" + " Completed";
    vertProgressBarArr[1].style.height = (localStorage.getItem("completedAchievements")[0] / localStorage.getItem("allAchievements")[0]) * 100 + "%";
    vertProgressBarArr[1].textContent = (localStorage.getItem("completedAchievements")[0] / localStorage.getItem("allAchievements")[0]) * 100 + "%";
  } else {
    vertProgressBarArr[1].style.height = "0%";
    vertProgressBarArr[1].textContent = "";
  }
}

progressBarArr.forEach((element) => displayProgress());
vertProgressBarArr.forEach((vertElement) => displayVerticalProgress());

const dateInput = document.getElementById("dateInput");
dateInput.value = new Date().toISOString().split("T")[0];

let input = dateInput.value;
let reversedDate = input.replace(/T.*/, "").split("-").reverse().join("-");
if (largeCardDateText != null) {
  largeCardDateText.textContent = reversedDate;
}

dateInput.addEventListener("change", function () {
  let input = dateInput.value;
  let reversedDate = input.replace(/T.*/, "").split("-").reverse().join("-");
  largeCardDateText.textContent = reversedDate;
});
