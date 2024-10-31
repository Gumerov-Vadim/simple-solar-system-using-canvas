const canvas = document.getElementById("solarSystem");
const ctx = canvas.getContext("2d");
class Planet{
    constructor(distance,radius,color,speed,angle,name){
        this.distance = distance;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.name = name;
    }
}
const sun = { x: 400, y: 300, radius: 30, color: "yellow", name:"sun", depth: 1 };

const planets = [
    new Planet(50,5,"gray",0.02,0,"mercury"),
    new Planet(80,8,"orange",0.015,0,"venera"),
    new Planet(120,9,"#1E90FF",0.01,0,"earth"),
    new Planet(160,7,"red",0.008,0,"mars"),
    new Planet(220,16,"#F08080",0.0075,0,"jupiter"),
    new Planet(280,11,"#FFFFE0",0.007,0,"uran"),
    new Planet(320,12,"#FFA07A",0.0065,0,"neptun"),
    new Planet(360,4,"cyan",0.006,0,"pluton"),
];
planets.push(sun);

function drawSun() {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fillStyle = sun.color;
    ctx.fill();
    ctx.closePath();
}

let cameraAngle = 0.2;
let cameraRotateMode = 0;

function cameraRotate(mode){
    switch(mode){
        case 0:
            return 0;
        case 1:
            cameraAngle += 1/10000;
            return;
    }
    
}

function drawPlanet(planet) {
    if(planet.name === "sun"){
        drawSun();
        return;
    }

    planet.depth = planet.distance * Math.sin(planet.angle);
    const x = sun.x + planet.distance * Math.cos(planet.angle);
    
    cameraRotate(0);
    const y = sun.y + planet.depth*Math.sin(cameraAngle);
    ctx.beginPath();
    ctx.arc(x, y, planet.radius *(2 + Math.sin(planet.angle))/2, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00000A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    planets.sort((p1,p2)=>{return p1.depth-p2.depth}).forEach(planet => {
        planet.angle += planet.speed;
        drawPlanet(planet);
    });
    requestAnimationFrame(animate);
}

animate();