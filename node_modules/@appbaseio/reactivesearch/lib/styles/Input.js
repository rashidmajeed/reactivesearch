'use strict';

exports.__esModule = true;
exports.input = exports.suggestions = exports.suggestionsContainer = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alertBorder = function alertBorder(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _emotion.css)('border:1px solid ', theme.colors.alertColor, ';')
	);
};

var input = /*#__PURE__*/(0, _emotion.css)('width:100%;height:42px;padding:8px 12px;border:1px solid #ccc;background-color:#fafafa;font-size:0.9rem;outline:none;&:focus{background-color:#fff;}');

var dark = function dark(theme) {
	return (/*#__PURE__*/(0, _emotion.css)('border-color:', theme.colors.borderColor, ';')
	);
};

var darkInput = function darkInput(_ref2) {
	var theme = _ref2.theme;
	return (/*#__PURE__*/(0, _emotion.css)('background-color:', theme.colors.backgroundColor, ';color:', theme.colors.textColor, ';', dark(theme), ';&:focus{background-color:', theme.colors.backgroundColor, ';}')
	);
};

var Input = /*#__PURE__*/(0, _reactEmotion2.default)('input', {
	target: 'ep3169p0'
})(input, ';', function (_ref3) {
	var themePreset = _ref3.themePreset;
	return themePreset === 'dark' && darkInput;
}, ';', function (props) {
	return props.showIcon && props.iconPosition === 'left' && /*#__PURE__*/(0, _emotion.css)('padding-left:32px;');
}, ';', function (props) {
	return props.showIcon && props.iconPosition === 'right' && /*#__PURE__*/(0, _emotion.css)('padding-right:32px;');
}, ';', function (props) {
	return (
		// for clear icon
		props.showClear && /*#__PURE__*/(0, _emotion.css)('padding-right:32px;')
	);
}, ';', function (props) {
	return (
		// for clear icon with search icon
		props.showClear && props.showIcon && props.iconPosition === 'right' && /*#__PURE__*/(0, _emotion.css)('padding-right:48px;')
	);
}, ';', function (props) {
	return props.alert && alertBorder;
}, ';');

var suggestions = function suggestions(themePreset, theme) {
	return (/*#__PURE__*/(0, _emotion.css)('display:block;width:100%;border:1px solid #ccc;background-color:#fff;font-size:0.9rem;z-index:3;position:absolute;top:41px;margin:0;padding:0;list-style:none;max-height:260px;overflow-y:auto;&.small{top:30px;}li{display:flex;justify-content:space-between;cursor:pointer;padding:10px;user-select:none;& > .trim{display:block;display:-webkit-box;width:100%;max-height:2.3rem;line-height:1.2rem;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;}&:hover,&:focus{background-color:#eee;}}', themePreset === 'dark' && dark(theme))
	);
};

var suggestionsContainer = /*#__PURE__*/(0, _emotion.css)('position:relative;.cancel-icon{cursor:pointer;}');

exports.default = Input;
exports.suggestionsContainer = suggestionsContainer;
exports.suggestions = suggestions;
exports.input = input;