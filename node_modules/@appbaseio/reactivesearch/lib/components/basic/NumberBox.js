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

var _Button = require('../../styles/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Flex = require('../../styles/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberBox = function (_Component) {
	_inherits(NumberBox, _Component);

	function NumberBox(props) {
		_classCallCheck(this, NumberBox);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.type = 'term';
		_this.state = {
			currentValue: _this.props.data.start
		};
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	NumberBox.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected);
		}
	};

	NumberBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			_this2.setReact(nextProps);
		});
		(0, _helper.checkPropChange)(this.props.defaultSelected, nextProps.defaultSelected, function () {
			_this2.setValue(nextProps.defaultSelected, nextProps);
		});
		(0, _helper.checkPropChange)(this.props.queryFormat, nextProps.queryFormat, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});
		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});
	};

	NumberBox.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	NumberBox.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	NumberBox.prototype.render = function render() {
		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			_react2.default.createElement(
				_Flex2.default,
				{ labelPosition: this.props.labelPosition, justifyContent: 'space-between', className: _Button.numberBoxContainer },
				_react2.default.createElement(
					'span',
					{ className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null },
					this.props.data.label
				),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_Button2.default,
						{
							className: (0, _helper.getClassName)(this.props.innerClass, 'button') || null,
							onClick: this.decrementValue,
							disabled: this.state.currentValue === this.props.data.start
						},
						_react2.default.createElement(
							'b',
							null,
							'-'
						)
					),
					this.state.currentValue,
					_react2.default.createElement(
						_Button2.default,
						{
							className: (0, _helper.getClassName)(this.props.innerClass, 'button') || null,
							onClick: this.incrementValue,
							disabled: this.state.currentValue === this.props.data.end
						},
						_react2.default.createElement(
							'b',
							null,
							'+'
						)
					)
				)
			)
		);
	};

	return NumberBox;
}(_react.Component);

NumberBox.defaultQuery = function (value, props) {
	var _term, _range, _range2;

	switch (props.queryFormat) {
		case 'exact':
			return {
				term: (_term = {}, _term[props.dataField] = value, _term)
			};
		case 'lte':
			return {
				range: (_range = {}, _range[props.dataField] = {
					lte: value,
					boost: 2.0
				}, _range)
			};
		default:
			return {
				range: (_range2 = {}, _range2[props.dataField] = {
					gte: value,
					boost: 2.0
				}, _range2)
			};
	}
};

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.incrementValue = function () {
		if (_this3.state.currentValue === _this3.props.data.end) {
			return;
		}
		var currentValue = _this3.state.currentValue;

		_this3.setValue(currentValue + 1);
	};

	this.decrementValue = function () {
		if (_this3.state.currentValue === _this3.props.data.start) {
			return;
		}
		var currentValue = _this3.state.currentValue;

		_this3.setValue(currentValue - 1);
	};

	this.setValue = function (value) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this3.locked) {
			return;
		}

		_this3.locked = true;
		var performUpdate = function performUpdate() {
			_this3.setState({
				currentValue: value
			}, function () {
				_this3.updateQuery(value, props);
				_this3.locked = false;
				if (props.onValueChange) props.onValueChange(value);
			});
		};
		(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || NumberBox.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			showFilter: false, // we don't need filters for NumberBox
			URLParams: props.URLParams
		});
	};
};

NumberBox.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	data: _types2.default.dataNumberBox,
	dataField: _types2.default.stringRequired,
	defaultSelected: _types2.default.number,
	innerClass: _types2.default.style,
	labelPosition: _types2.default.labelPosition,
	onQueryChange: _types2.default.func,
	queryFormat: _types2.default.queryFormatNumberBox,
	react: _types2.default.react,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

NumberBox.defaultProps = {
	className: null,
	labelPosition: 'left',
	queryFormat: 'gte',
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(NumberBox);