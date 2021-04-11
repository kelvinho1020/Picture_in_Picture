const videoElement = document.querySelector("#video");
const button = document.querySelector("#button");
const buttonToggle = document.querySelector("#button_toggle");

async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.classList.remove("hidden");
		videoElement.srcObject = mediaStream;
		videoElement.addEventListener("loadedmetadata", function () {
			videoElement.play();
		});

		button.closest(".button-container").classList.add("hidden");
		buttonToggle.closest(".button-container").classList.remove("hidden");
	} catch (err) {
		console.log(err);
	}
}

button.addEventListener("click", function () {
	selectMediaStream();
});

buttonToggle.addEventListener("click", async function () {
	try {
		if (!document.pictureInPictureElement) {
			await videoElement.requestPictureInPicture();
		} else {
			await document.exitPictureInPicture();
		}
	} catch (err) {
		alert("Sorry, we got some problem now, please try it again");
	}
});

videoElement.addEventListener("enterpictureinpicture", function () {
	buttonToggle.textContent = "STOP";
});

videoElement.addEventListener("leavepictureinpicture", function () {
	buttonToggle.textContent = "START";
	button.closest(".button-container").classList.remove("hidden");
	videoElement.classList.add("hidden");
	buttonToggle.closest(".button-container").classList.add("hidden");
});

// Browser support or not
function checkPipIsSupported() {
	if (!"pictureInPictureEnabled" in document) {
		alert("Picture In Picture is not supported. Please change a browser");

		button.closest(".button-container").classList.add("hidden");
	}
}

checkPipIsSupported();
