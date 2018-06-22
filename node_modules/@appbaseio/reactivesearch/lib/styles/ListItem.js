'use strict';

exports.__esModule = true;
exports.Image = exports.Title = exports.container = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _utils = require('./utils');

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var container = /*#__PURE__*/(0, _emotion.css)('display:flex;flex-direction:column;margin:0;border-radius:0.25rem;overflow:hidden;');

var smallImage = /*#__PURE__*/(0, _emotion.css)('width:100px;height:100px;');

var Image = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'ez0j50z0'
})('width:160px;height:160px;', function (props) {
	return props.small ? smallImage : null;
}, ';margin:0;background-size:contain;background-position:center center;background-repeat:no-repeat;background-image:', function (props) {
	return 'url(' + props.src + ')';
}, ';');

var ListItem = /*#__PURE__*/(0, _reactEmotion2.default)('a', {
	target: 'ez0j50z1'
})('width:100%;height:auto;outline:none;text-decoration:none;border-radius:0;background-color:', function (_ref) {
	var theme = _ref.theme;
	return theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.2) : '#fff';
}, ';display:flex;flex-direction:row;margin:0;padding:10px;border-bottom:1px solid ', function (_ref2) {
	var theme = _ref2.theme;
	return theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.68) : (0, _utils.shade)(theme.colors.textColor, 0.68);
}, ';color:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.textColor;
}, ';', function (props) {
	return props.href ? 'cursor: pointer' : null;
}, ';all 0.3s ease;&:hover,&:focus{background-color:', function (_ref4) {
	var theme = _ref4.theme;
	return theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.3) : '#fdfefd';
}, ';}&:last-child{border:0;}h2{width:100%;line-height:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;padding:0 0 8px;}p{margin:0;}article{width:', function (props) {
	if (props.image) {
		return props.small ? 'calc(100% - 100px)' : 'calc(100% - 160px)';
	}
	return '100%';
}, ';padding-left:', function (props) {
	return props.image ? '10px' : 0;
}, ';font-size:0.9rem;}&:hover,&:focus{box-shadow:0 0 0 0 rgba(0,0,0,0.10);}@media (max-width:420px){min-width:0;margin:0;border-radius:0;box-shadow:none;border:1px solid #eee;&:hover,&:focus{box-shadow:0;}}');

exports.default = ListItem;
exports.container = container;
exports.Title = _Title2.default;
exports.Image = Image;