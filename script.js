// Creamos el objeto weather con sus funcionalidades (apikey, funciones)
// En la funcion fetchWeather le pasamos como parametro la ciudad elegida a buscar
// el this es usado para acceder a las propiedades y metodos del objeto, 
// displayWeather es el metodo que usamos para acceder a todas las propiedades de la API que luego es iniciada en la funcion FethWeather
let weather = {
    "apiKey" : "1857d1aeae576e988d845337306d1ddf",
    fetchWeather: function (city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then(res => res.json())
        .then(data => displayWeather(data));
    }
}

//templates
function displayWeather (data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;
    const { temp, humidity } = data.main;
    const tempRound = Math.floor(temp)
    //redondeamos la temperatura con Math.Floor
    //capturamos las propiedades del CSS para cambiarlas dinamicamente
    const city = document.querySelector('.city')
    city.innerText = `Clima en ${name}`
    const temper = document.querySelector('.temper')
    temper.innerText = `${tempRound}°`
    const iconImg = document.querySelector('.icon')
    iconImg.src = `http://openweathermap.org/img/wn/${icon}.png`
    const desc = document.querySelector('.description')
    desc.innerText = description;
    const windVel = document.querySelector('.wind')
    windVel.innerText = `Velocidad del viento: ${speed} km/h`
    const hum = document.querySelector('.humedad')
    hum.innerText = `Humedad: ${humidity}%`;
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
}   


//variables
const form = document.querySelector('form')
const inputSearch = document.querySelector('.searchBar')
const btn = document.querySelector('.btn')
const loading = document.querySelector('.loading')
const city = document.querySelector('.city')

// evento enter formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const citySearch = inputSearch.value;
  
    try{
        if (citySearch){
            weather.fetchWeather(citySearch)
            loading.classList.remove('loading')
             inputSearch.value = '';
         }
    }
    catch(err){
        alert(err)
    }
})

//evento click button
btn.addEventListener('click', weather.fetchWeather)

