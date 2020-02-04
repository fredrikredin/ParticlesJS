const drawConnectionLimit = 180;

class Particle {
    constructor(x,y)
    {
        this.pos = createVector(x,y);
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

            if (distance < drawConnectionLimit) {
                var strokeAlpha = map(distance, 0, drawConnectionLimit, 255, 0);
                stroke(255, 255, 255, strokeAlpha);
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

    attractAndRepel() {
      particles.forEach(p => {
        if (p != this) {
          const d = dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y);
          const velMag = 5 / (d * d);
          let vel = createVector(this.pos.x-p.pos.x,this.pos.y-p.pos.y);
          if (d > 30) {
            vel.setMag(-velMag);
            // Attraction
          } else {
            vel.setMag(velMag * 10);
            // Repulsion if too close to each other
          }
          this.vel.add(vel);
          this.vel.limit(2.5);
        }
      });
    }
}
