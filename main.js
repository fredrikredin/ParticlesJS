const particles = [];
const particleCount = Math.floor(window.innerWidth / 40);
const clickParticleLimit = 20;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < particleCount; i++)
        addParticle(random(width), random(height));

    strokeWeight(2);
    fill(255);
}

function draw() {
    background(51, 51, 153);

    particles.forEach(p => {
        p.draw();
        p.attractAndRepel()
        p.drawConnections(particles);
    });
}

function mousePressed(event) {
    var x = event.x;
    var y = event.y;
    var removeCount = 0;

    particles.forEach(p => {
        if (dist(x, y, p.pos.x, p.pos.y) < clickParticleLimit) {
            removeParticle(p);
            removeCount++;
        }
    })

    if (removeCount === 0)
        addParticle(x,y);

    return false; // prevent default
}

function addParticle(x, y) {
    particles.push(new Particle(x, y));
}

function removeParticle(element) {
    const index = particles.indexOf(element);
    particles.splice(index, 1);
}
