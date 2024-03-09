import { doRequest } from "./utils/fetch.js";
import { handleLogout } from "./utils/logout.js";
import { dropdown, responsiveNav } from "./header.js";

export async function handlerNotification() {
	// setup chat scoket
	const notifyScoket = new WebSocket(
		"wss://" + window.location.host + "/ws/notify/",
	);

	// on socket open
	notifyScoket.onopen = function (e) {
		console.log("Socket notify connected.");
	};

	// on socket close
	notifyScoket.onclose = function (e) {
		console.log("Socket notify closed unexpectedly");
	};

	// on receiving message on group
	notifyScoket.onmessage = function (e) {
		const data = JSON.parse(e.data);
		console.log(data);
		updateHeader();
	};

	// Listen for hash changes
	window.addEventListener("hashchange", function () {
		const pageNoNotification = ["login", "register"];
		const currentHash = window.location.hash.substring(1);
		if (pageNoNotification.includes(currentHash)) {
			notifyScoket.close();
		}
	});
}

async function updateHeader() {
	const header = document.getElementById("header");
	const data = await doRequest.get(`/update_header/`);
	header.innerHTML = data.html;
	handleNotificationVisual();
	handlerNotificationAction();
	handleLogout();
	responsiveNav();
	dropdown();
}

export function handleNotificationVisual() {
	let count = document.querySelectorAll(".notif").length;
	if (count > 0) {
		const bellBtn = document.querySelector(".bell-btn");
		bellBtn.classList.add("show-notification");
	} else {
		const bellBtn = document.querySelector(".bell-btn");
		bellBtn.classList.remove("show-notification");
	}
}

export function handlerNotificationAction() {
	const notificationElements = document.querySelectorAll('[id^="notif-"]');
	notificationElements.forEach((element) => {
		const id = element.id.split("-")[1];
		const acceptElement = document.getElementById(`accept-${id}`);
		const denyElement = document.getElementById(`deny-${id}`);

		acceptElement.addEventListener("click", () => {
			// send accept friendrequest
			console.log(`Accept clicked for notification ${id}`);
		});

		denyElement.addEventListener("click", () => {
			// send deny friendrequest
			console.log(`Deny clicked for notification ${id}`);
		});
	});
}
