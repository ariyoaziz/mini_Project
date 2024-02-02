const seconds = document.querySelector(".seconds .number"),
  minutes = document.querySelector(".minutes .number"),
  hours = document.querySelector(".hours .number"),
  days = document.querySelector(".days .number");

function getRemainingTime() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)countdown_time\s*=\s*([^;]*).*$)|^.*$/, "$1");

  if (cookieValue) {
    return JSON.parse(cookieValue);
  } else {
    return {
      secValue: 11,
      minValue: 2,
      hourValue: 2,
      dayValue: 100
    };
  }
}

function saveRemainingTime() {
  const remainingTime = {
    secValue,
    minValue,
    hourValue,
    dayValue
  };

  document.cookie = `countdown_time=${JSON.stringify(remainingTime)}; expires=${new Date(Date.now() + 604800000).toUTCString()}; path=/`;
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
    document.cookie = "countdown_time=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  seconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
  minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
  hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
  days.textContent = dayValue < 10 ? `0${dayValue}` : dayValue;

  saveRemainingTime();
}, 1000); //1000ms = 1s
