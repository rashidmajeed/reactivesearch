'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var _ratingsList = require('../../../styles/ratingsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StarRating(props) {
	return _react2.default.createElement(
		'div',
		{ className: _ratingsList.starRow },
		Array(props.stars).fill('').map(function (item, index) {
			return _react2.default.createElement(_Star2.default, { key: index }) // eslint-disable-line
			;
		}),
		Array(5 - props.stars).fill('').map(function (item, index) {
			return _react2.default.createElement(_Star2.default, { key: index, className: _ratingsList.whiteStar }) // eslint-disable-line
			;
		})
	);
}

StarRating.propTypes = {
	stars: _types2.default.number
};

exports.default = StarRating;