let circles2 = [];

function initColision(N) {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    circles2 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - 2*r) + r;
        let y = Math.random() * (canvas.height - 2*r) + r;

        circles2.push(new Circle(x, y, r, "yellow", i, 2));
    }

    function detectar() {
        for (let i = 0; i < circles2.length; i++) {
            for (let j = i + 1; j < circles2.length; j++) {

                let dx = circles2[i].posX - circles2[j].posX;
                let dy = circles2[i].posY - circles2[j].posY;

                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist <= circles2[i].radius + circles2[j].radius) {
                    circles2[i].color = "red";
                    circles2[j].color = "red";
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        circles2.forEach(c => {
            c.color = "yellow";
            c.update(ctx);
        });

        detectar();

        requestAnimationFrame(animate);
    }

    animate();
}

initColision(10);