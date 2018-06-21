'use strict';

exports.__esModule = true;
exports.Tick = undefined;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var small = /*#__PURE__*/(0, _reactEmotion.css)('min-height:0;height:30px;border:0;box-shadow:rgba(0,0,0,0.3) 0px 1px 4px -1px;border-radius:2px;');

var dark = function dark(_ref) {
	var theme = _ref.theme;
	return (/*#__PURE__*/(0, _reactEmotion.css)('background-color:', theme.colors.backgroundColor, ';border-color:', theme.colors.borderColor, ';color:', theme.colors.textColor, ';&:hover,&:focus{background-color:', theme.colors.backgroundColor, ';}')
	);
};

var Select = /*#__PURE__*/(0, _reactEmotion2.default)('button', {
	target: 'e863kyk0'
})('width:100%;display:flex;align-items:center;justify-content:space-between;min-height:42px;border-radius:0;outline:none;padding:5px 12px;font-size:0.9rem;line-height:1.2rem;background-color:#fff;border:1px solid #ccc;color:#424242;cursor:pointer;user-select:none;transition:all 0.3s ease;', function (props) {
	return props.small ? small : null;
}, ';& > div{width:calc(100% - 24px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;}&:hover,&:focus{background-color:#fcfcfc;}', function (_ref2) {
	var themePreset = _ref2.themePreset;
	return themePreset === 'dark' && dark;
}, ';');

var Tick = /*#__PURE__*/(0, _reactEmotion2.default)('span', {
	target: 'e863kyk1'
})('width:16px;height:16px;display:inline-block;position:relative;user-select:none;align-items:center;&::after{box-sizing:content-box;content:"";position:absolute;background-color:transparent;top:50%;left:0;width:8px;height:4px;margin-top:-4px;border-style:solid;border-color:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.primaryColor;
}, ';border-width:0 0 2px 2px;border-radius:0;border-image:none;transform:rotate(-45deg) scale(1);transition:all 200ms ease-out;}');

exports.default = Select;
exports.Tick = Tick;