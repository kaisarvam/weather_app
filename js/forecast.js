const loader = document.getElementById('preloader');

class Forecast{

constructor(){
    this.Key = 'rVgCBYmLKHlt0GCmkSxfptVoF7TwTuTw';
    this.weatherURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
   
}
async updateCity(city){
    loader.classList.remove("d-none");
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    loader.classList.add("d-none");
    return {cityDets,weather};
}



async getWeather(id){
    const query =`${id}?apikey=${this.Key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
   
    return data[0];
} 

async getCity(city){

   
    const query =`?apikey=${this.Key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
}
}
