var paths = require('../paths');

const random_fraction = () => {
    const number_limit = {
        lower: 2,
        upper: 10,
    };
    const denominator = number_limit.lower + Math.round(Math.random() * number_limit.upper);
    const numerator = number_limit.lower + Math.round(Math.random() * number_limit.upper);
    return { numerator, denominator, value: numerator / denominator };
};

const operator_calculator = (operator, nums) => {
    switch (operator) {
        case '-':
            return nums.reduce((x, y) => x - y);
        case '+':
            return nums.reduce((x, y) => x + y);
        case '/':
            return nums.reduce((x, y) => x / y);
        case '*':
            return nums.reduce((x, y) => x * y);
        default:
            return undefined;
    }
};

exports.simple_fraction_arithmetics = function (number_of_questions = 10, number_of_operands = 2) {
    var questions = [];

    for (var i = 0; i < number_of_questions; ++i) {
        var operands = [];
        for (var j = 0; j < number_of_operands; ++j) {
            operands.push(random_fraction());
        }
        var simplify = Math.random() >= 0.5 ? true : false;
        var operator = Math.random() >= 0.5 ? '-' : '+';
        questions.push({
            operands,
            simplify,
            operator,
            answer: operator_calculator(
                operator,
                operands.map((o) => o.value)
            ),
        });
    }

    return { questions, code: paths.routes.simple_fraction_arithemtics };
};

const format_operands = (operands, operator) => {
    var formatted = '';
    for (let operand of operands) {
        formatted += ' ' + operand.numerator + '/' + operand.denominator + ' ' + operator;
    }
    return formatted.slice(0, -1) + '=';
};

exports.formalise_questions = function (questions) {
    var formatted = {};
    for (var i = 0; i < questions.length; i++) {
        var q = i + 1 + ') What is' + format_operands(questions[i].operands, questions[i].operator) + ' ? ';
        if (Math.random() >= 0.5) {
            q += 'Simplify your answer, if possible.';
        }
        formatted[i] = q;
    }
    return formatted;
};
