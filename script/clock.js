// Selectors

const clockElement = document.querySelector(".time");
const dayElement = document.querySelector(".day");
const monthElement = document.querySelector(".month");
const weekElement = document.querySelector(".week");

// Functions

function displayDate() {
	let weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jule", "Aug", "Sept", "Oct", "Nov", "Dec"];

	let date = new Date();
	let day = date.getDate();
	let week = date.getDay();
	let month = date.getMonth() + 1;

	dayElement.textContent = day;
	monthElement.textContent = monthArray[month - 1] + ",";
	weekElement.textContent = weekArray[week];
}

function displayTime() {
	let time = new Date();
	let h = time.getHours().toString();
	let m = time.getMinutes().toString();
	let s = time.getSeconds().toString();

	if (h.length < 2) {
		h = "0" + h;
	}

	if (m.length < 2) {
		m = "0" + m;
	}

	if (s.length < 2) {
		s = "0" + s;
	}
	
	let clockString ="<" + h + ":" + m + ":" + s + ">";
	clockElement.textContent = clockString;

	if (clockElement.textContent == "<00:00:00>") {
		dateCounting();
	}
}

displayDate();
displayTime();
setInterval(displayTime, 1000);