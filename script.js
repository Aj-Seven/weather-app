// global variables
const apiKey = "b709c8cc081fe15ede76711ce135b732";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const contain = document.getElementById("container");

// to fetch weather data by open weather api
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// store weather api data in json format
async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cross",
  });
  try {
    const respData = await resp.json();
    console.log(respData);
    addWeatherToHtml(respData);
    contain.style.display = "inline-block";
  } catch (error) {
    const ecity = search.value;
    alert(ecity + " City Not Found");
  }
}

// main function to send data to
function addWeatherToHtml(data) {
  const day_time = getDateTime(data.dt, data.timezone);
  const temp = KtoC(data.main.temp);
  const VC = data.visibility / 1000;
  const loc = document.getElementById("loc");
  const day = document.getElementById("day");
  const deg = document.getElementById("deg");
  const fL = document.getElementById('fL');
  const h = document.getElementById('h');
  const v = document.getElementById('v');
  const aP = document.getElementById('aP');
  fL.innerText = KtoC(data.main.feels_like) + "°" + "C";
  h.innerText = data.main.humidity + "%";
  v.innerText = VC + "km";
  aP.innerText = data.main.pressure + "hPa";
  deg.innerText = temp + "°" + "C" + " " + data.weather[0].main;
  day.innerText = day_time;
  loc.innerText = data.name + ", " + data.sys.country;
}

// function to convert kelvin scale to celsius scale
function KtoC(K) {
  return Math.floor(K - 273.15);
}

// function to get local time data
function getDateTime(dt, timezone) {
  const date = new Date((dt + timezone) * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneOffset: timezone,
  };
  const dateTimeStr = date.toLocaleString(undefined, options);
  return dateTimeStr;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
