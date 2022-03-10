// Как сделать живой поиск.
// При нажатии на поле ввода мы делаем он клик.
// Вводим букву и он отправляет запрос на сервер и выдает нам в список html 3 первых варианта.
// Потом вводим еще одну и все тоже самое(цикл).
// При нажатии одного из вариантов выполняется код ниже.

// Сделать подробную погоду
window.onload = function () {
  setTimeout(function () {
    document.getElementById("preloader_malc").style.display = "none";
  }, 400);
};

let cityName = "";
document.getElementById("container-res").style.display = "none";

document.getElementById("button").onclick = function () {
  document.getElementById("container-res").style.display = "";
  cityName = document.getElementById("inputItem").value;
  console.log(cityName);

  let apiKey = "debc3c128ef743b017affdc59b5c138a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".nameCity").textContent = data.name;

      document.querySelector(".icon").innerHTML =
        '<img src="https://openweathermap.org/img/wn/' +
        data.weather[0]["icon"] +
        '@2x.png">';

      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp - 273) + "&deg";
      document.querySelector(".weather").textContent = data.weather[0]["main"];
    })
    .catch(function () {});
};

document.getElementById("refresh").onclick = function () {
  let apiKey = "debc3c128ef743b017affdc59b5c138a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".nameCity").textContent = data.name;

      document.querySelector(".icon").innerHTML =
        '<img src="https://openweathermap.org/img/wn/' +
        data.weather[0]["icon"] +
        '@2x.png">';

      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp - 273) + "&deg";
      document.querySelector(".weather").textContent = data.weather[0]["main"];
    })
    .catch(function () {});
};

document.getElementById("add").onclick = function () {
  const currentCities = JSON.parse(localStorage.getItem("cities")) || [];
  localStorage.setItem("cities", JSON.stringify([...currentCities, cityName]));
};
