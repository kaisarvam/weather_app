
const cityform = document.querySelector('form');
const card =document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const box = document.querySelector('.container');
const body =document.querySelector('body');
const forecast = new Forecast();

//-----------update html UI-------------
const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-2">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-3">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src',iconSrc);
  //setting day and night img
  const timeSrc = weather.IsDayTime ? 'img/day.gif' : 'img/night.gif';
  time.setAttribute('src', timeSrc);

// setting day and night body background
if(weather.IsDayTime)
{
  body.classList.remove('body-night');
  body.classList.add('body-day');
 
}
else{
  body.classList.remove('body-day');
  body.classList.add('body-night');
  
}

  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

//update ui temperature 

  if(weather.Temperature.Metric.Value >=20)
 {
   box.classList.add('hot');
   box.classList.remove('cool');
 }
 else{
  box.classList.remove('hot');
  box.classList.add('cool');
 }
};




cityform.addEventListener('submit',(e)=>{

 //------ prevents defaults
  e.preventDefault();

  //----- scrols window after submit event
window.scrollBy(0, 900);
const city = cityform.city.value.trim();
cityform.reset();
//---- update UI with new city
forecast.updateCity(city)
.then(data=>updateUI(data))
.catch(err=>console.log(err));

//----stores city in browsers local storage

localStorage.setItem('city',city);

});


if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
