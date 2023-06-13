"use strict";

const urlParams = new URLSearchParams(window.location.search);
const nickname = urlParams.get("nickname");

async function fetchFavoriteSongsId(nickname) {
    var backendURL = "https://localhost:7140/api/song?nickname=" + nickname;

    try {
        const response = await fetch(backendURL);
        const data = await response.json();
        console.log("backendData", data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function fetchFavoriteSongDetails(songApiId) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${songApiId}`;
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
        console.log("geniusData", result);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function displayFavoriteSongs() {
    try {
        let favoriteSongsIdArray = await fetchFavoriteSongsId(nickname);
        console.log(favoriteSongsIdArray);

        let tracksContainer = document.getElementById("track-list");
        tracksContainer.innerHTML = ``; // Clear existing tracks

        for (let i = 0; i < favoriteSongsIdArray.length; i++) {
            let track = await fetchFavoriteSongDetails(favoriteSongsIdArray[i]);

            let trackElement = document.createElement("div");
            trackElement.classList.add("track");

            let imageElement = document.createElement("img");
            imageElement.src = track.song.header_image_thumbnail_url;
            imageElement.alt = "";

            let trackNameElement = document.createElement("p");
            trackNameElement.classList.add("track-name");
            trackNameElement.textContent = track.song.title;

            let artistNameElement = document.createElement("p");
            artistNameElement.classList.add("artist-name");
            console.log("track", track);
            artistNameElement.textContent = track.song.primary_artist.name;

            let lyricsLinkElement = document.createElement("a");
            lyricsLinkElement.href = `../song-lyric/song-lyric.html?songApiId=${favoriteSongsIdArray[i]}`;
            lyricsLinkElement.textContent = "Get Lyrics";

            trackElement.appendChild(imageElement);
            trackElement.appendChild(trackNameElement);
            trackElement.appendChild(artistNameElement);
            trackElement.appendChild(lyricsLinkElement);

            tracksContainer.appendChild(trackElement);
        }
    } catch (error) {
        console.log(error);
    }
}

displayFavoriteSongs();
