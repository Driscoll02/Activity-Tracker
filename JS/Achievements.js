const achievements = [
  { title: "2,500 Steps", description: "Reach 2,500 steps in one day.", isCompleted: "Not completed" },
  { title: "5,000 Steps", description: "Reach 5,000 steps in one day.", isCompleted: "Not completed" },
  { title: "10,000 Steps", description: "Reach 10,000 steps in one day.", isCompleted: "Not completed" },
  { title: "Too Many Steps", description: "Get over 12,000 steps in one day", isCompleted: "Not completed" },
  { title: "Satiated", description: "Consume 2,500 calories.", isCompleted: "Not completed" },
  { title: "Hydrated", description: "Drink 3.7L of water.", isCompleted: "Not completed" },
  { title: "Super Hydrated", description: "Drink 4.5L of water.", isCompleted: "Not completed" },
  { title: "A Good Nights Sleep", description: "Get 8 hours of sleep.", isCompleted: "Not completed" },
];

const achievementsDOMArr = document.querySelectorAll(".achievement-panel");
let completedAchievements = [];

const updateValues = () => {
  // Update all DOM elements with correct value
  for (let i = 0; i < achievementsDOMArr.length; i++) {
    achievementsDOMArr[i].getElementsByTagName("h4")[0].innerText = achievements[i].title;
    achievementsDOMArr[i].getElementsByTagName("p")[0].innerText = achievements[i].description;
    achievementsDOMArr[i].getElementsByTagName("p")[1].innerText = achievements[i].isCompleted;
  }

  document.getElementById("numOfCompleted").innerText = completedAchievements.length;
};

updateValues();

const checkValues = () => {
  if (localStorage.getItem("values") != null) {
    //Check how many steps have been completed
    if (localStorage.getItem("values").split(",")[0] >= 2500) {
      achievements[0].isCompleted = "Completed";
      completedAchievements.push(achievements[0]);
      document.getElementsByTagName("span")[9].classList.remove("hidden");
      document.getElementsByTagName("span")[10].classList.add("hidden");

      updateValues();
    }
    if (localStorage.getItem("values").split(",")[0] >= 5000) {
      achievements[1].isCompleted = "Completed";
      completedAchievements.push(achievements[1]);
      document.getElementsByTagName("span")[11].classList.remove("hidden");
      document.getElementsByTagName("span")[12].classList.add("hidden");

      updateValues();
    }
    if (localStorage.getItem("values").split(",")[0] >= 10000) {
      achievements[2].isCompleted = "Completed";
      completedAchievements.push(achievements[2]);
      document.getElementsByTagName("span")[13].classList.remove("hidden");
      document.getElementsByTagName("span")[14].classList.add("hidden");

      updateValues();
    }

    if (localStorage.getItem("values").split(",")[0] >= 12000) {
      achievements[3].isCompleted = "Completed";
      completedAchievements.push(achievements[3]);
      document.getElementsByTagName("span")[15].classList.remove("hidden");
      document.getElementsByTagName("span")[16].classList.add("hidden");

      updateValues();
    }

    if (localStorage.getItem("values").split(",")[1] >= 2500) {
      achievements[4].isCompleted = "Completed";
      completedAchievements.push(achievements[4]);
      document.getElementsByTagName("span")[17].classList.remove("hidden");
      document.getElementsByTagName("span")[18].classList.add("hidden");

      updateValues();
    }

    if (localStorage.getItem("values").split(",")[2] >= 3700) {
      achievements[5].isCompleted = "Completed";
      completedAchievements.push(achievements[5]);
      document.getElementsByTagName("span")[19].classList.remove("hidden");
      document.getElementsByTagName("span")[20].classList.add("hidden");

      updateValues();
    }

    if (localStorage.getItem("values").split(",")[2] >= 4500) {
      achievements[6].isCompleted = "Completed";
      completedAchievements.push(achievements[6]);
      document.getElementsByTagName("span")[21].classList.remove("hidden");
      document.getElementsByTagName("span")[22].classList.add("hidden");

      updateValues();
    }

    if (localStorage.getItem("values").split(",")[3] >= 8) {
      achievements[7].isCompleted = "Completed";
      completedAchievements.push(achievements[7]);
      document.getElementsByTagName("span")[23].classList.remove("hidden");
      document.getElementsByTagName("span")[24].classList.add("hidden");

      updateValues();
    }
  }
};

checkValues();

localStorage.setItem("completedAchievements", completedAchievements.length);
localStorage.setItem("allAchievements", achievements.length);
