'use strict';

exports.__esModule = true;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _emotion = require('emotion');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leftLabel = /*#__PURE__*/(0, _emotion.css)('flex-direction:row;align-items:center;');

var rightLabel = /*#__PURE__*/(0, _emotion.css)('flex-direction:row-reverse;align-items:center;');

var topLabel = /*#__PURE__*/(0, _emotion.css)('flex-direction:column;');

var bottomLabel = /*#__PURE__*/(0, _emotion.css)('flex-direction:column-reverse;');

var border = function border(_ref) {
	var colors = _ref.theme.colors;
	return (/*#__PURE__*/(0, _emotion.css)('border:1px solid ', colors.borderColor || '#ccc', ';')
	);
};

var Flex = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1hwwpu60'
})('display:', function (props) {
	return props.inline ? 'inline-flex' : 'flex';
}, ';', function (props) {
	return (props.labelPosition === 'left' || props.iconPosition === 'right') && leftLabel;
}, ';', function (props) {
	return (props.labelPosition === 'right' || props.iconPosition === 'left') && rightLabel;
}, ';', function (props) {
	return props.labelPosition === 'top' && topLabel;
}, ';', function (props) {
	return props.labelPosition === 'bottom' && bottomLabel;
}, ';', function (props) {
	return props.showBorder && border;
}, ';', function (props) {
	return props.justifyContent && /*#__PURE__*/(0, _emotion.css)('justify-content:', props.justifyContent, ';');
}, ';', function (props) {
	return props.alignItems && /*#__PURE__*/(0, _emotion.css)('align-items:', props.alignItems, ';');
}, ';', function (props) {
	return props.flex && /*#__PURE__*/(0, _emotion.css)('flex:', props.flex, ';');
}, ';', function (props) {
	return props.direction && /*#__PURE__*/(0, _emotion.css)('flex-direction:', props.direction, ';');
}, ';', function (props) {
	return props.basis && /*#__PURE__*/(0, _emotion.css)('flex-basis:', props.basis, ';');
}, ';svg.cancel-icon{cursor:pointer;fill:', function (_ref2) {
	var colors = _ref2.theme.colors;
	return colors.borderColor || (0, _utils.shade)(colors.textColor, 0.3);
}, ';flex-basis:30px;&:hover{fill:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.textColor;
}, ';}}');

exports.default = Flex;