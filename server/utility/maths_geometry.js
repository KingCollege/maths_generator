var paths = require('../paths');

const to_radians = (degree) => {
    return (degree * Math.PI) / 180;
};

const euclidean_distance = (a) => {
    return Math.sqrt(a.map((e) => Math.pow(e, 2)).reduce((a, b) => a + b));
};

const modulo = (x, y) => {
    return ((x % y) + y) % y;
};

const polygon_coordinates = function (sides, size = 1) {
    const regular_polygon_sum = (sides - 2) * 180;
    const regular_polygon_inner = to_radians(regular_polygon_sum / sides);
    var coordinates = {
        p0: {
            x: 0,
            y: 0,
        },
        p1: {
            x: size * Math.cos(regular_polygon_inner),
            y: size * Math.sin(regular_polygon_inner),
        },
    };
    sides -= 2;
    const rotation = regular_polygon_inner / sides;
    for (var i = 0; i < sides - 1; ++i) {
        const d = Math.sin(regular_polygon_inner - rotation * i) / Math.sin(rotation);
        coordinates['p' + (i + 2).toString()] = {
            x: d * Math.cos(regular_polygon_inner - rotation * (i + 1)),
            y: d * Math.sin(regular_polygon_inner - rotation * (i + 1)),
        };
    }
    coordinates['p' + (sides + 1).toString()] = {
        x: 1,
        y: 0,
    };
    return coordinates;
};

const distort_polygon = (polygon_coord, distortion_regularisation = 2) => {
    for (let key of Object.keys(polygon_coord)) {
        polygon_coord[key].x = (polygon_coord[key].x + Math.random() / distortion_regularisation) * 10;
        polygon_coord[key].y = (polygon_coord[key].y + Math.random() / distortion_regularisation) * 10;
    }
    return polygon_coord;
};

// Formula: https://stackoverflow.com/questions/1211212/how-to-calculate-an-angle-from-three-points
// acos(  (p12^2 + p13^2 - p23^2)/(2 * p12 * p13)  )
// Where: Pij = euclidean distance
const angle_of_polygon = (polygon_coord) => {
    var angles = {};
    const points = Object.keys(polygon_coord);
    for (var i = 0; i < points.length; ++i) {
        const AB = euclidean_distance([
            polygon_coord[points[modulo(i + 1, points.length)]].y - polygon_coord[points[i]].y,
            polygon_coord[points[modulo(i + 1, points.length)]].x - polygon_coord[points[i]].x,
        ]);
        const AC = euclidean_distance([
            polygon_coord[points[i]].y - polygon_coord[points[modulo(i - 1, points.length)]].y,
            polygon_coord[points[i]].x - polygon_coord[points[modulo(i - 1, points.length)]].x,
        ]);
        const BC = euclidean_distance([
            polygon_coord[points[modulo(i + 1, points.length)]].y -
                polygon_coord[points[modulo(i - 1, points.length)]].y,
            polygon_coord[points[modulo(i + 1, points.length)]].x -
                polygon_coord[points[modulo(i - 1, points.length)]].x,
        ]);

        const angBAC = Math.acos((Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)) / (2 * AB * AC));
        angles[points[modulo(i + 1, points.length)] + points[i] + points[modulo(i - 1, points.length)]] =
            (angBAC * 180) / Math.PI;
    }

    return angles;
};

exports.missing_angle_shapes = function (number_of_questions = 10, shape_sides = 4) {
    var questions = [];
    for (var i = 0; i < number_of_questions; ++i) {
        var polygon = distort_polygon(polygon_coordinates(shape_sides));
        var angles_polygon = angle_of_polygon(polygon);
        questions.push({
            coordinates: polygon,
            angles: angles_polygon,
            missing_angle_index: Math.floor(Math.random() * Object.keys(angles_polygon).length),
        });
    }
    return { questions, code: paths.routes.missing_angle_shapes };
};
