const KEY = '96b947a45d33d7dc1c49af3203966408';

const getData = async function(city){
    const base = `https://api.openweathermap.org/data/2.5/weather`
    const query = `?q=${city}&units=metric&appid=${KEY}`

    const request = await fetch(base + query);
    const data = await request.json()
    return data
}

const getWeather = async function(city){
    const data = await getData(city);
    console.log(data);

    return data
}

const elForm = document.querySelector('#form')
const elCityInput = document.querySelector('#city-input')
const elWeatherInfo = document.querySelector('#weather-info')

const update = function(weather){
    let timezone = weather.timezone;
    let sunrise = weather.sys.sunrise;
    let sunset = weather.sys.sunset;

    let timeSunrise = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
    let timeSunset = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');

    if(weather.name){
        elWeatherInfo.innerHTML = `
    <!-- Shaxar -->
    <div class="flex flex-col justify-center items-center p-3 space-y-2 border">
        <span class="font-bold text-2xl text-blue-600" id="city">${weather.name}, ${weather.sys.country}</span>
        <span class="text-lg">bugungi ob-havo</span>
    </div>
    <!-- temperatura -->
    <div class="flex flex-col justify-center items-center p-3 space-y-2 border">
        <span class="font-bold text-2xl text-blue-600">${Math.floor(weather.main.temp)} C</span>
        <p>Quyosh chiqishi: ${timeSunrise}</p>
        <p>Quyosh botish: ${timeSunset}</p>
    </div>
    <!-- Rasm -->
    <div class="flex flex-col justify-center items-center p-3 space-y-2 border">
        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="" width="100" height="100">
        <span class="text-lg">${weather.weather[0].main}</span>
    </div>
    <!-- temperatura -->
    <div class="flex flex-col justify-center items-center p-3 space-y-2 border">
        <p>Shamol tezligi: ${weather.wind.speed} km/h</p>
        <p>Namlik: ${weather.main.humidity}%</p>
    </div>
    `
    }else{
        alert('Iltimos shaxar nomini kiriting')
    }
    
}

elForm.addEventListener('submit', function(e){
    e.preventDefault()

    const cityName = elCityInput.value.trim()
    getData(cityName).then((data)=> update(data))

    elCityInput.value = ''
})