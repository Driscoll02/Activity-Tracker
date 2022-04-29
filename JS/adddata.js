const dateInput2 = document.getElementById("dateInput");
dateInput2.value = new Date().toISOString().split("T")[0];

const stepsInput = document.getElementById("steps-input");
const caloriesInput = document.getElementById("calories-input");
const waterInput = document.getElementById("water-input");
const sleepInput = document.getElementById("sleep-input");

const submitButton = document.getElementById("submit-input");

submitButton.addEventListener("click", () => {
  activityValues.stepsValue = stepsInput.value;
  activityValues.caloriesValue = caloriesInput.value;
  activityValues.waterValue = waterInput.value;
  activityValues.sleepValue = sleepInput.value;

  if (stepsInput.value.length == 0) {
    activityValues.stepsValue = 0;
  }

  if (caloriesInput.value.length == 0) {
    activityValues.caloriesValue = 0;
  }

  if (waterInput.value.length == 0) {
    activityValues.waterValue = 0;
  }

  if (sleepInput.value.length == 0) {
    activityValues.sleepValue = 0;
  }

  const values = [activityValues.stepsValue, activityValues.caloriesValue, activityValues.waterValue, activityValues.sleepValue];
  

  localStorage.setItem("values", values);
});
