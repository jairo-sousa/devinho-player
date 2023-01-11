const track = new Audio("./tracks/diaster-kslv.ogg");
const playPauseButton = document.getElementById("playPauseButton");

trackStatus = {
	playing: false,
};

playPauseButton.addEventListener("click", togglePlayPause);

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
