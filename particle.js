let distlimit = 180;
let alpha = 0;

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
    }

    draw() {
        this.updatePosition();
        noStroke();
        circle(this.pos.x, this.pos.y, 15);
    }

    drawConnections(particles) {
        particles.forEach(p => {
            const distance = this.pos.dist(p.pos);

            if (distance < distlimit) {
                alpha = map(distance, 0, distlimit, 255, 0);
                stroke(255, 255, 255, alpha);
                line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
            }
        });
    }

    updatePosition() {
        this.updateVelocityOnEdgeCollision();
        this.pos = this.pos.add(this.vel);
    }

    updateVelocityOnEdgeCollision() {
        if (this.pos.x >= width || this.pos.x <= 0)
            this.vel.x *= -1;

        if (this.pos.y >= height || this.pos.y <= 0)
            this.vel.y *= -1;
    }
}