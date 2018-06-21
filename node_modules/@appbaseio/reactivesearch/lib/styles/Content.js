'use strict';

exports.__esModule = true;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = function alert(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _reactEmotion.css)('color:', theme.colors.alertColor, ';')
	);
};

var Content = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e19vigba0'
})(function (props) {
	return props.alert && alert;
}, ';margin:8px;');

exports.default = Content;