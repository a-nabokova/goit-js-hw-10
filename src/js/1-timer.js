



import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const input = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('[data-start]');
const clockDays = document.querySelector('[data-days]');
const clockHours = document.querySelector('[data-hours]');
const clockMinutes = document.querySelector('[data-minutes]');
const clockSeconds = document.querySelector('[data-seconds]');
startBtn.addEventListener('click', handleStartClock);
 
startBtn.disabled = true; 
 
let userSelectedDate = ''; 
let timerId = null;

 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const now = new Date();; 
        if (now > selectedDates[0]) {
            startBtn.disabled = true;
            iziToast.show({
                message: 'Please choose a date in the future',
                color: 'red',
                close: true,
                position: 'topCenter',
            });
            
        } else {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false;
            console.log(userSelectedDate);
        }   
    }, 
  };
 
const fp = flatpickr(input, options); 



function handleStartClock() {
    timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime; 

        if (deltaTime <= 0) {
            clearInterval(timerId);
            input.disabled = false; 
            updateClock({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            return;
            

        }
        const time = convertMs(deltaTime); 
        updateClock(time); 
        startBtn.disabled = true;
        input.disabled = true; 

    }, 1000)
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}
  

function updateClock({ days, hours, minutes, seconds }) {
    clockDays.textContent = `${days}`; 
    clockHours.textContent = `${hours}`; 
    clockMinutes.textContent = `${minutes}`; 
    clockSeconds.textContent = `${seconds}`; 
 
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}
