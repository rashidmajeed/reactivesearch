'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _dateFormats = require('@appbaseio/reactivecore/lib/utils/dateFormats');

var _dateFormats2 = _interopRequireDefault(_dateFormats);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _xdate = require('xdate');

var _xdate2 = _interopRequireDefault(_xdate);

var _DayPickerInput = require('react-day-picker/DayPickerInput');

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

var _emotionTheming = require('emotion-theming');

var _DateContainer = require('../../styles/DateContainer');

var _DateContainer2 = _interopRequireDefault(_DateContainer);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Flex = require('../../styles/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _CancelSvg = require('../shared/CancelSvg');

var _CancelSvg2 = _interopRequireDefault(_CancelSvg);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_Component) {
	_inherits(DatePicker, _Component);

	function DatePicker(props) {
		_classCallCheck(this, DatePicker);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentDate: ''
		};
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	DatePicker.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.handleDateChange(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.handleDateChange(this.props.defaultSelected, true);
		}
	};

	DatePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});
		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			return _this2.updateQuery(_this2.state.currentDate ? _this2.formatInputDate(_this2.state.currentDate) : null, nextProps);
		});
		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.handleDateChange(nextProps.defaultSelected, true, nextProps);
		} else if (!(0, _helper.isEqual)(this.formatInputDate(this.state.currentDate), nextProps.selectedValue) && !(0, _helper.isEqual)(this.props.selectedValue, nextProps.selectedValue)) {
			this.handleDateChange(nextProps.selectedValue || '', true, nextProps);
		}
	};

	DatePicker.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	DatePicker.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	DatePicker.prototype.render = function render() {
		return _react2.default.createElement(
			_DateContainer2.default,
			{
				showBorder: !this.props.showClear,
				style: this.props.style,
				className: this.props.className
			},
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{
					className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null
				},
				this.props.title
			),
			_react2.default.createElement(
				_Flex2.default,
				{
					showBorder: this.props.showClear,
					iconPosition: 'right',
					style: {
						background: this.props.theme.colors.backgroundColor || 'transparent'
					}
				},
				_react2.default.createElement(_DayPickerInput2.default, _extends({
					showOverlay: this.props.focused,
					formatDate: this.formatInputDate,
					value: this.state.currentDate,
					placeholder: this.props.placeholder,
					dayPickerProps: {
						numberOfMonths: this.props.numberOfMonths,
						initialMonth: this.props.initialMonth
					},
					clickUnselectsDay: this.props.clickUnselectsDay,
					onDayChange: this.handleDayPicker,
					inputProps: {
						readOnly: true
					},
					classNames: {
						container: (0, _helper.getClassName)(this.props.innerClass, 'daypicker-container') || 'DayPickerInput',
						overlayWrapper: (0, _helper.getClassName)(this.props.innerClass, 'daypicker-overlay-wrapper') || 'DayPickerInput-OverlayWrapper',
						overlay: (0, _helper.getClassName)(this.props.innerClass, 'daypicker-overlay') || 'DayPickerInput-Overlay'
					}
				}, this.props.dayPickerInputProps)),
				this.props.showClear && this.state.currentDate && _react2.default.createElement(_CancelSvg2.default, { onClick: this.clearDayPicker })
			)
		);
	};

	return DatePicker;
}(_react.Component);

DatePicker.defaultQuery = function (value, props) {
	var query = null;
	if (value && props.queryFormat) {
		var _range;

		query = {
			range: (_range = {}, _range[props.dataField] = {
				gte: undefined.formatDate(new _xdate2.default(value).addHours(-24), props),
				lte: undefined.formatDate(new _xdate2.default(value), props)
			}, _range)
		};
	}
	return query;
};

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.formatDate = function (date) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props;

		switch (props.queryFormat) {
			case 'epoch_millis':
				return date.getTime();
			case 'epoch_seconds':
				return Math.floor(date.getTime() / 1000);
			default:
				{
					if (_dateFormats2.default[props.queryFormat]) {
						return date.toString(_dateFormats2.default[props.queryFormat]);
					}
					return date;
				}
		}
	};

	this.formatInputDate = function (date) {
		return new _xdate2.default(date).toString('yyyy-MM-dd');
	};

	this.clearDayPicker = function () {
		if (_this3.state.currentDate !== '') {
			_this3.handleDateChange(''); // resets the day picker component
		}
	};

	this.handleDayPicker = function (date) {
		_this3.handleDateChange(date || '');
	};

	this.handleDateChange = function (currentDate) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props;

		// currentDate should be valid or empty string for resetting the query
		if (isDefaultValue && !new _xdate2.default(currentDate).valid() && currentDate.length) {
			console.error('DatePicker: ' + props.componentId + ' invalid value passed for date');
		} else {
			// ignore state updates when component is locked
			if (props.beforeValueChange && _this3.locked) {
				return;
			}

			_this3.locked = true;
			var value = null;
			if (currentDate) {
				value = isDefaultValue ? currentDate : _this3.formatInputDate(currentDate);
			}

			var performUpdate = function performUpdate() {
				_this3.setState({
					currentDate: currentDate
				}, function () {
					_this3.updateQuery(value, props);
					_this3.locked = false;
					if (props.onValueChange) props.onValueChange(value);
				});
			};
			(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
		}
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || DatePicker.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			showFilter: props.showFilter,
			label: props.filterLabel,
			URLParams: props.URLParams
		});
	};
};

DatePicker.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	className: _types2.default.string,
	clickUnselectsDay: _types2.default.bool,
	componentId: _types2.default.stringRequired,
	dataField: _types2.default.stringRequired,
	dayPickerInputProps: _types2.default.props,
	defaultSelected: _types2.default.date,
	filterLabel: _types2.default.string,
	focused: _types2.default.bool,
	initialMonth: _types2.default.dateObject,
	innerClass: _types2.default.style,
	numberOfMonths: _types2.default.number,
	onQueryChange: _types2.default.func,
	placeholder: _types2.default.string,
	queryFormat: _types2.default.queryFormatDate,
	react: _types2.default.react,
	showClear: _types2.default.bool,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	theme: _types2.default.style,
	title: _types2.default.string
};

DatePicker.defaultProps = {
	clickUnselectsDay: true,
	numberOfMonths: 1,
	placeholder: 'Select Date',
	showClear: true,
	showFilter: true
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)((0, _emotionTheming.withTheme)(DatePicker));