import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const inputEl = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const times = {
    day: document.querySelector('span[data-days]'),
    hour: document.querySelector('span[data-hours]'),
    minute: document.querySelector('span[data-minutes]'),
    second: document.querySelector('span[data-seconds]'),
};

btn.disabled = true;

const endTime = flatpickr(inputEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = Date.now();
        if (endTime.selectedDates[0] <= currentTime) {
            Notiflix.Notify.failure("Please choose a date in the future")
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
        console.log(selectedDates[0]);
    },
});

const timer = {
    start() {
        setInterval(() => {         
            const startTime = Date.now();
            const deltaTime = endTime.selectedDates[0] - startTime;
            const time = convertMs(deltaTime);
            updateClockface(time);
        }, 1000)
    },
};

btn.addEventListener('click', () => {
    inputEl.disabled = true;
    btn.disabled = true;
    timer.start();
});

function updateClockface({ days, hours, minutes, seconds }) {
    times.day.textContent = days;
    times.hour.textContent = hours;
    times.minute.textContent = minutes;
    times.second.textContent = seconds;
};

function pad(value) {
    return String(value).padStart(2, '0')
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    
return { days, hours, minutes, seconds };

};
