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

var _Button = require('../../styles/Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleButton = function (_Component) {
	_inherits(ToggleButton, _Component);

	function ToggleButton(props) {
		_classCallCheck(this, ToggleButton);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: []
		};
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	ToggleButton.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.handleToggle(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.handleToggle(this.props.defaultSelected, true);
		}
	};

	ToggleButton.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			_this2.setReact(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.handleToggle(nextProps.defaultSelected, true, nextProps);
		} else if (nextProps.multiSelect) {
			// for multiselect selectedValue will be an array
			if (!(0, _helper.isEqual)(this.state.currentValue, nextProps.selectedValue)) {
				this.handleToggle(nextProps.selectedValue || [], true, nextProps);
			}
		} else {
			// else multiselect will be a string
			var currentValue = this.state.currentValue[0] ? this.state.currentValue[0].value : null;
			if (!(0, _helper.isEqual)(currentValue, nextProps.selectedValue)) {
				this.handleToggle(nextProps.selectedValue || [], true, nextProps);
			}
		}
	};

	ToggleButton.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	ToggleButton.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	ToggleButton.prototype.render = function render() {
		var _this3 = this;

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: _Button.toggleButtons + ' ' + (this.props.className || '') },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			this.props.data.map(function (item) {
				var isSelected = _this3.state.currentValue.some(function (value) {
					return value.value === item.value;
				});
				return _react2.default.createElement(
					_Button2.default,
					{
						className: (0, _helper.getClassName)(_this3.props.innerClass, 'button') + ' ' + (isSelected ? 'active' : ''),
						onClick: function onClick() {
							return _this3.handleToggle(item);
						},
						key: item.value,
						primary: isSelected,
						large: true
					},
					item.label
				);
			})
		);
	};

	return ToggleButton;
}(_react.Component);

ToggleButton.parseValue = function (value, props) {
	if (Array.isArray(value)) {
		return props.data.filter(function (item) {
			return value.includes(item.value);
		});
	}
	return props.data.filter(function (item) {
		return item.value === value;
	});
};

ToggleButton.defaultQuery = function (value, props) {
	var query = null;
	if (value && value.length) {
		query = {
			bool: {
				boost: 1.0,
				minimum_should_match: 1,
				should: value.map(function (item) {
					var _term;

					return {
						term: (_term = {}, _term[props.dataField] = item.value, _term)
					};
				})
			}
		};
	}
	return query;
};

var _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.handleToggle = function (value) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this4.props;
		var currentValue = _this4.state.currentValue;

		var toggleValue = value;
		var finalValue = [];

		if (isDefaultValue) {
			finalValue = ToggleButton.parseValue(toggleValue, props);
		} else if (_this4.props.multiSelect) {
			finalValue = currentValue.some(function (item) {
				return item.value === toggleValue.value;
			}) ? currentValue.filter(function (item) {
				return item.value !== toggleValue.value;
			}) : currentValue.concat(toggleValue);
		} else {
			finalValue = currentValue.some(function (item) {
				return item.value === toggleValue.value;
			}) ? [] : [toggleValue];
		}

		_this4.setValue(finalValue);
	};

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
		(0, _helper.checkValueChange)(props.componentId, props.multiSelect ? value : value[0], props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || ToggleButton.defaultQuery;

		var filterValue = value;
		if (!props.multiSelect) {
			filterValue = value[0] ? value[0].value : null;
		}
		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: filterValue, // sets a string in URL not array
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};
};

ToggleButton.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	data: _types2.default.data,
	dataField: _types2.default.stringRequired,
	defaultSelected: _types2.default.stringOrArray,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	multiSelect: _types2.default.bool,
	onQueryChange: _types2.default.func,
	react: _types2.default.react,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

ToggleButton.defaultProps = {
	className: null,
	multiSelect: true,
	showFilter: true,
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(ToggleButton);