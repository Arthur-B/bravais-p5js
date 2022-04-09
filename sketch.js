function setup() {

    // =========================================================================
    // SETUP
    // =========================================================================

    // Set up the units
    colorMode(HSB, 360, 100, 100, 1);
    angleMode("radians");

    // Canvas variables
    const overall_width = 512; // Size of canvas
    const overall_height = 512;
    createCanvas(overall_width, overall_height);


    // =========================================================================
    // Static drawing part
    // =========================================================================

    // Get a random crystal
    [xy_array, radius, rot_angle, nb_points_polygon, c] = get_random_crystal(overall_width, overall_height);

    c = [[12, 58, 72], [155, 38, 98]];

    // Background layer
    pattern_renderer = createGraphics(overall_width, overall_height);
    pattern_renderer.colorMode(HSB, 360, 100, 100, 1);
    pattern_renderer.background(...c[0]);
    draw_pattern_test(xy_array, radius, rot_angle, nb_points_polygon, c[1], pattern_renderer);

    pattern_image = createImage(overall_width, overall_height);
    pattern_image.copy(pattern_renderer, 0, 0, overall_width, overall_height, 0, 0, overall_width, overall_height);

    // Mask
    mask_image = get_mask(overall_width - 10, overall_height - 10, overall_width, overall_height);
    pattern_image.mask(mask_image);

    // Display
    image(pattern_image, 0, 0);

    // Save
    // saveCanvas('myCanvas', 'jpg');


    // =========================================================================
    // No loop
    // =========================================================================

    noLoop();
}

// function draw() {
// }

function draw_pattern(xy_array, radius, rot_angle, nb_points_polygon, c1) {
    strokeWeight(0);
    fill(...c1);
    for (let row of xy_array) {
        for (let xy of row) {
            polygon(xy[0], xy[1], radius, rot_angle, nb_points_polygon);
        }
    }
}

function draw_pattern_test(xy_array, radius, rot_angle, nb_points_polygon, c1, img) {
    img.strokeWeight(0);
    img.fill(...c1);
    for (let row of xy_array) {
        for (let xy of row) {
            polygon_test(xy[0], xy[1], radius, rot_angle, nb_points_polygon, img);
        }
    }
}

function get_mask(mask_width, mask_height, overall_width, overall_height) {

    mask_renderer = createGraphics(overall_width, overall_height);
    mask_renderer.background(0, 0, 0, 0); // Opaque background
    // mask_renderer.fill(0, 0, 0, 255);
    mask_renderer.fill(0, 0, 0, 255);
    mask_renderer.rect(overall_width / 2 - mask_width / 2, overall_height / 2 - mask_height / 2, mask_width, mask_height); // Transparent shape

    mask_image = createImage(overall_width, overall_height);
    mask_image.copy(mask_renderer, 0, 0, overall_width, overall_height, 0, 0, overall_width, overall_height);

    return mask_image
}

function get_random_crystal(overall_width, overall_height) {
    // Get the colors
    // [c0, c1, c2] = get_random_triad();
    c = get_random_complementary();

    // Get the lattice informations
    const crystal_family = get_random_crystal_family();
    [a, b, theta] = get_lattice_parameters(crystal_family, overall_width, overall_height);

    const radius = Math.min(a, b) * (0.1 + 0.4 * Math.random()); // Size of individual points
    const x0 = overall_width / 2 + a * (Math.random() - 0.5); // Origin (x) with some jitter
    const y0 = overall_height / 2 + b * Math.sin(theta) * (Math.random() - 0.5); // Origin (y) with some jitter
    const phi = 2 * Math.PI * Math.random(); // Orientation of the vector basis

    const nb_points_polygon = Math.floor(3 + 7 * Math.random()); // # of points in polygon (ex: 3 for triangle)
    const rot_angle = 2 * Math.PI * Math.random(); // Rotation angle of the polygon

    // Get basis vectors
    [v0, v1] = get_basis_vectors(a, b, theta);
    v0 = rotate_vector(v0, phi); // Rotation accordint to random angle phi
    v1 = rotate_vector(v1, phi);

    // Get the coordinates of points
    xy_array = get_lattice_points(v0, v1, x0, y0, overall_width, overall_height);

    return [xy_array, radius, rot_angle, nb_points_polygon, c]
}