window.onload = function () {
  setTimeout(function () {
    document.getElementById("preloader_malc").style.display = "none";
  }, 400);
};
let cityToShow = 0;
let citiesFav = [];
citiesFav = JSON.parse(localStorage.getItem("cities"));
console.log(citiesFav);
for (let i = 0; i < citiesFav.length; i++) {
  let apiKey = "debc3c128ef743b017affdc59b5c138a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citiesFav[i]}&appid=${apiKey}`;
  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(
        ".city-list"
      ).innerHTML += `<li id="city-item${i}"> <div id="container-res-fav" >
      <div class="header-fav">
          <p class="nameCity-fav${i}"></p>
      </div>
      <div class="body-item-fav">
          <p class="icon-fav${i}"></p>
          <p class="temp-fav${i}"></p>
          <p class="weather-fav${i}"></p>
          <img id="refresh" src="/img/icons8-refresh.gif">
          <img id="add-fav" src="/img/icons8-heart.gif">
      </div>
   </div></li>`;

      document.querySelector(`.nameCity-fav${i}`).textContent = data.name;
      document.querySelector(`.icon-fav${i}`).innerHTML =
        '<img src="https://openweathermap.org/img/wn/' +
        data.weather[0]["icon"] +
        '@2x.png">';

      document.querySelector(`.temp-fav${i}`).innerHTML =
        Math.round(data.main.temp - 273) + "&deg";
      document.querySelector(`.weather-fav${i}`).textContent =
        data.weather[0]["main"];
      document.getElementById(`city-item${i}`).style.display = "none";
      document.getElementById(`city-item${0}`).style.display = "";
    })
    .catch(function () {});
}

const leftArrow = document.getElementById("back-item");
const rightArrow = document.getElementById("next-item");

rightArrow.onclick = () => {
  leftArrow.removeAttribute("disabled");
  document.getElementById(`city-item${cityToShow}`).style.display = "none";
  cityToShow += 1;
  document.getElementById(`city-item${cityToShow}`).style.display = "";
  if (cityToShow === citiesFav.length - 1) {
    rightArrow.setAttribute("disabled", "disabled");
  }
};
leftArrow.onclick = () => {
  rightArrow.removeAttribute("disabled");
  document.getElementById(`city-item${cityToShow}`).style.display = "none";
  cityToShow -= 1;
  document.getElementById(`city-item${cityToShow}`).style.display = "";
  if (cityToShow === 0) {
    leftArrow.setAttribute("disabled", "true");
  }
};
