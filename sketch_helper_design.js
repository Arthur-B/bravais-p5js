// COLOR

function get_random_complementary() {
    const h0 = 360 * (1 + Math.random()); // primary hue
    h1 = h0 + 180;

    c0 = [h0 % 360, 100 * Math.random(), 100 * Math.random()];
    c1 = [h1 % 360, 100 * Math.random(), 100 * Math.random()];
    return [c0, c1]
}

function get_random_triad() {
    const h0 = 360 * (1 + Math.random()); // primary hue
    h1 = h0 + 120;
    h2 = h0 - 120;

    c0 = [h0 % 360, 100 * Math.random(), 100 * Math.random()];
    c1 = [h1 % 360, 100 * Math.random(), 100 * Math.random()];
    c2 = [h2 % 360, 100 * Math.random(), 100 * Math.random()];
    // Random base color
    return [c0, c1, c2]
}

// Points

function polygon(x, y, radius, rot_angle, npoints) {
    // Adapted from: https://p5js.org/examples/form-regular-polygon.html
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = rot_angle; a < rot_angle + TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function polygon_test(x, y, radius, rot_angle, npoints, img) {
    // Adapted from: https://p5js.org/examples/form-regular-polygon.html
    let angle = TWO_PI / npoints;
    img.beginShape();
    for (let a = rot_angle; a < rot_angle + TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    img.endShape(CLOSE);
}