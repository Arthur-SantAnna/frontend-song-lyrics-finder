"use strict";

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach(function (value, key) {
        jsonData[key] = value;
    });

    console.log(jsonData);

    // Make the POST request
    fetch("https://localhost:7140/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    })
        .then(function (response) {
            if (response.ok) {
                // Request was successful
                console.log("Form submitted successfully");

                // Redirect to another page
                window.location.href =
                    "http://127.0.0.1:5500/pages/search/search.html";
            } else {
                // Request failed
                console.error("Form submission failed");
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});
