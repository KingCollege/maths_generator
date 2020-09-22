var maths_arithmetics = require('../utility/maths_arithmetics');
var maths_geometry = require('../utility/maths_geometry');
var paths = require('../paths');

// no_ques = Number of Questions
// no_oper = Number of Operands
// no_sides = Number of Sides (for a polygon)
exports.simple_fraction_arithemtics = function (req, res) {
    if (req.query.formalise === 'true') {
        res.json(
            maths_arithmetics.formalise_questions(
                maths_arithmetics.simple_fraction_arithmetics(req.query.no_ques, req.query.no_oper).questions
            )
        );
    } else {
        res.json(maths_arithmetics.simple_fraction_arithmetics(req.query.no_ques, req.query.no_oper));
    }
};

exports.missing_angle_shapes = function (req, res) {
    res.json(maths_geometry.missing_angle_shapes(req.query.no_ques, req.query.no_sides));
};

exports.categories = function (req, res) {
    res.json({
        simple_fraction_arithemtics: {
            title: 'Simple Fraction Arithmetics',
            description:
                'Arithmetic questions using randomly generated fractions. Fractions are bounded to keep the questions simple.',
            api: paths.api + paths.routes.simple_fraction_arithemtics + '?pretty',
            code: paths.routes.simple_fraction_arithemtics,
        },
        missing_angle_shapes: {
            title: 'Missing Angle (Random Shape)',
            description:
                'Find the missing angle in randomly generated shapes. (For now, there is no way to choose how many sides the shape may have.',
            api: paths.api + paths.routes.missing_angle_shapes + '?pretty',
            code: paths.routes.missing_angle_shapes,
        },
    });
};
