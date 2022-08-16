console.log("open weather api");
// getting elements from html document
const wrapper=document.querySelector('wrapper');
const inputPart= document.querySelector('input-part');
const infoTxt= document.querySelector('info-txt');
const inputField= document.querySelector('input');
const message= document.getElementById('message');
// const container=document.getElementById('container');
inputField.addEventListener('keyup',e =>{
    // if user pressed enter button and input value is not empty.
    if (e.key=="Enter" && inputField.value !="") {
        requestApi(inputField.value);
    }
});
function requestApi(city){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ff07e2d9d0bcf1047e75b63ff370a98`;
    // getting api response and then passing that response by parsing it into an object. Then a function is calling weatherDetails function with passing api result as an argument.
    fetch(api).then(response=>(response.json())).then(result => weatherDetails(result));
    message.textContent="getting weather details";
    message.classList.add('pending');
}
// api will return weather details of entered city
function weatherDetails(info){
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
        
document.getElementById('container').classList.add('active');

// passing above values to the html elements
document.getElementById('numb').innerHTML=temp;
document.getElementById('weather').innerHTML=description;
document.getElementById('locate').innerHTML=`${city}, ${country}`;
document.getElementById('numb-2').innerHTML=feels_like;
document.getElementById('humid').innerHTML=`${humidity}%`;


// wrapper.querySelector('.temp .numb').innerHTML=temp;
// wrapper.querySelector('.weather').innerHTML=description;
// wrapper.querySelector('.location span').innerHTML=`${city}, ${country}`;
// wrapper.querySelector('.temp .numb-2').innerHTML=feels_like;
// wrapper.querySelector('.humidity span').innerHTML=`${humidity}%`;
 }
}
