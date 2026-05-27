//let cityname = document.querySelector('.ip1').value
let wdate = document.querySelector('.wdate')
let wcast = document.querySelector('.wcast')
let wicon = document.querySelector('.wicon')
let wtemp = document.querySelector('.wtemp')
let wmin = document.querySelector('.wmin')
let wmax = document.querySelector('.wmax')
let city = document.querySelector('.cityname')
let wdata = document.querySelector('.wdata')
let main = document.querySelector('.main')
let tp = document.querySelector('.tp')
let winds = document.querySelector('.winds')
let hum = document.querySelector('.hum')
let pressure = document.querySelector('.pressure')
let search = document.querySelector('.search')

let cityname = "pune";

search.addEventListener('submit' , (e)=>{
    e.preventDefault();
    cityname =  document.querySelector('.ip1').value
    console.log(cityname)
    getwdata();
    cityname = '';
})

const getwdata = async (e) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6c0bfc672df1665630e9308fe8d62fae`

    try {
       const res = await fetch(api);
       const data =await res.json();
       console.log(data)
       const {mains ,name ,sys , weather , wind} = data

       //Date
       const wkdate = new  Date(data.dt*1000);  //sec to ms
       let date_display  = new Intl.DateTimeFormat("en-US", {
                     weekday: "long",  year:"numeric",
                     month: "long", day:'numeric',
                     hour:"numeric",minute:"numeric",
                 }).format(wkdate)
       wdate.innerText = `${date_display}`


       //ciy , country
       const regionNamesInEnglish = new Intl.DisplayNames([`${sys.country}`], { type: "region" });
       city.innerText = `${data.name} , ${regionNamesInEnglish.of(`${sys.country}`)} `


       //wcast
       wcast.innerHTML = weather[0].main;
       console.log(weather[0].icon)
       const icon = data.weather[0].icon;
       wicon.innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@2x.png>`;
    //    if(weather[0].main == 'Clouds'){
    //       main.innerHTML = ``
    //    }

       //wtemp
       wtemp.innerHTML=`${data.main.temp}&#176`
       wmin.innerHTML = `Min :${data.main.temp_min}&#176`
       wmax.innerHTML  = `Max :${data.main.temp_max}`

       //lower
       tp.innerHTML = `${(data.main.temp-273).toFixed(2)}&#176`
       hum.innerHTML = `${data.main.humidity}`
       pressure.innerHTML = `${data.main.pressure} Pa`
       console.log(data.wind.speed)
       winds.innerHTML = `${data.wind.speed}`
        
    } catch (error) {
        console.log(error)
    }
}


document.body.addEventListener('load' , getwdata())