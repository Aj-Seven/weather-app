const apiKey = "b709c8cc081fe15ede76711ce135b732";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cross" });
    try {
       const respData = await resp.json();
       console.log(respData)
       addWeatherToHtml(respData);
    } catch(error) {
        const ecity = search.value
        alert(ecity+" City Not Found");
    }
}

function addWeatherToHtml(data) {
    const temp = KtoC(data.main.temp);
    const deg = document.getElementById('deg');
    const wName = document.getElementById('wname');
    const lName = document.getElementById('loc');
    const day = document.getElementById('day');
    const airS = document.getElementById('airs');
    const fl = document.getElementById('fl');
    const wind = document.getElementById('wind');
    const h = document.getElementById('h');
    const uv = document.getElementById('uv');
    const V = document.getElementById('V');
    const AP = document.getElementById('AP');
    const day_time = getDateTime(data.dt, data.timezone);
    day.innerText = day_time;
    deg.innerText = temp + "°" + "C";
    wName.innerText = data.weather[0].main;
    lName.innerText = data.name + ", " + data.sys.country;
    airS.innerText = "Air Satisfactory";
    fl.innerText = KtoC(data.main.feels_like) + "°C";
    //wind.innerText = data.main.wind.deg;
    h.innerText = data.main.humidity + "%";
    const VC = data.visibility / 1000;
    V.innerText = VC + "Km";
    AP.innerText = data.main.pressure + "hPa";
};

function KtoC(K) {
    return Math.floor(K - 273.15);
}

function getDateTime(dt, timezone) {
  const date = new Date((dt + timezone) * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZoneOffset: timezone
  };
  const dateTimeStr = date.toLocaleString(undefined, options);
  return dateTimeStr;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    if (city) {
        getWeatherByLocation(city)
    }
});
