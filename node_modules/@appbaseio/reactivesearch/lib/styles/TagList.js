'use strict';

exports.__esModule = true;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagList = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1x48c4h0'
})('display:flex;flex-wrap:wrap;align-items:center;margin:0 -5px;max-wdth:100%;span{display:inline-block;margin:2px 5px;cursor:pointer;border-radius:0.25rem;padding:2px 4px;&.active{background-color:', function (_ref) {
	var theme = _ref.theme;
	return theme.colors.primaryColor;
}, ';color:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.colors.primaryTextColor;
}, ';}}');

exports.default = TagList;