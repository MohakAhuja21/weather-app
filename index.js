console.log("open weather api, openMap weather icons");
// getting elements from html document
const wrapper=document.querySelector('wrapper');
const inputPart= document.querySelector('input-part');
const infoTxt= document.querySelector('info-txt');
const inputField= document.querySelector('input');
const message= document.getElementById('message');
const locationBtn=document.querySelector('button');
const weatherIcon= document.querySelector('.weather-part img');
const backArrow= document.querySelector('header i');

// calling api
let api;

// getting user location when he press button using geolocation api.
locationBtn.addEventListener('click',()=>{
    if (navigator.geolocation) { //if browser supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // if getCurrentPosition method is successful then (onSuccess) will be called and if any error occurred then onError() will be called.
    }
    else{
        alert('your browser does not support geoLocation.');
    }
})
function onSuccess(position){
    // getting latitude and longitude of user location.
    const{latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7ff07e2d9d0bcf1047e75b63ff370a98&units=metric`;
    fetchData();
    
}
function onError(error){
    message.textContent=error.message;
    message.classList.add('error');
}
inputField.addEventListener('keyup',e =>{
    // if user pressed enter button and input value is not empty.
    if (e.key=="Enter" && inputField.value !="") {
        requestApi(inputField.value);
    }
});
function requestApi(city){
    // &units=metric is used to convert .f to celsius
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ff07e2d9d0bcf1047e75b63ff370a98`;
    fetchData();
}

function fetchData(){
    // getting api response and then passing that response by parsing it into an object. Then a function is calling weatherDetails function with passing api result as an argument.
    fetch(api).then(response=>(response.json())).then(result => weatherDetails(result));
    message.textContent="getting weather details";
    message.classList.add('pending');
}

function weatherDetails(info){
// api will return weather details of entered city
    if (info.cod =="404") {
        document.getElementById('message').innerText=`${inputField.value} isn't a valid city name`;
    message.classList.replace('pending','error');
    }
    else{
        // getting required prop values from info object
        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;

// getting image ID
if (id==800) {
    weatherIcon.src="images/sun.png"; 
} 
else if(id==200 && id<=232){
    weatherIcon.src="images/thunderstorm.png";
}
else if(id==500 && id<=531){
    weatherIcon.src="images/rain.png";
}
else if(id==801 && id<=804){
    weatherIcon.src="images/cloud.png";
}
else if(id==600 && id<=622){
    weatherIcon.src="images/snow.png";
}
else if(id==701 && id<=781){
    weatherIcon.src="images/sky.png";
}
// passing above values to the html elements
document.getElementById('numb').innerHTML=Math.floor(temp); //floor method round a number to nearest integer.
document.getElementById('weather').innerHTML=description;
document.getElementById('locate').innerHTML=`${city}, ${country}`;
document.getElementById('numb-2').innerHTML=Math.floor(feels_like);
document.getElementById('humid').innerHTML=`${humidity}%`;

document.getElementById('container').classList.add('active');
 }
}
// back arrow will remove below classLists and will bring back to starting point.
backArrow.addEventListener('click',()=>{
    document.getElementById('container').classList.remove('active');
    message.classList.remove('pending','error');
})