"use strict";

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
        const result = await response.text();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function search(value) {
    console.log(value);
    try {
        let result = await fetchSongLyrics(value);
        let songs = [];
        for (let i = 0; i < 2; i++) {
            songs.push(result.response.hits[i].result.title);
            console.log(songs);
        }
    } catch (error) {
        console.error(error);
    }
}

const input = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button[id="search-button"]');
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    search(input.value);
});
