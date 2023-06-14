"use strict";

const urlParams = new URLSearchParams(window.location.search);
const songApiId = urlParams.get("songApiId");
const nickname = urlParams.get("nickname");

let jsonData = { songApiId: songApiId, nickname: nickname };

async function getSongs() {
    try {
        const response = await fetch(
            `https://localhost:7140/api/song?nickname=${nickname}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            return response.json();
        } else {
            console.error("Failed to get song");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function checkLikedSongs() {
    const likedSongs = await getSongs();

    console.log(likedSongs);

    likedSongs.forEach((likedSong) => {
        if (likedSong == songApiId) {
            const button = document.getElementById("favorite-button");
            button.classList.add("clicked");
        }
    });
}

checkLikedSongs();

window.addEventListener("DOMContentLoaded", () => {
    checkLikedSongs();
});

async function likeSong() {
    fetch("https://localhost:7140/api/song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                console.log("Song liked");
            } else {
                // Request failed
                console.error("Failed to like song");
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
}

const button = document.getElementById("favorite-button");
button.addEventListener("click", function () {
    button.classList.add("clicked");
    likeSong();
});

async function fetchSongLyrics(value) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${value}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "4f07bd5b9bmsha5692fd9a6f4f18p162c47jsn6f89db937066",
            "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function fetchSongDetails(value) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${value}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "4f07bd5b9bmsha5692fd9a6f4f18p162c47jsn6f89db937066",
            "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function search(value) {
    try {
        let songDetailsResult = await fetchSongDetails(value);
        let songLyricsResult = await fetchSongLyrics(value);
        // Selecting elements by their IDs
        const trackImageElement = document.getElementById("track-image");
        trackImageElement.src =
            songDetailsResult.song.song_art_image_thumbnail_url;
        const trackNameElement = document.getElementById("track-name");
        const artistNameElement = document.getElementById("artist-name");
        const lyricsElement = document.getElementById("lyrics");

        // Changing the content of the selected elements
        trackNameElement.textContent = songDetailsResult.song.title;
        artistNameElement.textContent = songDetailsResult.song.artist_names;
        lyricsElement.innerHTML = songLyricsResult.lyrics.lyrics.body.html;
        document.body.style.fontFamily = '"Poppins-Regular", sans-serif';

        trackNameElement.style.fontFamily = '"Poppins-SemiBold", sans-serif';
    } catch (error) {
        console.log(error);
    }
}

search(songApiId);
