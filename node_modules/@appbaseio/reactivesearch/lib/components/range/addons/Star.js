'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Star(props) {
	return _react2.default.createElement(
		'svg',
		{
			width: '286px',
			height: '272px',
			viewBox: '0 0 286 272',
			version: '1.1',
			xmlns: 'http://www.w3.org/2000/svg',
			className: props.className
		},
		_react2.default.createElement('defs', null),
		_react2.default.createElement(
			'g',
			{
				id: 'Page-1',
				stroke: 'none',
				strokeWidth: '1',
				fill: 'none',
				fillRule: 'evenodd'
			},
			_react2.default.createElement('polygon', {
				id: 'star-flat',
				fill: '#FFA91B',
				points: '143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 '
			})
		)
	);
}

Star.propTypes = {
	className: _types2.default.string
};

exports.default = Star;