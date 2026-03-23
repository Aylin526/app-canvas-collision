let circles3 = [];

function initRebote(N) {
    const canvas = document.getElementById("canvas3");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 200;

    circles3 = [];

    for (let i = 0; i < N; i++) {
        let r = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - 2*r) + r;
        let y = Math.random() * (canvas.height - 2*r) + r;

        circles3.push(new Circle(x, y, r, "lime", i, 2));
    }

    function detectar() {
        for (let i = 0; i < circles3.length; i++) {
            for (let j = i + 1; j < circles3.length; j++) {

                let dx = circles3[j].posX - circles3[i].posX;
                let dy = circles3[j].posY - circles3[i].posY;

                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist <= circles3[i].radius + circles3[j].radius) {

                    // Rebote
                    let tempDx = circles3[i].dx;
                    let tempDy = circles3[i].dy;

                    circles3[i].dx = circles3[j].dx;
                    circles3[i].dy = circles3[j].dy;

                    circles3[j].dx = tempDx;
                    circles3[j].dy = tempDy;

                    // Color
                    circles3[i].color = "orange";
                    circles3[j].color = "orange";
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        circles3.forEach(c => {
            c.color = "lime";
            c.update(ctx);
        });

        detectar();

        requestAnimationFrame(animate);
    }

    animate();
}

initRebote(10);