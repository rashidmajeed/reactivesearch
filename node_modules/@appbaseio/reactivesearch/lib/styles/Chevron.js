'use strict';

exports.__esModule = true;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var open = /*#__PURE__*/(0, _emotion.css)('top:0.55em;transform:rotate(-45deg);');

var Chevron = /*#__PURE__*/(0, _reactEmotion2.default)('span', {
	target: 'e1i1ftc40'
})('&::before{content:"";border-style:solid;border-width:0.15em 0.15em 0 0;display:inline-block;height:0.45em;position:relative;top:0.35em;left:0;transform:rotate(135deg);vertical-align:top;width:0.45em;', function (props) {
	return props.open ? open : null;
}, '}');

exports.default = Chevron;