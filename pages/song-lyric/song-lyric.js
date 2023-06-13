"use strict";

const button = document.getElementById("favorite-button");
button.addEventListener("click", function () {
    button.classList.toggle("clicked");
});

const urlParams = new URLSearchParams(window.location.search);
const songApiId = urlParams.get("songApiId");

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
        // console.log(result);
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
