const songs = [
    {
        name: "Salaar Action BGM",
        file: "salaar_action_bgm.mp3"
    },
    {
        name: "Salaar Climax",
        file: "salaar_climax.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const progress = document.getElementById("progress");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

function loadSong() {
    audio.src = "songs/" + songs[currentSong].file;
    songTitle.innerText = songs[currentSong].name;
}

function playPause() {
    const playBtn = document.querySelector(".play-btn");
    const cover = document.querySelector(".cover");

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "⏸";
        cover.classList.add("playing");
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
        cover.classList.remove("playing");
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong();
    audio.play();

    document.querySelector(".cover").classList.add("playing");
    document.querySelector(".play-btn").innerHTML = "⏸";
}

function prevSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong();
    audio.play();

    document.querySelector(".cover").classList.add("playing");
    document.querySelector(".play-btn").innerHTML = "⏸";
}

function toggleLoop() {
    audio.loop = !audio.loop;

    const loopBtn = document.querySelector(".loop-btn");

    if (audio.loop) {
        loopBtn.innerHTML = "🔁 Loop ON";
        loopBtn.style.background = "#4CAF50";
    } else {
        loopBtn.innerHTML = "🔁 Loop OFF";
        loopBtn.style.background = "#ff9800";
    }
}

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);

    let durationMinutes = Math.floor(audio.duration / 60) || 0;
    let durationSeconds = Math.floor(audio.duration % 60) || 0;

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    currentTimeDisplay.textContent =
        `${currentMinutes}:${currentSeconds}`;

    durationDisplay.textContent =
        `${durationMinutes}:${durationSeconds}`;
});

progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    if (!audio.loop) {
        nextSong();
    }
});

loadSong();