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

    return data
}

const elForm = document.querySelector('#form')
const elCityInput = document.querySelector('#city-input')
const elWeatherInfo = document.querySelector('#weather-info')
const elTable = document.querySelector('#table')

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
    elTable.classList.add('hidden')

    elCityInput.value = ''
})

// Cities
const cities = [
    {
        city: 'Toshkent',
        latitude: 41.2994958,
        longtitude: 69.24007340000003,
    },
    {
        city: 'Andijon',
        latitude: 40.815356,
        longtitude: 72.28375,
    },
    {
        city: 'Fargona',
        latitude: 40.37338,
        longtitude: 71.797833,
    },
    {
        city: 'Namangan',
        latitude: 41.005773,
        longtitude: 71.643603,
    },
    {
        city: 'Jizzax',
        latitude: 40.125044,
        longtitude: 67.880824,
    },
    {
        city: 'Sirdaryo',
        latitude: 40.837251,
        longtitude: 68.661841,
    },
    {
        city: 'Surhandaryo',
        latitude: 37.940901,
        longtitude: 67.570854,
    },
    {
        city: 'Qashqadaryo',
        latitude: 38.927116,
        longtitude: 65.753931,
    },
    {
        city: 'Samarqand',
        latitude: 39.627012,
        longtitude: 66.974973,
    },
    {
        city: 'Buxoro',
        latitude: 39.768083,
        longtitude: 64.455577,
    },
    {
        city: 'Navoiy',
        latitude: 40.103922,
        longtitude: 65.368834,
    },
    {
        city: 'Xorazm',
        latitude: 41.356534,
        longtitude: 60.856669,
    },
    {
        city: 'Nukus',
        latitude: 42.461891,
        longtitude: 59.616631,
    },

  ]

  let lat;
  let long;
  const elTbody = document.querySelector('#tbody')

  cities.forEach(function(city){
      lat = city.latitude
      long = city.longtitude

      const getDataCity = async function(){
        const base = `https://api.openweathermap.org/data/2.5/weather`
        
        const query = `?lat=${lat}&lon=${long}&units=metric&appid=${KEY}`
    
        const request = await fetch(base + query);
        const data = await request.json()
        return data
    }
    
    const getWeatherCity = async function(){
        const data = await getDataCity();
        return data
    }
    
    const dataCity = getWeatherCity()
    dataCity.then((data)=> {
        console.log(data);
        elTbody.innerHTML += `
        <tr class="flex items-center bg-white">
            <td class="py-5 w-20 md:w-28">
                <img class="w-20 h-20 mr-10" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="temperature">
            </td>
            <td class="w-3/12 text-center">
                <span class="text-sm font-normal whitespace-nowrap">${data.name}</span>
            </td>
            <td class="w-3/12 text-center">
                <span class="text-sm font-normal whitespace-nowrap">${Math.floor(data.main.temp)} C</span>
            </td>
            <td class="w-3/12 text-center">
                <span class="text-sm font-normal whitespace-nowrap">${data.weather[0].main}</span>
            </td>
            <td class="hidden w-3/12 text-center md:block">
                <span class="text-sm font-normal">${data.wind.speed} km/h</span>
            </td>
            <td class="hidden w-3/12 text-center pr-6 md:block">
                <span class="text-sm font-normal whitespace-nowrap">${data.main.humidity}%</span>
            </td>
        </tr>
      `
    });
  })



  

