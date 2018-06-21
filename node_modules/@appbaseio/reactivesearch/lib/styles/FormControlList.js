'use strict';

exports.__esModule = true;
exports.Checkbox = exports.Radio = exports.UL = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var item = {
	width: '16px',
	height: '16px',
	scale: '4px'
};

var vh = /*#__PURE__*/(0, _emotion.css)('border:0;clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;');

var hideInputControl = /*#__PURE__*/(0, _emotion.css)('+ label{padding-left:0;&::before,&::after{width:0;height:0;border:0;margin:0;visibility:hidden;}}&:checked{+ label{font-weight:bold;}}');

var formItem = function formItem(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _emotion.css)(vh, ';&:focus{+ label{&::before{box-shadow:0 0 0 2px ', (0, _utils.shade)(theme.colors.primaryColor, 0.4), ';}}}&:hover{+ label{&::before{border-color:', theme.colors.primaryColor, ';}}}&:active{+ label{&::before{transition-duration:0;}}}+ label{position:relative;user-select:none;display:flex;width:100%;height:100%;align-items:center;cursor:pointer;&::before{background-color:#fff;border:2px solid ', theme.colors.borderColor || (0, _utils.shade)(theme.colors.textColor, 0.5), ';box-sizing:content-box;content:"";color:', theme.colors.primaryColor, ';margin-right:calc(', item.width, ' * 0.5);top:50%;left:0;width:', item.width, ';height:', item.height, ';display:inline-block;vertical-align:middle;}&::after{box-sizing:content-box;content:"";background-color:', theme.colors.primaryColor, ';position:absolute;top:50%;left:calc(2px + ', item.scale, '/2);width:calc(', item.width, ' - ', item.scale, ');height:calc(', item.height, ' - ', item.scale, ');margin-top:calc(', item.height, '/-2 - ', item.scale, '/-2);transform:scale(0);transform-origin:50%;transition:transform 200ms ease-out;}}')
	);
};

var Radio = /*#__PURE__*/(0, _reactEmotion2.default)('input', {
	target: 'eekr4lp0'
})(formItem, ';', function (props) {
	return props.show ? null : hideInputControl;
}, ';+ label{&::before,&::after{border-radius:50%;}}&:checked{&:active,&:focus{+ label{color:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.colors.primaryColor;
}, ';&::before{animation:none;filter:none;transition:none;}}}+ label{&::before{animation:none;background-color:#fff;border-color:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.primaryColor;
}, ';}&::after{transform:scale(1);}}');

Radio.defaultProps = {
	type: 'radio',
	show: true
};

var Checkbox = /*#__PURE__*/(0, _reactEmotion2.default)('input', {
	target: 'eekr4lp1'
})(formItem, ';', function (props) {
	return props.show ? null : hideInputControl;
}, ';+ label{&::before,&::after{border-radius:0;}&::after{background-color:transparent;top:50%;left:calc(2px + ', item.width, '/5);width:calc(', item.width, ' / 2);height:calc(', item.width, ' / 5);margin-top:calc(', item.height, ' / -2 / 2 * 0.8);border-style:solid;border-color:', function (_ref4) {
	var theme = _ref4.theme;
	return theme.colors.primaryColor;
}, ';border-width:0 0 2px 2px;border-radius:0;border-image:none;transform:rotate(-45deg) scale(0);transition:none;}}&:checked{+ label{&::before{border-color:', function (_ref5) {
	var theme = _ref5.theme;
	return theme.colors.primaryColor;
}, ';}&::after{content:"";transform:rotate(-45deg) scale(1);transition:transform 200ms ease-out;}}}');

Checkbox.defaultProps = {
	type: 'checkbox',
	show: true
};

var UL = /*#__PURE__*/(0, _reactEmotion2.default)('ul', {
	target: 'eekr4lp2'
})('list-style:none;padding:0;margin:0;max-height:240px;position:relative;overflow-y:auto;padding-bottom:12px;li{height 30px;display:flex;flex-direction:row;align-items:center;padding-left:2px;}');

exports.UL = UL;
exports.Radio = Radio;
exports.Checkbox = Checkbox;