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
    }

    draw() {
        ctx1.beginPath();
        ctx1.fillStyle = "blue";
        ctx1.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx1.fill();
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
        circles1.push(new Circle1(
            Math.random() * canvas1.width,
            Math.random() * canvas1.height,
            r, 3
        ));
    }

    animar1();
}

function animar1() {
    anim1 = requestAnimationFrame(animar1);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    circles1.forEach(c => c.update());
}

iniciarMovimiento();