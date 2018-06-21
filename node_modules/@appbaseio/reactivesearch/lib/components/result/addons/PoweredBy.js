'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PoweredByImage = require('../../../styles/PoweredByImage');

var _PoweredByImage2 = _interopRequireDefault(_PoweredByImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PoweredBy = function PoweredBy() {
	return _react2.default.createElement(
		'a',
		{ href: 'https://appbase.io/', target: '_blank', rel: 'noopener noreferrer' },
		_react2.default.createElement(_PoweredByImage2.default, { src: 'https://cdn.rawgit.com/appbaseio/cdn/d2ec210045e59104ee5485841fa17b23fc83f097/appbase/logos/rbc-logo.svg' })
	);
};

exports.default = PoweredBy;