'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _Base = require('../../styles/Base');

var _Base2 = _interopRequireDefault(_Base);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URLParamsProvider = function (_Component) {
	_inherits(URLParamsProvider, _Component);

	function URLParamsProvider() {
		_classCallCheck(this, URLParamsProvider);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	URLParamsProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		if (!(0, _helper.isEqual)(this.props.selectedValues, nextProps.selectedValues)) {
			var currentComponents = Object.keys(nextProps.selectedValues);

			currentComponents.filter(function (component) {
				return nextProps.selectedValues[component].URLParams;
			}).forEach(function (component) {
				if (nextProps.selectedValues[component].URLParams) {
					_this2.setURL(component, _this2.getValue(nextProps.selectedValues[component].value));
				} else {
					_this2.props.params.delete(component);
					_this2.pushToHistory();
				}
			});

			// remove unmounted components
			Object.keys(this.props.selectedValues).filter(function (component) {
				return !currentComponents.includes(component);
			}).forEach(function (component) {
				_this2.props.params.delete(component);
				_this2.pushToHistory();
			});

			if (!currentComponents.length) {
				Array.from(this.props.params.keys()).forEach(function (item) {
					_this2.props.params.delete(item);
				});
				this.pushToHistory();
			}
		}

		if (!(0, _helper.isEqual)(this.props.headers, nextProps.headers)) {
			nextProps.setHeaders(nextProps.headers);
		}
	};

	URLParamsProvider.prototype.getValue = function getValue(value) {
		var _this3 = this;

		if (Array.isArray(value) && value.length) {
			return value.map(function (item) {
				return _this3.getValue(item);
			});
		} else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			// TODO: support for NestedList
			if (value.location) return value;
			return value.label || value.key || null;
		}
		return value;
	};

	URLParamsProvider.prototype.setURL = function setURL(component, value) {
		if (!value || typeof value === 'string' && value.trim() === '' || Array.isArray(value) && value.length === 0) {
			this.props.params.delete(component);
			this.pushToHistory();
		} else {
			var data = JSON.stringify(this.getValue(value));
			if (data !== this.props.params.get(component)) {
				this.props.params.set(component, data);
				this.pushToHistory();
			}
		}
	};

	URLParamsProvider.prototype.pushToHistory = function pushToHistory() {
		if (window.history.pushState) {
			var paramsSting = this.props.params.toString() ? '?' + this.props.params.toString() : '';
			var base = window.location.href.split('?')[0];
			var newurl = '' + base + paramsSting;
			window.history.pushState({ path: newurl }, '', newurl);
		}
	};

	URLParamsProvider.prototype.render = function render() {
		return _react2.default.createElement(
			_Base2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.children
		);
	};

	return URLParamsProvider;
}(_react.Component);

URLParamsProvider.propTypes = {
	setHeaders: _types2.default.func,
	selectedValues: _types2.default.selectedValues,
	// component props
	children: _types2.default.children,
	headers: _types2.default.headers,
	params: _types2.default.params,
	style: _types2.default.style,
	className: _types2.default.string
};

URLParamsProvider.defaultProps = {
	style: {},
	className: null
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		selectedValues: state.selectedValues
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch) {
	return {
		setHeaders: function setHeaders(headers) {
			return dispatch((0, _actions.setHeaders)(headers));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(URLParamsProvider);