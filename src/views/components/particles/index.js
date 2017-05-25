import React from 'react';
import * as d3 from 'd3';

class Particles extends React.Component {
  componentDidMount() {
    /* D3 code to append elements to this.svg */
    var context = this.canvas.getContext('2d'),
        width = this.canvas.width,
        height = this.canvas.height,
        radius = 2.5,
        minDistance = 40,
        maxDistance = 60,
        minDistance2 = minDistance * minDistance,
        maxDistance2 = maxDistance * maxDistance;

    var tau = 2 * Math.PI,
        n = 200,
        particles = new Array(n);

    for (var i = 0; i < n; ++i) {
      particles[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0
      };
    }

    d3.timer(function() {
      context.save();
      context.clearRect(0, 0, width, height);
      for (var i = 0; i < n; ++i) {
        var p = particles[i];
        p.x += p.vx;
        if (p.x < -maxDistance) {
          p.x += width + maxDistance * 2;
        }
        else if (p.x > width + maxDistance) {
          p.x -= width + maxDistance * 2;
        }
        p.y += p.vy;
        if (p.y < -maxDistance) {
          p.y += height + maxDistance * 2;
        }
        else if (p.y > height + maxDistance) {
          p.y -= height + maxDistance * 2;
        }
        p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx;
        p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy;
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, tau);
        context.fill();
      }
      for (var z = 0; z < n; ++z) {
        for (var j = z + 1; j < n; ++j) {
          var pi = particles[z],
              pj = particles[j],
              dx = pi.x - pj.x,
              dy = pi.y - pj.y,
              d2 = dx * dx + dy * dy;
          if (d2 < maxDistance2) {
            context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
            context.beginPath();
            context.moveTo(pi.x, pi.y);
            context.lineTo(pj.x, pj.y);
            context.stroke();
          }
        }
      }
      context.restore();
    });
  }

  shouldComponentUpdate() {
    return false; // This prevents future re-renders of this component
  }

  render() {
    return (
      <canvas className="particles-canvas" width="960" height="960" ref={(elem) => { this.canvas = elem; }} />
    );
  }
}

export default Particles;
