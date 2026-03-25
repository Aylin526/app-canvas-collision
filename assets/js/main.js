const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

canvas1.width = canvas1.clientWidth;
canvas1.height = 250;

let circles1 = [];
let anim1;

class Circle1 {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = (Math.random() - 0.5) * speed * 2;
        this.dy = (Math.random() - 0.5) * speed * 2;
        this.color = "rgba(0,150,255,0.6)";
    }

    draw() {
        let g = ctx1.createRadialGradient(
            this.x - this.r * 0.3,
            this.y - this.r * 0.3,
            this.r * 0.1,
            this.x,
            this.y,
            this.r
        );

        g.addColorStop(0, "rgba(255,255,255,0.8)");
        g.addColorStop(0.3, this.color);
        g.addColorStop(1, "rgba(255,255,255,0.1)");

        ctx1.beginPath();
        ctx1.fillStyle = g;
        ctx1.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx1.fill();

        ctx1.strokeStyle = "rgba(255,255,255,0.4)";
        ctx1.stroke();
    }

    update() {
        if (this.x + this.r > canvas1.width || this.x - this.r < 0) this.dx *= -1;
        if (this.y + this.r > canvas1.height || this.y - this.r < 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function iniciarMovimiento() {
    cancelAnimationFrame(anim1);
    circles1 = [];

    for (let i = 0; i < NUM_CIRCLES; i++) {
        let r = Math.random() * 20 + 10;

        let x = Math.random() * (canvas1.width - 2*r) + r;
        let y = Math.random() * (canvas1.height - 2*r) + r;

        circles1.push(new Circle1(x, y, r, 3));
    }

    animar1();
}

function animar1() {
    anim1 = requestAnimationFrame(animar1);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    circles1.forEach(c => c.update());
}

iniciarMovimiento();