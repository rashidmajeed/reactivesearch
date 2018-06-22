'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _StarRating = require('./addons/StarRating');

var _StarRating2 = _interopRequireDefault(_StarRating);

var _ratingsList = require('../../styles/ratingsList');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RatingsFilter = function (_Component) {
	_inherits(RatingsFilter, _Component);

	function RatingsFilter(props) {
		_classCallCheck(this, RatingsFilter);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.type = 'range';
		_this.state = {
			currentValue: null
		};
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	RatingsFilter.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		var _props = this.props,
		    selectedValue = _props.selectedValue,
		    defaultSelected = _props.defaultSelected;

		if (selectedValue) {
			if (Array.isArray(selectedValue)) {
				this.setValue(selectedValue);
			} else {
				// for SSR
				this.setValue(RatingsFilter.parseValue(selectedValue));
			}
		} else if (defaultSelected) {
			this.setValue(RatingsFilter.parseValue(defaultSelected));
		}
	};

	RatingsFilter.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			_this2.setReact(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.setValue(nextProps.defaultSelected ? [nextProps.defaultSelected.start, nextProps.defaultSelected.end] : null, nextProps);
		} else if (!(0, _helper.isEqual)(this.state.currentValue, nextProps.selectedValue)) {
			this.setValue(nextProps.selectedValue || null, nextProps);
		}
	};

	RatingsFilter.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	RatingsFilter.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	// parses range label to get start and end


	RatingsFilter.prototype.render = function render() {
		var _this3 = this;

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			_react2.default.createElement(
				'ul',
				{ className: _ratingsList.ratingsList },
				this.props.data.map(function (item) {
					return _react2.default.createElement(
						'li',
						{
							role: 'menuitem',
							tabIndex: '0',
							className: _this3.state.currentValue && _this3.state.currentValue[0] === item.start ? 'active' : '',
							onClick: function onClick() {
								return _this3.setValue([item.start, item.end]);
							},
							onKeyPress: function onKeyPress(e) {
								return (0, _helper.handleA11yAction)(e, function () {
									return _this3.setValue([item.start, item.end]);
								});
							},
							key: _this3.props.componentId + '-' + item.start + '-' + item.end
						},
						_react2.default.createElement(_StarRating2.default, { stars: item.start }),
						item.label ? _react2.default.createElement(
							'span',
							null,
							item.label
						) : null
					);
				})
			)
		);
	};

	return RatingsFilter;
}(_react.Component);

RatingsFilter.parseValue = function (value) {
	return value ? [value.start, value.end] : null;
};

RatingsFilter.defaultQuery = function (value, props) {
	if (value) {
		var _range;

		return {
			range: (_range = {}, _range[props.dataField] = {
				gte: value[0],
				lte: value[1],
				boost: 2.0
			}, _range)
		};
	}
	return null;
};

var _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.setValue = function (value) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this4.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this4.locked) {
			return;
		}

		_this4.locked = true;
		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: value
			}, function () {
				_this4.updateQuery(value, props);
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(value);
			});
		};
		(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || RatingsFilter.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: false,
			URLParams: props.URLParams
		});
	};
};

RatingsFilter.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	beforeValueChange: _types2.default.func,
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	customQuery: _types2.default.func,
	data: _types2.default.data,
	dataField: _types2.default.stringRequired,
	defaultSelected: _types2.default.range,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	react: _types2.default.react,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

RatingsFilter.defaultProps = {
	className: null,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch) {
	return {
		addComponent: function addComponent(component) {
			return dispatch((0, _actions.addComponent)(component));
		},
		removeComponent: function removeComponent(component) {
			return dispatch((0, _actions.removeComponent)(component));
		},
		updateQuery: function updateQuery(updateQueryObject) {
			return dispatch((0, _actions.updateQuery)(updateQueryObject));
		},
		watchComponent: function watchComponent(component, react) {
			return dispatch((0, _actions.watchComponent)(component, react));
		},
		setQueryListener: function setQueryListener(component, onQueryChange, beforeQueryChange) {
			return dispatch((0, _actions.setQueryListener)(component, onQueryChange, beforeQueryChange));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(RatingsFilter);