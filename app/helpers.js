const _ = require('lodash');

module.exports = {
    'limit': function(o, limit) {
        if (_.isEmpty(o)) {
            return o;
        }
        if (_.isArray(o)) {
            return o.slice(0, limit);
        }
        if (_.isObject(o)) {
            return _.pick(o, _.keys(o).slice(0, limit));
        }
        return o;
    },
    'size': function(obj) {
        return _.size(obj);
    },
    'formatNumber': function(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1\.")
    },
    'compare': function(lvalue, operator, rvalue, options) {

        var operators, result;

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        if (options === undefined) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function(l, r) {
                return l == r;
            },
            '===': function(l, r) {
                return l === r;
            },
            '!=': function(l, r) {
                return l != r;
            },
            '!==': function(l, r) {
                return l !== r;
            },
            '<': function(l, r) {
                return l < r;
            },
            '>': function(l, r) {
                return l > r;
            },
            '<=': function(l, r) {
                return l <= r;
            },
            '>=': function(l, r) {
                return l >= r;
            },
            'typeof': function(l, r) {
                return typeof l == r;
            }
        };

        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
};
