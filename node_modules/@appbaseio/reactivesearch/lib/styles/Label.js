'use strict';

exports.__esModule = true;
exports.rangeLabelsContainer = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = /*#__PURE__*/(0, _emotion.css)('left:0;margin-left:3px;');

var right = /*#__PURE__*/(0, _emotion.css)('right:0;margin-right:3px;');

var Label = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1atnqi30'
})('position:absolute;top:-25px;', function (props) {
	return props.align === 'left' && left;
}, ' ', function (props) {
	return props.align === 'right' && right;
});

var rangeLabelsContainer = /*#__PURE__*/exports.rangeLabelsContainer = (0, _emotion.css)('position:relative;');

exports.default = Label;