'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Label = require('../../../styles/Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeLabel = function RangeLabel(_ref) {
	var align = _ref.align,
	    children = _ref.children,
	    className = _ref.className;
	return (
		// eslint-disable-next-line
		_react2.default.createElement(
			_Label2.default,
			{ align: align, className: className },
			children
		)
	);
};

RangeLabel.propTypes = {
	align: _types2.default.rangeLabelsAlign,
	children: _types2.default.children,
	className: _types2.default.string
};

exports.default = RangeLabel;