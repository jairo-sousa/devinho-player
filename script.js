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
playBackward.addEventListener("click", () => changeTime(-10, 81));
playforward.addEventListener("click", () => changeTime(10, 81));

function togglePlayPause() {
	if (!trackStatus.playing) {
		track.play();
		trackStatus.playing = true;
		playPauseButton.src = "./assets/pauseButton.svg";
	} else {
		track.pause();
		trackStatus.playing = false;
		playPauseButton.src = "./assets/playButton.svg";
	}
}

function changeTime(time, totalTime) {
	if (track.currentTime < totalTime - 9) {
		track.currentTime += time;
	} else {
		track.currentTime = 0;
		togglePlayPause();
	}
}

function updateProgress() {
	progressBar.style.setProperty(
		"--progress",
		track.currentTime * (100 / track.duration)
	);
}
