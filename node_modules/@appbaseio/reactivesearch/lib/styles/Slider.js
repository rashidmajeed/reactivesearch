'use strict';

exports.__esModule = true;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var primary = function primary(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _emotion.css)('background-color:', theme.colors.primaryColor, ';')
	);
};

var Slider = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1p4hzk20'
})('.rheostat{overflow:visible;margin:24px 12px;}.rheostat-progress{background-color:#d8d8d8;position:absolute;', function (props) {
	return props.primary && primary;
}, '}.rheostat-handle{border:1px solid #9a9a9a;', function (props) {
	return props.primary && primary;
}, ' background-color:#fff;border-radius:50%;height:24px;outline:none;z-index:2;width:24px;cursor:pointer;}.rheostat-horizontal{height:24px;}.rheostat-background{height:4px;background-color:#c7c7c7;top:0px;width:100%;position:relative;}.rheostat-horizontal .rheostat-progress{height:4px;top:0;}.rheostat-horizontal .rheostat-handle{margin-left:-12px;top:-10px;}', function (_ref2) {
	var theme = _ref2.theme;
	return theme.component;
}, ';');

exports.default = Slider;