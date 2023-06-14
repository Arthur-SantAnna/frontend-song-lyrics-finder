"use strict";

const urlParams = new URLSearchParams(window.location.search);
const nickname = urlParams.get("nickname");

let favoritesElement = document.getElementById("favorites");
favoritesElement.href = `../favorites/favorites.html?nickname=${nickname}`;

async function fetchSongLyrics(value) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${value}&per_page=10&page=1`;
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
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function search(value) {
    try {
        let result = await fetchSongLyrics(value);

        let tracksContainer = document.getElementById("track-list");
        tracksContainer.innerHTML = ``; // Clear existing tracks

        for (let i = 0; i < result.hits.length; i++) {
            let track = result.hits[i].result;
            let trackElement = document.createElement("div");
            trackElement.classList.add("track");

            let imageElement = document.createElement("img");
            imageElement.src = track.header_image_thumbnail_url;
            imageElement.alt = "";

            let trackNameElement = document.createElement("p");
            trackNameElement.classList.add("track-name");
            trackNameElement.textContent = track.title;

            let artistNameElement = document.createElement("p");
            artistNameElement.classList.add("artist-name");
            artistNameElement.textContent = track.primary_artist.name;

            let lyricsLinkElement = document.createElement("a");
            lyricsLinkElement.href = `../song-lyric/song-lyric.html?songApiId=${track.id}&nickname=${nickname}`;
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

const input = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button[id="search-button"]');
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    search(input.value);
});
