const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

canvas3.width = canvas3.clientWidth;
canvas3.height = 250;

let circles3 = [];
let anim3;

class Circle3 {
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
        this.color="blue";
        this.dx=(Math.random()-0.5)*4;
        this.dy=(Math.random()-0.5)*4;
    }

    draw(){
        ctx3.beginPath();
        ctx3.fillStyle=this.color;
        ctx3.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx3.fill();

        ctx3.lineWidth=2;
        ctx3.strokeStyle="white";
        ctx3.stroke();
    }

    update(){
        if(this.x+this.r>canvas3.width||this.x-this.r<0) this.dx*=-1;
        if(this.y+this.r>canvas3.height||this.y-this.r<0) this.dy*=-1;

        this.x+=this.dx;
        this.y+=this.dy;

        this.draw();
    }
}

function rebote(c1,c2){
    let dx=c2.x-c1.x;
    let dy=c2.y-c1.y;
    let dist=Math.sqrt(dx*dx+dy*dy);

    if(dist < c1.r+c2.r){

        c1.color="red";
        c2.color="red";

        let nx=dx/dist;
        let ny=dy/dist;

        let dvx=c1.dx-c2.dx;
        let dvy=c1.dy-c2.dy;

        let impacto=dvx*nx+dvy*ny;
        if(impacto>0) return;

        let fuerza=1.3;

        c1.dx-=fuerza*impacto*nx;
        c1.dy-=fuerza*impacto*ny;

        c2.dx+=fuerza*impacto*nx;
        c2.dy+=fuerza*impacto*ny;
    }
}

function iniciarRebote(){
    cancelAnimationFrame(anim3);
    circles3=[];

    for(let i=0;i<NUM_CIRCLES;i++){
        circles3.push(new Circle3(
            Math.random()*canvas3.width,
            Math.random()*canvas3.height,
            Math.random()*20+10
        ));
    }

    animar3();
}

function animar3(){
    anim3=requestAnimationFrame(animar3);
    ctx3.clearRect(0,0,canvas3.width,canvas3.height);

    circles3.forEach(c=>c.color="blue");

    for(let i=0;i<circles3.length;i++){
        for(let j=i+1;j<circles3.length;j++){
            rebote(circles3[i],circles3[j]);
        }
    }

    circles3.forEach(c=>c.update());
}

iniciarRebote();