const placeinput = document.querySelector(".placeinput");
const placename = document.querySelector(".locationname");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const submit = document.querySelector(".button");
const folowingday1 = document.querySelector(".tomorrow1");
const folowingday2 = document.querySelector(".tomorrow2");
const folowingday3 = document.querySelector(".tomorrow3");
const folowingday4 = document.querySelector(".tomorrow4");
const todayimage = document.querySelector(".todayimage");
const todayimage1 = document.querySelector(".todayimage1");
const todayimage2 = document.querySelector(".todayimage2");
const todayimage3 = document.querySelector(".todayimage3");
const todayimage4 = document.querySelector(".todayimage4");
const day1 = document.querySelector(".day1");
const day2 = document.querySelector(".day2");
const day3 = document.querySelector(".day3");
const day4 = document.querySelector(".day4");

async function weather(placesearch){

  const key = ``;
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${placesearch}&appid=${key}`
  ).then((res) => res.json());

  // console.log(data.city.name);
  // console.log(data.list[0].main.temp_max);
  // console.log(data.list[0].weather[0].description);

  let results = [];
  let today = new Date().getHours();
  // console.log(today);
  let data1 = data.list;
  for (let i = 0; i < data1.length; i++) {
    let founddate = new Date(data.list[i].dt_txt).getHours();

    if (founddate <= today && today - founddate <= 2) {
      // console.log(founddate);
      // console.log(today);
      results.push(data1[i]);
    }
  }
  // console.log(results);
  const temp = results[0].main.temp_max - 273;
  const temp1 = results[1].main.temp_max - 273;
  const temp2 = results[2].main.temp_max - 273;
  const temp3 = results[3].main.temp_max - 273;
  const temp4 = results[4].main.temp_max - 273;

  const date1 = new Date(results[1].dt * 1000).toLocaleString("en-US", {
    weekday: "long",
  });
  const date2 = new Date(results[2].dt * 1000).toLocaleString("en-US", {
    weekday: "long",
  });
  const date3 = new Date(results[3].dt * 1000).toLocaleString("en-US", {
    weekday: "long",
  });
  const date4 = new Date(results[4].dt * 1000).toLocaleString("en-US", {
    weekday: "long",
  });

  placename.textContent = data.city.name;
  temperature.textContent = `temperature ${temp.toFixed(2)}°C`;
  description.textContent = results[0].weather[0].description;
  todayimage.src = ` https://openweathermap.org/img/wn/${results[0].weather[0].icon}@2x.png`;
  todayimage1.src = ` https://openweathermap.org/img/wn/${results[1].weather[0].icon}@2x.png`;
  todayimage2.src = ` https://openweathermap.org/img/wn/${results[2].weather[0].icon}@2x.png`;
  todayimage3.src = ` https://openweathermap.org/img/wn/${results[3].weather[0].icon}@2x.png`;
  todayimage4.src = ` https://openweathermap.org/img/wn/${results[4].weather[0].icon}@2x.png`;

  folowingday1.textContent = `${temp1.toFixed(2)}°C`;
  folowingday2.textContent = `${temp2.toFixed(2)}°C`;
  folowingday3.textContent = `${temp3.toFixed(2)}°C`;
  folowingday4.textContent = `${temp4.toFixed(2)}°C`;
  day1.textContent = date1;
  day2.textContent = date2;
  day3.textContent = date3;
  day4.textContent = date4;

}

weather("nyahururu")

submit.addEventListener("click", async function () {
  placesearch = placeinput.value;
  
  weather(placesearch)
});
