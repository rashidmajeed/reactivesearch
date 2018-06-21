'use strict';

exports.__esModule = true;
exports.histogramContainer = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var histogramContainer = /*#__PURE__*/exports.histogramContainer = (0, _emotion.css)('display:flex;height:100px;align-items:flex-end;margin:0 12px -24px 12px;');

var dimensions = function dimensions(props) {
	return (/*#__PURE__*/(0, _emotion.css)('width:', props.width, ';height:', props.height, ';')
	);
};

var Historam = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'e1y359pe0'
})('background-color:#efefef;', dimensions);

exports.default = Historam;