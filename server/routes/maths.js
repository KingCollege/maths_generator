var express = require('express');
var router = express.Router();
var year4_maths_controller = require('../controllers/year4_maths');
var paths = require('../paths');
// Home page route.
router.get('/year4/' + paths.routes.simple_fraction_arithemtics, year4_maths_controller.simple_fraction_arithemtics);
router.get('/year4/' + paths.routes.missing_angle_shapes, year4_maths_controller.missing_angle_shapes);

router.get('/year4/' + paths.routes.categories, year4_maths_controller.categories);

router.get('/year4', function (req, res) {
    res.send('add /arithmetics to the url for arithmetics');
});
module.exports = router;
