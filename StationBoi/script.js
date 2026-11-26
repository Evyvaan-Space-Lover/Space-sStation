

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


// VISITOR COUNTER

const visitorCount = document.getElementById("visitor-count");

if (visitorCount) {
    const waitForGoatCounter = setInterval(() => {
        if (!window.goatcounter?.visit_count) return;

        clearInterval(waitForGoatCounter);

        visitorCount.textContent = "";

        window.goatcounter.visit_count({
            append: "#visitor-count",
            type: "png",
            path: "TOTAL"
        });
    }, 100);
}

// rqndom decor

async function loadRandomDecorations() {
    try {
        const response = await fetch("/decoration-assets.json");

        if (!response.ok) {
            throw new Error("Could not load decoration assets");
        }

        const assets = await response.json();

        if (!assets.length) return;

        const container = document.createElement("div");
        container.id = "random-decorations";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);

        const isMobile = window.innerWidth <= 600;
        const decorationCount = isMobile ? 6 : 12;

        const shuffled = [...assets].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(
            0,
            Math.min(decorationCount, shuffled.length)
        );

        selected.forEach((src, index) => {
            const img = document.createElement("img");

            img.src = src;
            img.alt = "";
            img.className = "random-decoration";
            img.loading = "lazy";
            img.decoding = "async";

           const columns = isMobile ? 2 : 5;
const rows = Math.ceil(selected.length / columns);

const col = index % columns;
const row = Math.floor(index / columns);

const cellWidth = 100 / columns;
const cellHeight = 100 / rows;

img.style.left = `${col * cellWidth + Math.random() * (cellWidth - 10)}%`;
img.style.top = `${row * cellHeight + Math.random() * (cellHeight - 10)}%`;
img.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
            container.appendChild(img);
        });

    } catch (error) {
        console.error("Random decorations:", error);
    }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    loadRandomDecorations();
}
