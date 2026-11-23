

const clock = document.getElementById("local-clock");

if (clock) {
    function updateClock() {
        clock.textContent = new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    updateClock();
    setInterval(updateClock, 1000);
}

async function loadAPOD() {
    const container = document.getElementById("apod");
    if (!container) return;

    container.textContent = "Receiving transmission...";

    try {
        const response = await fetch(
            "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        );

        if (!response.ok) {
            throw new Error(`NASA API error: ${response.status}`);
        }

        const data = await response.json();

        const media = data.media_type === "video"
            ? `<iframe
                src="${data.url}"
                width="100%"
                height="350"
                allowfullscreen>
               </iframe>`
            : `<img
                src="${data.url}"
                alt="${data.title}"
                style="width:100%; border:3px ridge #fff;">`;

        const title = document.createElement("h3");
        title.textContent = data.title;

        const date = document.createElement("p");
        date.textContent = data.date;

        const explanation = document.createElement("p");
        explanation.textContent = data.explanation;

        container.replaceChildren(
            title,
            date
        );

        const mediaWrapper = document.createElement("div");
        mediaWrapper.innerHTML = media;
        container.appendChild(mediaWrapper);
        container.appendChild(explanation);

    } catch (error) {
        container.textContent = "NASA transmission failed.";
        console.error("APOD:", error);
    }
}

async function loadISS() {
    const container = document.getElementById("iss-position");
    if (!container) return;

    try {
        const response = await fetch(
            "https://api.wheretheiss.at/v1/satellites/25544"
        );

        if (!response.ok) {
            throw new Error(`ISS API error: ${response.status}`);
        }

        const data = await response.json();

        container.innerHTML = `
            <p><strong>Latitude:</strong> ${data.latitude.toFixed(3)}°</p>
            <p><strong>Longitude:</strong> ${data.longitude.toFixed(3)}°</p>
            <p><strong>Altitude:</strong> ${data.altitude.toFixed(2)} km</p>
            <p><strong>Velocity:</strong> ${data.velocity.toFixed(2)} km/h</p>
            <p><small>Updated: ${new Date().toLocaleTimeString()}</small></p>
        `;

    } catch (error) {
        container.textContent = "ISS tracking data unavailable.";
        console.error("ISS:", error);
    }
}

loadAPOD();
loadISS();

setInterval(loadISS, 10000);
