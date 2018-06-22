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

var _FormControlList = require('../../styles/FormControlList');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleRange = function (_Component) {
	_inherits(SingleRange, _Component);

	function SingleRange(props) {
		_classCallCheck(this, SingleRange);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: null
		};
		_this.type = 'range';
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	SingleRange.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected);
		}
	};

	SingleRange.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.setValue(nextProps.defaultSelected);
		} else if (!(0, _helper.isEqual)(this.state.currentValue, nextProps.selectedValue)) {
			this.setValue(nextProps.selectedValue);
		}
	};

	SingleRange.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	SingleRange.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	// parses range label to get start and end


	SingleRange.prototype.render = function render() {
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
					var selected = !!_this3.state.currentValue && _this3.state.currentValue.label === item.label;
					return _react2.default.createElement(
						'li',
						{ key: item.label, className: '' + (selected ? 'active' : '') },
						_react2.default.createElement(_FormControlList.Radio, {
							className: (0, _helper.getClassName)(_this3.props.innerClass, 'radio'),
							id: _this3.props.componentId + '-' + item.label,
							name: _this3.props.componentId,
							value: item.label,
							onChange: _this3.handleClick,
							checked: selected,
							show: _this3.props.showRadio
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

	return SingleRange;
}(_react.Component);

SingleRange.parseValue = function (value, props) {
	return props.data.find(function (item) {
		return item.label === value;
	}) || null;
};

SingleRange.defaultQuery = function (value, props) {
	if (value) {
		var _range;

		return {
			range: (_range = {}, _range[props.dataField] = {
				gte: value.start,
				lte: value.end,
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
		var currentValue = SingleRange.parseValue(value, props);

		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: currentValue
			}, function () {
				_this4.updateQuery(currentValue, props);
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(currentValue);
			});
		};

		(0, _helper.checkValueChange)(props.componentId, currentValue, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || SingleRange.defaultQuery;

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
		_this4.setValue(e.target.value);
	};
};

SingleRange.propTypes = {
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
	defaultSelected: _types2.default.string,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	react: _types2.default.react,
	showFilter: _types2.default.bool,
	showRadio: _types2.default.boolRequired,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

SingleRange.defaultProps = {
	className: null,
	showFilter: true,
	showRadio: true,
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(SingleRange);