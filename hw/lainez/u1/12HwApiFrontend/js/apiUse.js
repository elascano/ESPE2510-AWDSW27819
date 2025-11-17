const apiKey = "621812f56852f2d0349d118a809ef52d";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

async function getWeather(city){
    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`
        const response = await fetch(apiUrl);
        if(!response.ok) throw new Error("Ciudad no encontrada");
        const data = await response.json();

        weatherDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperatura: </strong> ${data.main.temp}</p>
            <p><strong>Clima: </strong> ${data.weather[0].description}</p>
            <p><strong>Humedad: </strong> ${data.main.humidity}%</p>
            <p><strong>Viento: </strong>${data.wind.speed} m/s</p>
        `;

    }catch(error){
        weatherDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

searchBtn.addEventListener("click", () =>
    {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
        else weatherDiv.innerHTML = "<p>escribe una ciudad.</p>";
    }
);



