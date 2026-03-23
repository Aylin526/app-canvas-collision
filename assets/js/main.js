let circles1 = [];

function initMovimiento(N) {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    circles1 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - 2*r) + r;
        let y = Math.random() * (canvas.height - 2*r) + r;

        circles1.push(new Circle(x, y, r, "cyan", i, 2));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles1.forEach(c => c.update(ctx));
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicial
initMovimiento(10);