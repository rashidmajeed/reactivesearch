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

var container = /*#__PURE__*/(0, _emotion.css)('display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap;margin:0 -8px;@media (max-width:420px){margin:0;}');

var Image = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1cc0ogo0'
})('width:calc(100% + 20px);height:220px;margin:-10px -10px 0;background-color:', function (_ref) {
	var colors = _ref.theme.colors;
	return colors.backgroundColor || '#fcfcfc';
}, ';background-size:contain;background-position:center center;background-repeat:no-repeat;');

var Card = /*#__PURE__*/(0, _reactEmotion2.default)('a', {
	target: 'e1cc0ogo1'
})('width:auto;flex-grow:1;outline:none;text-decoration:none;min-width:240px;max-width:250px;border-radius:0.25rem;background-color:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.colors.backgroundColor ? (0, _utils.shade)(theme.colors.backgroundColor, 0.2) : '#fff';
}, ';height:300px;display:flex;flex-direction:column;justify-content:space-between;margin:8px;padding:10px;overflow:hidden;box-shadow:0 0 4px 0 rgba(0,0,0,0.2);color:', function (_ref3) {
	var theme = _ref3.theme;
	return theme.colors.textColor;
}, ';', function (props) {
	return props.href ? 'cursor: pointer' : null;
}, ';transition:all 0.3s ease;h2{width:100%;font-size:0.9rem;line-height:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;padding:10px 0 8px;}p{margin:0}article{flex-grow:1;font-size:0.9rem;}&:hover,&:focus{box-shadow:0 0 8px 1px rgba(0,0,0,.3);}@media (max-width:420px){width:50%;min-width:0;height:210px;margin:0;border-radius:0;box-shadow:none;border:1px solid #eee;&:hover,&:focus{box-shadow:0;}}');

exports.default = Card;
exports.container = container;
exports.Title = _Title2.default;
exports.Image = Image;