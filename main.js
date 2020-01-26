const particles = [];
const particleCount = Math.floor(window.innerWidth / 50);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < particleCount; i++)
        particles.push(new Particle());

    strokeWeight(2);
    fill(255);
}

function draw() {
    background(51, 51, 153);

    particles.forEach(p => {
        p.draw();
        p.drawConnections(particles);
    });
}