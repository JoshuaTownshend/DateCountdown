////-----------CALENDER---------------------///////
//set variables and elements
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById('year');
selectMonth = document.getElementById('month');

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
//on init, creates calender based on current month
createCalender(currentMonth, currentYear);

function createCalender(month, year) {
    //amount of empty spaces before creating 1st date
    let firstDay = (new Date(year, month)).getDay();
    //calls table
    const tbl = document.getElementById("calender-table");
    //inits html
    tbl.innerHTML = "";
    //sets displayed month and year based on passed values
    monthAndYear.innerHTML = months[month] + " " + year;

    //gets year and month values from current select value
    selectYear.value = year;
    selectMonth.value = month;

    //function to create dates in table
    let date = 1;
    //column creation, max of 6
    for (let i = 0; i < 6; i++) {
        //create row
        let row = document.createElement("tr");
        //row creation, max 7
        for (let j = 0; j < 7; j++) {
            //if first column, and j < firstday, create empty spaces
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");

                cell.appendChild(cellText);
                row.appendChild(cell);
                if (!new RegExp("1-31").test(cell.innerText)) {
                    cell.classList.add("bg-none");
                }
            }
            //if date > max days in month, terminate function
            else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } else if (j === 0) {
                    cell.classList.add("bg-sun");
                } else if (j === 6) {
                    cell.classList.add("bg-sat");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++
            }
        }
        tbl.appendChild(row);

    }
}

//goes forward 1 month on next button click
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    createCalender(currentMonth, currentYear);
}

//goes back 1 month on previous button click
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    createCalender(currentMonth, currentYear);
}

//changes current month/year on select element change
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    createCalender(currentMonth, currentYear);
}

//calculate max number of dates in given month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

///------------COUNTDOWN--------------------//////
//initializing countdown elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("secs");
//---------------------------------------------
//displays session storage values on pageload
function displayStorage() {
    document.getElementById('ty').innerHTML = localStorage.getItem('tyq');
    document.getElementById('tm').innerHTML = localStorage.getItem('tmq');
    document.getElementById('td').innerHTML = localStorage.getItem('tdq');
}
//-------------------------------------------------
//submit button click event
//saves values to session storage
function submit(e) {
    var d = new Date();
    var m = d.getMonth();
    var y = d.getFullYear();
    //current date called by clicked cell contents
    if (parseInt(e.target.innerText) < 1 || Number.isInteger(parseInt(e.target.innerText)) === false) {
        return e;
    } else if (parseInt(e.target.innerText) <= today.getDate() && selectMonth.value <= m && selectYear.value <= y) {
        alert("You cannot countdown into the past!");
        return e;
    } else if (selectYear.value < y) {
        alert("You cannot countdown into the past!");
        return e;
    } else {
        document.getElementById("td").innerHTML = e.target.innerText;
        var tdq = e.target.innerText;
        localStorage.setItem('tdq', tdq);
        //current month called by current select value
        document.getElementById("tm").innerHTML = parseInt(selectMonth.value) + 1;
        var tmq = parseInt(selectMonth.value) + 1;
        localStorage.setItem('tmq', tmq);
        //current year called by current select value
        document.getElementById("ty").innerHTML = selectYear.value;
        var tyq = selectYear.value;
        localStorage.setItem('tyq', tyq);
    }
}
//--------------------------------------------------
//countdown calculation function
function countdown() {
    const dayInput = document.getElementById("td").innerHTML;
    const monthInput = document.getElementById("tm").innerHTML - 1;
    const yearInput = document.getElementById("ty").innerHTML;
    //console.log(dayInput);
    //console.log(monthInput);
    //console.log(yearInput);


    const newDate = new Date(yearInput, monthInput, dayInput);
    //console.log(newDate);

    const currentDate = new Date();
    //console.log(currentDate);

    //convert from ms to s
    const totalSeconds = (newDate - currentDate) / 1000;
    //console.log(totalSeconds);

    //1 day = 86400s
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    if (Math.sign(days) > 0) {
        daysEl.innerHTML = days;
    } else {
        daysEl.innerHTML = 0;
    }

    if (Math.sign(hours) > 0) {
        hoursEl.innerHTML = hours;
    } else {
        hoursEl.innerHTML = 0;
    }

    if (Math.sign(mins) > 0) {
        minsEl.innerHTML = mins;
    } else {
        minsEl.innerHTML = 0;
    }

    if (Math.sign(seconds) > 0) {
        secondsEl.innerHTML = seconds;
    } else {
        secondsEl.innerHTML = 0;
    }


}
//-------------------------------------------------------------
//runs functions
displayStorage();
countdown();
setInterval(countdown, 1000);