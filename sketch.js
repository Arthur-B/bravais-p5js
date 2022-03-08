function setup() {
    createCanvas(512, 512);
    background(22, 80, 161);
}

function draw() {
    // Define variables
    const width = 512;
    const height = 512;
    const a = 64;
    const b = 128;
    const radius = 24;
    const x0 = 0;
    const y0 = 0;
    const theta = Math.PI / 4;

    // Get the coordinates of points
    xy_array = get_xy_op(a, b, x0, y0, width, height);

    // Rotation
    xy_array_rotated = get_rotated_xy_array(xy_array, theta)
    // Get the lines
    line_array = get_lines_coordinates(xy_array_rotated)

    // draw stuff

    // Draw lines
    stroke(237, 101, 9);
    strokeWeight(3);
    for (let single_line of line_array) {
        line(single_line[0], single_line[1], single_line[2], single_line[3])
    }

    // Draw points
    fill(21, 237, 129)
    strokeWeight(0);
    for (let row of xy_array_rotated) {
        for (let xy of row) {
            circle(xy[0], xy[1], radius);
        }
    }
}

function get_xy_op(a, b, x0, y0, width, height) {
    var xy_array = [];
    i = 0;
    for (let x = x0 - 5 * a; x <= width * 2; x += a) {
        xy_array[i] = [];
        for (let y = y0 - 5 * b; y <= height * 2; y += b) {
            xy_array[i].push([x, y]);
        }
        i++
    }
    return xy_array
}

function get_rotated_xy_array(xy_array, theta) {
    xy_array_rotated = xy_array.map(function (row) {
        return row.map(function (cell) {
            return rotate_xy(cell, theta);
        });
    });
    return xy_array_rotated
}

function rotate_xy(xy, theta) {
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