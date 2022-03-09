function setup() {

    // Define variables
    const width = 512; // Size of canvas
    const height = 512;

    const crystal_family = get_random_crystal_family();
    [a, b, theta] = get_lattice_parameters(crystal_family, width, height);

    const radius = Math.min(a, b) * (0.1 + 0.4 * Math.random());
    const x0 = width / 2 + a * (Math.random() - 0.5);
    const y0 = height / 2 + b * Math.sin(theta) * (Math.random() - 0.5);
    const phi = 2 * Math.PI * Math.random(); // Orientation of the vector basis

    // Get the colors
    [c0, c1, c2] = get_random_triad();

    // Build canvas    
    createCanvas(width, height);
    colorMode("hsb")
    background(...c0);

    // Get basis vectors
    [v0, v1] = get_basis_vectors(a, b, theta);
    v0 = rotate_vector(v0, phi); // Rotation accordint to random angle phi
    v1 = rotate_vector(v1, phi);

    // line(x0, y0, x0 + v0[0], y0 + v0[1]) // Sanity check drawing the basis
    // line(x0, y0, x0 + v1[0], y0 + v1[1])

    // Get the coordinates of points
    xy_array = get_xy(v0, v1, x0, y0, width, height);

    // Get the lines
    // line_array = get_lines_coordinates(xy_array_rotated)

    // draw stuff

    // Draw lines
    // stroke(237, 101, 9);
    // strokeWeight(3);
    // for (let single_line of line_array) {
    //     line(single_line[0], single_line[1], single_line[2], single_line[3])
    // }

    // Draw points
    fill(...c1)
    strokeWeight(0);
    for (let row of xy_array) {
        for (let xy of row) {
            circle(xy[0], xy[1], radius);
        }
    }
}

// function draw() {

// }

function get_random_crystal_family() {
    const seed = Math.random();
    if (seed < 0.25) {
        crystal_family = "monoclinic";
    } else if (0.25 <= seed && seed < 0.5) {
        crystal_family = "orthorhombic";
    } else if (0.5 <= seed && seed < 0.75) {
        crystal_family = "tetragonal";
    } else {
        crystal_family = "hexagonal";
    }
    return crystal_family
}

function get_lattice_parameters(crystal_family, width, height) {
    a = width / 2 * (0.25 + 0.5 * Math.random());
    if (crystal_family == "monoclinic") {
        b = height / 2 * (0.25 + 0.5 * Math.random());
        theta = Math.PI / 16 + Math.PI * 14 / 16 * Math.random();
    } else if (crystal_family == "orthorhombic") {
        b = height / 2 * (0.25 + 0.5 * Math.random());
        theta = Math.PI / 2;
    } else if (crystal_family == "tetragonal") {
        b = a;
        theta = Math.PI / 2;
    } else { // hexagonal
        b = a;
        theta = Math.PI * 2 / 3; // 120 deg
    }
    return [a, b, theta]
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
function get_basis_vectors(a, b, theta) {
    var v0 = [a, 0];
    var v1 = [b * Math.cos(theta), b * Math.sin(theta)];
    return [v0, v1]
}

function get_xy(v0, v1, x0, y0, width, height) {
    var xy_array = [];
    const n_max = Math.abs(Math.round(10 * width / v0[0]));
    const n_min = - n_max;
    const m_max = Math.abs(Math.round(10 * height / v1[1]));
    const m_min = - m_max;

    i = 0;
    for (let n = n_min; n <= n_max; n++) {
        xy_array[i] = [];
        for (let m = m_min; m <= m_max; m++) {
            var x = x0 + n * v0[0] + m * v1[0];
            var y = y0 + n * v0[1] + m * v1[1];
            xy_array[i].push([x, y]);
        }
        i++;
    }
    return xy_array
}

function rotate_vector(xy, theta) {
    return [xy[0] * Math.cos(theta) - xy[1] * Math.sin(theta),
    xy[0] * Math.sin(theta) + xy[1] * Math.cos(theta)]
}

function get_lines_coordinates(xy_array) {
    lines_coord_array = [];
    // Row
    for (let row of xy_array) {
        // x0, y0, x1, y1
        lines_coord_array.push([row[0][0], row[0][1], row[row.length - 1][0], row[row.length - 1][1]]);
    }
    // Columns
    for (i = 0; i < xy_array[0].length; i++) {
        column = xy_array.map(x => x[i]);
        lines_coord_array.push([column[0][0], column[0][1], column[column.length - 1][0], column[column.length - 1][1]]);
    }

    return lines_coord_array
}


// function get_rotated_xy_array(xy_array, theta) {
//     xy_array_rotated = xy_array.map(function (row) {
//         return row.map(function (cell) {
//             return rotate_vector(cell, theta);
//         });
//     });
//     return xy_array_rotated
// }