const dayDivs = [];
let currentDiv = 0;

let newData = [
  {
    headerTime: "",
    hoursMinutesSeconds: [],
    weatherByTimeMain: [],
    weatherByTimeSecondary: [],
  },
];

let currentDay = "";
let index = 0;

const printData = () => {
  let h1;
  let weatherBox;
  let weatherOfTime = [];

  for (let index = 0; index < newData.length; index++) {
    dayDivs.push(document.createElement("div"));
    dayDivs[index].classList.add("day");

    h1 = document.createElement("h1");
    h1.classList.add("date");
    h1.textContent = newData[index].headerTime;

    dayDivs[index].appendChild(h1);

    let weatherByTimeParagraphs = [];
    weatherBox = document.createElement("div");
    weatherBox.classList.add("weather-box");

    for (let i = 0; i < newData[index].weatherByTimeMain.length; i++) {
      weatherByTimeParagraphs[0] = newData[index].hoursMinutesSeconds[i];
      weatherByTimeParagraphs[1] =
        newData[index].weatherByTimeMain[i].description;
      weatherByTimeParagraphs[2] =
        newData[index].weatherByTimeMain[i].temperature;
      weatherByTimeParagraphs[3] =
        newData[index].weatherByTimeMain[i].feelsLike;
      weatherByTimeParagraphs[4] = newData[index].weatherByTimeMain[i].pressure;
      weatherByTimeParagraphs[5] =
        newData[index].weatherByTimeMain[i].cloudiness;
      weatherByTimeParagraphs[6] = newData[index].weatherByTimeMain[i].humidity;
      weatherByTimeParagraphs[7] =
        newData[index].weatherByTimeMain[i].visibility;
      weatherByTimeParagraphs[8] = `${newData[index].weatherByTimeMain[i].WindSpeed}`;

      weatherOfTime = document.createElement("div");
      weatherOfTime.classList.add("weather-of-time");

      for (let j = 0; j < weatherByTimeParagraphs.length; j++) {
        if (j === weatherByTimeParagraphs.length - 1) {
          let newP = document.createElement("p");
          let arrowDiv = document.createElement("div");
          arrowDiv.style.transform = `rotate(${newData[index].weatherByTimeMain[i].windDirection}deg)`;
          arrowDiv.classList.add("rotate");
          let arrow = document.createElement("b");
          arrow.textContent = "→";
          arrowDiv.appendChild(arrow);
          newP.textContent = weatherByTimeParagraphs[j];
          newP.appendChild(arrowDiv);
          weatherOfTime.appendChild(newP);
        } else {
          let newP = document.createElement("p");
          newP.textContent = weatherByTimeParagraphs[j];
          if (j === 0) {
            newP.dataset.whichDay = newData[index].headerTime;
          }
          weatherOfTime.appendChild(newP);
        }
      }
      weatherBox.appendChild(weatherOfTime);
    }

    dayDivs[index].appendChild(weatherBox);
    document.querySelector(".days").appendChild(dayDivs[index]);
    makeCurrentInfoDisplay();
  }
};

function getAndProceed(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.list.forEach((element) => {
        formData(element, currentDay, index);
      });
      printData();
    });
}

const formData = (element) => {
  const weekDay = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const unixTimestamp = element.dt;
  const date = new Date(unixTimestamp * 1000);
  const dayOfWeek = weekDay[date.getDay()];
  let days = date.getDate();
  let months = date.getMonth() + 1;
  let years = date.getFullYear();
  let hours = date.getHours() - 2;
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  days = String(days);
  months = String(months);
  years = String(years);
  hours = String(hours);

  days.length < 2 ? (days = "0" + days) : days;
  months.length < 2 ? (months = "0" + months) : months;
  hours.length < 2 ? (hours = "0" + hours) : hours;
  currentDay === "" ? (currentDay = days) : currentDay;

  if (currentDay === days || currentDay === "") {
    newData[index].headerTime =
      dayOfWeek + " " + days + "." + months + "." + years;
    newData[index].hoursMinutesSeconds.push(
      hours + ":" + minutes + ":" + seconds
    );
    //Первостепенной важности
    newData[index].weatherByTimeMain.push({
      description: element.weather[0].description,
      temperature: element.main.temp,
      feelsLike: element.main.feels_like,
      pressure: element.main.pressure,
      cloudiness: element.clouds.all,
      humidity: element.main.humidity,
      visibility: element.visibility,
      WindSpeed: element.wind.speed,
      windDirection: element.wind.deg,
    });
    //Второстепенной важности
    newData[index].weatherByTimeSecondary.push({
      icon: element.weather[0].icon,
      windGust: element.wind.gust,
      groundLevelPressure: element.main.grnd_level,
      sealevelPressure: element.main.sea_level,
      tempMax: element.main.temp_max,
      tempMin: element.main.temp_min,
    });
  } else {
    newData.push({
      headerTime: "",
      hoursMinutesSeconds: [],
      weatherByTimeMain: [],
      weatherByTimeSecondary: [],
    });
    index++;
  }
  currentDay = days;
};

const workWithSelect = () => {
  const select = document.getElementById("select-city");
  return select.value;
};

const resetEverything = () => {
  document.querySelector(".days").innerHTML = "";
  let IFD = 0;
  IFD = dayDivs.length;
  dayDivs.splice(0, dayDivs.length);
  IFD = newData.length;
  newData.splice(0, newData.length);
  newData = [
    {
      headerTime: "",
      hoursMinutesSeconds: [],
      weatherByTimeMain: [],
      weatherByTimeSecondary: [],
    },
  ];
  currentDay = "";
  currentDiv = 0;
  index = 0;
};

document.getElementById("select-city").addEventListener("change", () => {
  getAndProceed(formURL(workWithSelect()));
  resetEverything();
});

const printDetails = (i, j) => {
  try {
    document.querySelector(".detail-box").remove();
  } catch (error) {
    console.log(error);
  }

  const detailsDiv = document.createElement("div");

  const weatherOfTime = document.createElement("div");
  weatherOfTime.classList.add("detail-info");

  h1 = document.createElement("h1");
  h1.classList.add("date");
  h1.textContent = newData[i].headerTime;
  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/w/${newData[i].weatherByTimeSecondary[j].icon}.png`;
  h1.appendChild(img);
  detailsDiv.appendChild(h1);

  const weatherByTimeParagraphs = [];
  weatherByTimeParagraphs[0] = newData[i].hoursMinutesSeconds[j];

  weatherByTimeParagraphs[1] = newData[i].weatherByTimeMain[j].description;

  weatherByTimeParagraphs[2] = newData[i].weatherByTimeMain[j].temperature;

  weatherByTimeParagraphs[3] = newData[i].weatherByTimeSecondary[j].tempMax;

  weatherByTimeParagraphs[4] = newData[i].weatherByTimeSecondary[j].tempMin;

  weatherByTimeParagraphs[5] = newData[i].weatherByTimeMain[j].feelsLike;

  weatherByTimeParagraphs[6] = newData[i].weatherByTimeMain[j].pressure;

  weatherByTimeParagraphs[7] =
    newData[i].weatherByTimeSecondary[j].groundLevelPressure;

  weatherByTimeParagraphs[8] =
    newData[i].weatherByTimeSecondary[j].sealevelPressure;

  weatherByTimeParagraphs[9] = newData[i].weatherByTimeMain[j].cloudiness;

  weatherByTimeParagraphs[10] = newData[i].weatherByTimeMain[j].humidity;

  weatherByTimeParagraphs[11] = newData[i].weatherByTimeMain[j].visibility;

  weatherByTimeParagraphs[12] = newData[i].weatherByTimeMain[j].WindSpeed;

  weatherByTimeParagraphs[13] = newData[i].weatherByTimeSecondary[j].windGust;

  for (let z = 0; z < weatherByTimeParagraphs.length; z++) {
    if (z === weatherByTimeParagraphs.length - 2) {
      let newP = document.createElement("p");
      let arrowDiv = document.createElement("div");
      arrowDiv.style.transform = `rotate(${newData[i].weatherByTimeMain[j].windDirection}deg)`;
      arrowDiv.classList.add("rotate");
      let arrow = document.createElement("b");
      arrow.textContent = "→";
      arrowDiv.appendChild(arrow);
      newP.textContent = weatherByTimeParagraphs[z];
      newP.appendChild(arrowDiv);
      weatherOfTime.appendChild(newP);
    } else {
      let newP = document.createElement("p");
      newP.textContent = weatherByTimeParagraphs[z];
      weatherOfTime.appendChild(newP);
    }
    detailsDiv.appendChild(weatherOfTime);
    detailsDiv.classList.add("detail-box");
    document.querySelector(".details-container").appendChild(detailsDiv);
    document.querySelector(".details").style.display = "flex";
  }
};

document.querySelector(".days").addEventListener("click", (event) => {
  for (let i = 0; i < newData.length; i++) {
    if (event.target.dataset.whichDay === newData[i].headerTime) {
      for (let j = 0; j < newData[i].hoursMinutesSeconds.length; j++) {
        if (event.target.textContent === newData[i].hoursMinutesSeconds[j]) {
          printDetails(i, j);
          document.querySelector(".container").style.display = "none";
          document.querySelector(".details").style.display = "flex";
        }
      }
    }
  }
});

const formURL = (city) => {
  const apiKey = "aee6e54267a9660f9a5dea36b4bef4b8";
  return `http://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metric&lang=ru&APPID=${apiKey}`;
};

document.querySelector(".btns").addEventListener("click", (event) => {
  if (event.target.id === "prev") {
    if (currentDiv > 0) {
      currentDiv--;
      makeCurrentInfoDisplay();
    }
  } else if (event.target.id === "next") {
    if (currentDiv < dayDivs.length - 1) {
      currentDiv++;
      makeCurrentInfoDisplay();
    }
  } else return;
});

const makeCurrentInfoDisplay = () => {
  for (let i = 0; i < dayDivs.length; i++) {
    dayDivs[i].style.display = "none";
  }
  dayDivs[currentDiv].style.display = "flex";
};

document.getElementById("btn-return").addEventListener("click", () => {
  document.querySelector(".details").style.display = "none";
  document.querySelector(".container").style.display = "flex";
});

window.addEventListener("load", () => {
  getAndProceed(formURL(workWithSelect()));
});
