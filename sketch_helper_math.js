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


function get_basis_vectors(a, b, theta) {
    var v0 = [a, 0];
    var v1 = [b * Math.cos(theta), b * Math.sin(theta)];
    return [v0, v1]
}


function rotate_vector(xy, theta) {
    return [xy[0] * Math.cos(theta) - xy[1] * Math.sin(theta),
    xy[0] * Math.sin(theta) + xy[1] * Math.cos(theta)]
}

function get_lattice_points(v0, v1, x0, y0, width, height) {
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