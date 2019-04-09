const today = new Date(); // creates new Date object/instance representing the date and time UTC
let tomorrow = new Date(today.getTime()+(24*60*60*1000)); // gets milliseconds since Jan 1 1970 UTC, adds a day (in ms), creates new Date instance for that point in time.
const dateInput = document.getElementById("dateInput"); // gets the HTML element labeled "dateInput"
console.log(tomorrow)
tomorrow = tomorrow.toISOString().split("T")[0]; // ensures our date is a string, splits the string at the character "T" and returns the first half (index 0) which is a plain YYYY-MM-DD string
console.log(tomorrow)
dateInput.setAttribute("min", `${tomorrow}`) // sets min selectable date to tomorrow (assuming browser supports type="date")

function countDown(){
 const countDown = setInterval(() => { // countDown invokes the function expression countDown which runs every second until a condition is met using setInterval
   const {value: inputDate} = dateInput; //destructures value off of dateInput and aliases it as inputDate
   const timeZoneDiff = new Date().getTimezoneOffset(); //returns  difference between local time and UTC (in minutes)
   const countDownTo = new Date(inputDate).getTime(); // creates Date from YYYY-MM-DD input, and gets millisecond stamp until midnight UTC
   const currentTime = new Date().getTime(); // gets current UTC time and converts to  milliseconds

   const timeUntil = countDownTo - currentTime + (timeZoneDiff*1000*60); // gets ms difference between midnight UTC of chosen date and current time then adds the time zone difference in ms so we have the local time until inputDate

   const days = ("0" + Math.floor(timeUntil / (1000*60*60*24))) // (ms until/ms in a day) and rounding down to get #days until
   const hours = ("0" + Math.floor((timeUntil % (1000*60*60*24)) / (1000*60*60))).slice(-2) // (remainder of ms until/ms in a day)/(ms in an hour). .splice formatting so always two digits
   const minutes = ("0" + Math.floor((timeUntil % (1000*60*60)) / (1000*60))).slice(-2) // (remainder of ms until/ms in an hour)/(ms in a minute)
   const seconds = ("0" + Math.floor((timeUntil % (1000*60)) / 1000)).slice(-2) // (remainder of ms until/ms in a minutes)/(ms in a second)

   document.getElementById("days").innerText = `${days}` // sets "days" element innerText to calulated value
   document.getElementById("hours").innerText = `${hours}` // sets "hours" element innerText to calulated value
   document.getElementById("minutes").innerText = `${minutes}` // sets "minutes" element innerText to calulated value
   document.getElementById("seconds").innerText = `${seconds}` // sets "seconds" element innerText to calulated value


   if(timeUntil < 0){  // once timeUntil expires stops the setInterval, sets the innertext of an element to announce we have reached our desired date. Also alerts just for fun.
     clearInterval(countDown)
     document.getElementById("countdown").innerText = `It's ${inputDate}!`
     window.alert('Hooray!')
   }
 }, 1000)
}
