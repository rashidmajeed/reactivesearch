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

var _FormControlList = require('../../styles/FormControlList');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiRange = function (_Component) {
	_inherits(MultiRange, _Component);

	function MultiRange(props) {
		_classCallCheck(this, MultiRange);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: [],
			showModal: false,
			// selectedValues hold the selected items as keys for O(1) complexity
			selectedValues: {}
		};

		_this.type = 'range';
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	MultiRange.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.selectItem(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.selectItem(this.props.defaultSelected, true);
		}
	};

	MultiRange.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

	MultiRange.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	MultiRange.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	// parses range label to get start and end


	MultiRange.prototype.render = function render() {
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
				_FormControlList.UL,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'list') || null },
				this.props.data.map(function (item) {
					return _react2.default.createElement(
						'li',
						{ key: item.label, className: '' + (_this3.state.selectedValues[item.label] ? 'active' : '') },
						_react2.default.createElement(_FormControlList.Checkbox, {
							className: (0, _helper.getClassName)(_this3.props.innerClass, 'checkbox') || null,
							id: _this3.props.componentId + '-' + item.label,
							name: _this3.props.componentId,
							value: item.label,
							onChange: _this3.handleClick,
							checked: !!_this3.state.selectedValues[item.label],
							show: _this3.props.showCheckbox
						}),
						_react2.default.createElement(
							'label',
							{
								className: (0, _helper.getClassName)(_this3.props.innerClass, 'label') || null,
								htmlFor: _this3.props.componentId + '-' + item.label
							},
							item.label
						)
					);
				})
			)
		);
	};

	return MultiRange;
}(_react.Component);

MultiRange.parseValue = function (value, props) {
	return value ? props.data.filter(function (item) {
		return value.includes(item.label);
	}) : null;
};

MultiRange.defaultQuery = function (values, props) {
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
	var _this4 = this;

	this.selectItem = function (item) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this4.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this4.locked) {
			return;
		}

		_this4.locked = true;
		var _state = _this4.state,
		    currentValue = _state.currentValue,
		    selectedValues = _state.selectedValues;


		if (!item) {
			currentValue = [];
			selectedValues = {};
		} else if (isDefaultValue) {
			// checking if the items in defaultSeleted exist in the data prop
			currentValue = MultiRange.parseValue(item, props);
			currentValue.forEach(function (value) {
				var _extends2;

				selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[value.label] = true, _extends2));
			});
		} else if (selectedValues[item]) {
			currentValue = currentValue.filter(function (value) {
				return value.label !== item;
			});

			var _selectedValues = selectedValues,
			    del = _selectedValues[item],
			    selected = _objectWithoutProperties(_selectedValues, [item]);

			selectedValues = selected;
		} else {
			var _extends3;

			var currentItem = props.data.find(function (value) {
				return item === value.label;
			});
			currentValue = [].concat(currentValue, [currentItem]);
			selectedValues = _extends({}, selectedValues, (_extends3 = {}, _extends3[item] = true, _extends3));
		}
		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: currentValue,
				selectedValues: selectedValues
			}, function () {
				_this4.updateQuery(currentValue, props);
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(currentValue);
			});
		};

		(0, _helper.checkValueChange)(props.componentId, currentValue, props.beforeValueChange, performUpdate);
	};

	this.toggleModal = function () {
		_this4.setState({
			showModal: !_this4.state.showModal
		});
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || MultiRange.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};

	this.handleClick = function (e) {
		_this4.selectItem(e.target.value);
	};
};

MultiRange.propTypes = {
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
	showCheckbox: _types2.default.boolRequired,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	supportedOrientations: _types2.default.supportedOrientations,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

MultiRange.defaultProps = {
	className: null,
	showCheckbox: true,
	showFilter: true,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(MultiRange);