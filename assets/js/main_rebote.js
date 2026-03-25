const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

canvas3.width = canvas3.offsetWidth;
canvas3.height = 250;

let circlesRebote = [];

function randomColor() {
    return `hsla(${Math.random() * 360}, 70%, 60%, 0.5)`; // más transparente
}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
        this.color = randomColor();
    }

    draw() {
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // ✨ GLASSMORPHISM MEJORADO
        let gradient = ctx3.createRadialGradient(
            this.x - this.radius * 0.3,
            this.y - this.radius * 0.3,
            this.radius * 0.1,
            this.x,
            this.y,
            this.radius
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(0.3, "rgba(255,255,255,0.4)");
        gradient.addColorStop(1, this.color);

        ctx3.fillStyle = gradient;
        ctx3.fill();

        // borde tipo vidrio
        ctx3.strokeStyle = "rgba(255,255,255,0.8)";
        ctx3.lineWidth = 2;
        ctx3.stroke();

        // ✨ brillo extra (reflejo)
        ctx3.beginPath();
        ctx3.arc(
            this.x - this.radius * 0.3,
            this.y - this.radius * 0.3,
            this.radius * 0.3,
            0,
            Math.PI * 2
        );
        ctx3.fillStyle = "rgba(255,255,255,0.15)";
        ctx3.fill();

        ctx3.closePath();
    }

    update() {

        this.x += this.dx;
        this.y += this.dy;

        // 🧱 paredes
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx *= -1;
        }

        if (this.x + this.radius > canvas3.width) {
            this.x = canvas3.width - this.radius;
            this.dx *= -1;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -1;
        }

        if (this.y + this.radius > canvas3.height) {
            this.y = canvas3.height - this.radius;
            this.dy *= -1;
        }

        this.draw();
    }
}

function iniciarRebote() {
    circlesRebote = [];

    for (let i = 0; i < NUM_CIRCLES; i++) {
        let radius = Math.random() * 20 + 15;

        let x = Math.random() * (canvas3.width - radius * 2) + radius;
        let y = Math.random() * (canvas3.height - radius * 2) + radius;

        circlesRebote.push(new Circle(x, y, radius));
    }
}

function detectarColisiones() {
    for (let i = 0; i < circlesRebote.length; i++) {
        for (let j = i + 1; j < circlesRebote.length; j++) {

            let c1 = circlesRebote[i];
            let c2 = circlesRebote[j];

            let dx = c2.x - c1.x;
            let dy = c2.y - c1.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let minDist = c1.radius + c2.radius;

            if (distance < minDist) {

                // 🔥 separación
                let overlap = minDist - distance;
                let angle = Math.atan2(dy, dx);

                let moveX = Math.cos(angle) * (overlap / 2);
                let moveY = Math.sin(angle) * (overlap / 2);

                c1.x -= moveX;
                c1.y -= moveY;
                c2.x += moveX;
                c2.y += moveY;

                // 🔁 rebote
                let tempDx = c1.dx;
                let tempDy = c1.dy;

                c1.dx = c2.dx;
                c1.dy = c2.dy;

                c2.dx = tempDx;
                c2.dy = tempDy;

                // 🎨 color
                c1.color = randomColor();
                c2.color = randomColor();
            }
        }
    }
}

function animateRebote() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    detectarColisiones();

    circlesRebote.forEach(circle => {
        circle.update();
    });

    requestAnimationFrame(animateRebote);
}

// iniciar
window.iniciarRebote = iniciarRebote;
iniciarRebote();
animateRebote();