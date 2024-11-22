const container =  document.querySelector('.cards');

const input = document.querySelector('#search');

const btn = document.querySelector('#btn')

const loader = document.querySelector('#loader');
const not_found  = document.querySelector('#not-found')



btn.addEventListener('click', () => {
  getData(input.value)
})
getData()




async function  getData () {

  try {

  const urldata =  `https://api.weatherapi.com/v1/current.json?key=7da3829328c341e987432613242011&q=${city}&aqi=yes`

    not_found.style.display = 'none'
    loader.style.display = 'block';

    const response = await fetch(urldata + city);


    
    // Check for HTTP response status
    if (!response.ok) {
      container.innerHTML = '' ;
       not_found.style.display = 'block'
    }

    const data = await response.json();
     loader.style.display = 'none';

  AddDom(data)

} catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error (e.g. return a default value, rethrow the error, etc.)
    throw error; // Rethrow the error if needed
}


}




function  AddDom (data) {

console.log(data)

container.innerHTML = `   <div class="card loacation">

      <div class="city">
        <i class="fa-solid fa-location-dot"></i>
        <span>${search.value}</span>
      </div>

      <div class="time">
       <span>${data.location.localtime}</span>
      </div>

    </div>
    <main class="card">
      <div class="image">
      <img src="${data.current.condition.icon}" alt="">
      </div>
      <div class="condition">
        <p>${data.current.temp_c + 'c°'}</p>
          <span>${data.current.condition.text}</span>
      </div>
    </main>
    <div class=" card air">

      <div class=" same humidity">

        <div class="humidity-control"> 
           <i class="fa-solid fa-droplet"></i>
          <span>Humidity</span>
        </div>

        <span  class="perc"> ${data.current.humidity}%</span>

      </div>

      <div class=" same wind">

        <div class="wind-controll">
          <i class="fa-solid fa-wind"></i>
          <span>Wind speed</span>
        </div>

        <span class="perc">${data.current.wind_kph}M/s</span>

      </div>
    </div>`

}