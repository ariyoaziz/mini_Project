const seconds = document.querySelector(".seconds .number"),
  minutes = document.querySelector(".minutes .number"),
  hours = document.querySelector(".hours .number"),
  days = document.querySelector(".days .number");

// Fungsi untuk mendapatkan sisa waktu dari penyimpanan lokal
function getRemainingTime() {
  const storedTime = localStorage.getItem("countdown_time");

  if (storedTime) {
    return JSON.parse(storedTime);
  } else {
    return {
      secValue: 11,
      minValue: 2,
      hourValue: 2,
      dayValue: 100
    };
  }
}

// Fungsi untuk menyimpan sisa waktu ke penyimpanan lokal
function saveRemainingTime() {
  const remainingTime = {
    secValue,
    minValue,
    hourValue,
    dayValue
  };

  localStorage.setItem("countdown_time", JSON.stringify(remainingTime));
}

let { secValue, minValue, hourValue, dayValue } = getRemainingTime();

const timeFunction = setInterval(() => {
  secValue--;

  if (secValue === 0) {
    minValue--;
    secValue = 60;
  }
  if (minValue === 0) {
    hourValue--;
    minValue = 60;
  }
  if (hourValue === 0) {
    dayValue--;
    hourValue = 24;
  }

  if (dayValue === 0) {
    clearInterval(timeFunction);
    localStorage.removeItem("countdown_time");
  }

  seconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
  minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
  hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
  days.textContent = dayValue < 10 ? `0${dayValue}` : dayValue;

  saveRemainingTime();
}, 1000); //1000ms = 1s
