'use strict';

exports.__esModule = true;
exports.default = Pagination;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Button = require('../../../styles/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStartPage(totalPages, currentPage) {
	var midValue = parseInt(totalPages / 2, 10);
	var start = currentPage - midValue;
	return start > 1 ? start : 2;
}

function Pagination(props) {
	var start = getStartPage(props.pages, props.currentPage);
	var pages = [];

	var onPrevPage = function onPrevPage() {
		if (props.currentPage) {
			props.setPage(props.currentPage - 1);
		}
	};

	var onNextPage = function onNextPage() {
		if (props.currentPage < props.totalPages - 1) {
			props.setPage(props.currentPage + 1);
		}
	};

	if (start <= props.totalPages) {
		var totalPagesToShow = props.pages < props.totalPages ? start + props.pages - 1 : props.totalPages + 1;

		var _loop = function _loop(i) {
			var primary = props.currentPage === i - 1;
			var innerClassName = (0, _helper.getClassName)(props.innerClass, 'button');
			var className = innerClassName || primary ? innerClassName + ' ' + (primary ? 'active' : '') : null;
			var pageBtn = _react2.default.createElement(
				_Button2.default,
				{
					className: className,
					primary: primary,
					key: i - 1,
					onClick: function onClick() {
						return props.setPage(i - 1);
					}
				},
				i
			);
			if (i <= props.totalPages + 1) {
				pages.push(pageBtn);
			}
		};

		for (var i = start; i < totalPagesToShow; i += 1) {
			_loop(i);
		}
	}

	if (!props.totalPages) {
		return null;
	}

	var innerClassName = (0, _helper.getClassName)(props.innerClass, 'button');
	var primary = props.currentPage === 0;
	var className = innerClassName || primary ? innerClassName + ' ' + (primary ? 'active' : '') : null;

	return _react2.default.createElement(
		'div',
		{ className: _Button.pagination + ' ' + (0, _helper.getClassName)(props.innerClass, 'pagination') },
		_react2.default.createElement(
			_Button2.default,
			{
				className: (0, _helper.getClassName)(props.innerClass, 'button') || null,
				disabled: props.currentPage === 0,
				onClick: onPrevPage
			},
			'Prev'
		),
		_react2.default.createElement(
			_Button2.default,
			{
				className: className,
				primary: primary,
				onClick: function onClick() {
					return props.setPage(0);
				}
			},
			'1'
		),
		props.currentPage >= props.pages ? _react2.default.createElement(
			'span',
			null,
			'...'
		) : null,
		pages,
		_react2.default.createElement(
			_Button2.default,
			{
				className: (0, _helper.getClassName)(props.innerClass, 'button') || null,
				disabled: props.currentPage >= props.totalPages - 1,
				onClick: onNextPage
			},
			'Next'
		)
	);
}

Pagination.propTypes = {
	currentPage: _types2.default.number,
	innerClass: _types2.default.style,
	pages: _types2.default.number,
	setPage: _types2.default.func,
	totalPages: _types2.default.number
};