'use strict';

exports.__esModule = true;
exports.numberBoxContainer = exports.toggleButtons = exports.filters = exports.pagination = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filters = function filters(_ref) {
	var borderColor = _ref.colors.borderColor;
	return (/*#__PURE__*/(0, _emotion.css)('margin:0 -3px;max-width:100%;a{margin:2px 3px;padding:5px 8px;font-size:0.85rem;position:relative;span:first-child{max-width:360px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:26px;}span:last-child{display:flex;height:100%;top:0;right:8px;position:absolute;align-items:center;border-left:1px solid ', borderColor || '#fff', ';padding-left:8px;margin-left:8px;}&:hover,&:focus{span:first-child{text-decoration:line-through;}}}')
	);
};

var pagination = /*#__PURE__*/(0, _emotion.css)('margin:10px -3px;max-width:100%;text-align:center;a{margin:0 3px;}');

var toggleButtons = /*#__PURE__*/(0, _emotion.css)('margin:0 -3px;max-width:100%;a{margin:3px 3px;}');

var numberBoxContainer = /*#__PURE__*/(0, _emotion.css)('margin:0 -5px;a{margin:5px;}span{margin:0 5px;}');

var primary = function primary(_ref2) {
	var theme = _ref2.theme;
	return (/*#__PURE__*/(0, _emotion.css)('background-color:', theme.colors.primaryColor, ';color:', theme.colors.primaryTextColor, ';&:hover,&:focus{background-color:', (0, _utils.shade)(theme.colors.primaryColor, -0.1), ';}')
	);
};

var large = function large() {
	return (/*#__PURE__*/(0, _emotion.css)('min-height:40px;padding:10px 20px;')
	);
};

var disabled = function disabled(_ref3) {
	var theme = _ref3.theme;
	return (/*#__PURE__*/(0, _emotion.css)('background-color:', theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.3) : '#fafafa', ';color:#ccc;cursor:not-allowed;&:hover,&:focus{background-color:', theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.3) : '#fafafa', ';}')
	);
};

var Button = /*#__PURE__*/(0, _reactEmotion2.default)('a', {
	target: 'e165j7gc0'
})('display:inline-flex;justify-content:center;align-items:center;border-radius:3px;min-height:30px;word-wrap:break-word;padding:5px 12px;line-height:1.2rem;background-color:', function (_ref4) {
	var theme = _ref4.theme;
	return theme.colors.backgroundColor || '#eee';
}, ';color:', function (_ref5) {
	var theme = _ref5.theme;
	return theme.colors.textColor;
}, ';cursor:pointer;user-select:none;transition:all 0.3s ease;&:hover,&:focus{background-color:', function (_ref6) {
	var theme = _ref6.theme;
	return theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.1) : '#ccc';
}, ';}', function (props) {
	return props.primary ? primary : null;
}, ';', function (props) {
	return props.disabled ? disabled : null;
}, ';', function (props) {
	return props.large && large;
}, ';');

exports.pagination = pagination;
exports.filters = filters;
exports.toggleButtons = toggleButtons;
exports.numberBoxContainer = numberBoxContainer;
exports.default = Button;