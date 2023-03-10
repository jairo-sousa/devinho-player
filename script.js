const track = new Audio("./tracks/diaster-kslv.ogg");
const playPauseButton = document.getElementById("playPauseButton");
const playBackward = document.getElementById("playBackward");
const playforward = document.getElementById("playforward");

const progressBar = document.getElementById("progressBar");
const timePlayed = document.getElementById("timePlayed");
const timeToPlay = document.getElementById("timeToPlay");

const trackStatus = {
	playing: false,
};

track.addEventListener("timeupdate", updateProgress);
playPauseButton.addEventListener("click", togglePlayPause);
playBackward.addEventListener("click", () => changeTime(-10, track.duration));
playforward.addEventListener("click", () => changeTime(10, track.duration));

window.onkeydown = function (event) {
	try {
		shortcuts = {
			" ": togglePlayPause,
			ArrowLeft: () => {
				changeTime(-10, track.duration);
			},
			ArrowRight: () => {
				changeTime(10, track.duration);
			},
		};
		shortcuts[event.key]();
	} catch {
		return null;
	}
};

function togglePlayPause() {
	if (!trackStatus.playing) {
		play();
	} else {
		pause();
	}
}

function play() {
	track.play();
	trackStatus.playing = true;
	playPauseButton.src = "./assets/pauseButton.svg";
}

function pause() {
	track.pause();
	trackStatus.playing = false;
	playPauseButton.src = "./assets/playButton.svg";
}

function changeTime(time, totalTime) {
	if (track.currentTime < totalTime - 9) {
		track.currentTime += time;
	} else {
		track.currentTime = 0;
		pause();
	}
}

function updateProgress() {
	const played = convertToMinSec(track.currentTime);
	const toPlay = convertToMinSec(track.duration - track.currentTime);

	timePlayed.innerText = `${played.minutes}:${played.seconds}`;
	timeToPlay.innerText = `${toPlay.minutes}:${toPlay.seconds}`;

	progressBar.style.setProperty(
		"--progress",
		track.currentTime * (100 / track.duration)
	);

	if (track.currentTime == track.duration) {
		track.currentTime = 0;
		pause();
	}
}

function convertToMinSec(sec) {
	const minutes = round(Math, sec / 60);
	const seconds = round(Math, sec % 60);
	return { minutes: doubleDigit(minutes), seconds: doubleDigit(seconds) };
}

function round(math, value) {
	return math.round(value);
}

function doubleDigit(value) {
	if (!(value >= 10)) {
		value = "0" + value;
	}
	return value;
}
