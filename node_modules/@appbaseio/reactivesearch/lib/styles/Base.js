'use strict';

exports.__esModule = true;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1n4b2jv0'
})('font-family:', function (_ref) {
	var theme = _ref.theme;
	return theme.typography.fontFamily;
}, ';font-size:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.typography.fontSize;
}, ';color:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.textColor;
}, ';width:100%;input,button,textarea,select{font-family:', function (_ref4) {
	var theme = _ref4.theme;
	return theme.typography.fontFamily;
}, ';}*,*:before,*:after{box-sizing:border-box;}');

exports.default = Base;