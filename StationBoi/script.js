

const clock = document.getElementById("local-clock");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);

const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createStars();
}

function createStars() {
    stars = [];

    const count = Math.floor(width * height / 1800);

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.35 + 0.08,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function animateStars(time) {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
        const flicker = 0.55 +
            Math.sin(time * 0.002 + star.phase) * 0.35;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(210, 230, 255, ${flicker})`;
        ctx.fill();

        star.y += star.speed;

        if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
        }
    }

    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(animateStars);
