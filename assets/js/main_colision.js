const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = canvas2.clientWidth;
canvas2.height = 250;

let circles2 = [];
let anim2;

class Circle2 {
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
        this.color="rgba(0,200,255,0.6)";
        this.dx=(Math.random()-0.5)*4;
        this.dy=(Math.random()-0.5)*4;
    }

    draw(){
        let g=ctx2.createRadialGradient(
            this.x-this.r*0.3,
            this.y-this.r*0.3,
            this.r*0.1,
            this.x,this.y,this.r
        );

        g.addColorStop(0,"rgba(255,255,255,0.8)");
        g.addColorStop(0.3,this.color);
        g.addColorStop(1,"rgba(255,255,255,0.1)");

        ctx2.beginPath();
        ctx2.fillStyle=g;
        ctx2.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx2.fill();

        ctx2.strokeStyle="rgba(255,255,255,0.4)";
        ctx2.stroke();
    }

    update(){
        if(this.x+this.r>canvas2.width||this.x-this.r<0) this.dx*=-1;
        if(this.y+this.r>canvas2.height||this.y-this.r<0) this.dy*=-1;

        this.x+=this.dx;
        this.y+=this.dy;

        this.draw();
    }
}

function detectar(c1,c2){
    let dx=c1.x-c2.x;
    let dy=c1.y-c2.y;
    return Math.sqrt(dx*dx+dy*dy)<c1.r+c2.r;
}

function iniciarColision(){
    cancelAnimationFrame(anim2);
    circles2=[];

    for(let i=0;i<NUM_CIRCLES;i++){
        let r=Math.random()*20+10;
        let x=Math.random()*(canvas2.width-2*r)+r;
        let y=Math.random()*(canvas2.height-2*r)+r;

        circles2.push(new Circle2(x,y,r));
    }

    animar2();
}

function animar2(){
    anim2=requestAnimationFrame(animar2);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);

    circles2.forEach(c=>c.color="rgba(0,200,255,0.6)");

    for(let i=0;i<circles2.length;i++){
        for(let j=i+1;j<circles2.length;j++){
            if(detectar(circles2[i],circles2[j])){
                circles2[i].color="rgba(255,0,0,0.6)";
                circles2[j].color="rgba(255,0,0,0.6)";
            }
        }
    }

    circles2.forEach(c=>c.update());
}

iniciarColision();