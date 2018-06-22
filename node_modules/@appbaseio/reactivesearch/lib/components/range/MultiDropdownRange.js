'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _Dropdown = require('../shared/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiDropdownRange = function (_Component) {
	_inherits(MultiDropdownRange, _Component);

	function MultiDropdownRange(props) {
		_classCallCheck(this, MultiDropdownRange);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: []
		};

		// selectedValues hold the selected items as keys for O(1) complexity
		_this.selectedValues = {};
		_this.type = 'range';
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	MultiDropdownRange.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.selectItem(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.selectItem(this.props.defaultSelected, true);
		}
	};

	MultiDropdownRange.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.selectItem(nextProps.defaultSelected, true);
		} else if (!(0, _helper.isEqual)(this.state.currentValue, nextProps.selectedValue) && (nextProps.selectedValue || nextProps.selectedValue === null)) {
			this.selectItem(nextProps.selectedValue, true);
		}
	};

	MultiDropdownRange.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	MultiDropdownRange.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	// parses range label to get start and end


	MultiDropdownRange.prototype.render = function render() {
		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			_react2.default.createElement(_Dropdown2.default, {
				innerClass: this.props.innerClass,
				items: this.props.data,
				onChange: this.selectItem,
				selectedItem: this.state.currentValue,
				placeholder: this.props.placeholder,
				keyField: 'label',
				multi: true,
				returnsObject: true,
				themePreset: this.props.themePreset
			})
		);
	};

	return MultiDropdownRange;
}(_react.Component);

MultiDropdownRange.parseValue = function (value, props) {
	return value ? props.data.filter(function (item) {
		return value.includes(item.label);
	}) : null;
};

MultiDropdownRange.defaultQuery = function (values, props) {
	var generateRangeQuery = function generateRangeQuery(dataField, items) {
		if (items.length > 0) {
			return items.map(function (value) {
				var _range;

				return {
					range: (_range = {}, _range[dataField] = {
						gte: value.start,
						lte: value.end,
						boost: 2.0
					}, _range)
				};
			});
		}
		return null;
	};

	if (values && values.length) {
		var query = {
			bool: {
				should: generateRangeQuery(props.dataField, values),
				minimum_should_match: 1,
				boost: 1.0
			}
		};
		return query;
	}
	return null;
};

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.selectItem = function (item) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this3.locked) {
			return;
		}

		_this3.locked = true;
		var currentValue = _this3.state.currentValue;


		if (!item) {
			currentValue = [];
			_this3.selectedValues = {};
		} else if (isDefaultValue) {
			// checking if the items in defaultSeleted exist in the data prop
			currentValue = MultiDropdownRange.parseValue(item, props);
			currentValue.forEach(function (value) {
				var _extends2;

				_this3.selectedValues = _extends({}, _this3.selectedValues, (_extends2 = {}, _extends2[value.label] = true, _extends2));
			});
		} else if (_this3.selectedValues[item.label]) {
			currentValue = currentValue.filter(function (value) {
				return value.label !== item.label;
			});

			var _selectedValues = _this3.selectedValues,
			    del = _selectedValues[item.label],
			    selectedValues = _objectWithoutProperties(_selectedValues, [item.label]);

			_this3.selectedValues = selectedValues;
		} else {
			var _extends3;

			currentValue = [].concat(currentValue, [item]);
			_this3.selectedValues = _extends({}, _this3.selectedValues, (_extends3 = {}, _extends3[item.label] = true, _extends3));
		}
		var performUpdate = function performUpdate() {
			_this3.setState({
				currentValue: currentValue
			}, function () {
				_this3.updateQuery(currentValue, props);
				_this3.locked = false;
				if (props.onValueChange) props.onValueChange(currentValue);
			});
		};

		(0, _helper.checkValueChange)(props.componentId, currentValue, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || MultiDropdownRange.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};
};

MultiDropdownRange.propTypes = {
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
	defaultSelected: _types2.default.stringArray,
	filterLabel: _types2.default.filterLabel,
	innerClass: _types2.default.style,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	placeholder: _types2.default.string,
	react: _types2.default.react,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	title: _types2.default.title,
	themePreset: _types2.default.themePreset,
	URLParams: _types2.default.bool
};

MultiDropdownRange.defaultProps = {
	className: null,
	placeholder: 'Select a value',
	showFilter: true,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null,
		themePreset: state.config.themePreset
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(MultiDropdownRange);