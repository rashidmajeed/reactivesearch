'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _RangeSlider = require('./RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

var _Input = require('../../styles/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Flex = require('../../styles/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Content = require('../../styles/Content');

var _Content2 = _interopRequireDefault(_Content);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeInput = function (_Component) {
	_inherits(RangeInput, _Component);

	function RangeInput(props) {
		_classCallCheck(this, RangeInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleInputChange = function (e) {
			var _this$setState;

			var _e$target = e.target,
			    name = _e$target.name,
			    value = _e$target.value;

			if (Number.isNaN(value)) {
				// set errors for invalid inputs
				if (name === 'start') {
					_this.setState({
						isStartValid: false
					});
				} else {
					_this.setState({
						isEndValid: false
					});
				}
			} else {
				// reset error states for valid inputs
				// eslint-disable-next-line
				if (name === 'start' && !_this.state.isStartValid) {
					_this.setState({
						isStartValid: true
					});
				} else if (name === 'end' && !_this.state.isEndValid) {
					_this.setState({
						isEndValid: true
					});
				}
			}
			_this.setState((_this$setState = {}, _this$setState[name] = value, _this$setState));
		};

		_this.handleSlider = function (_ref) {
			var start = _ref.start,
			    end = _ref.end;

			_this.setState({
				start: start,
				end: end
			});
			if (_this.props.onValueChange) {
				_this.props.onValueChange({
					start: start,
					end: end
				});
			}
		};

		_this.state = {
			start: _this.props.defaultSelected ? _this.props.defaultSelected.start : props.range.start,
			end: _this.props.defaultSelected ? _this.props.defaultSelected.end : props.range.end,
			isStartValid: true,
			isEndValid: true
		};
		return _this;
	}

	RangeInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.handleSlider(nextProps.defaultSelected);
		}
	};

	// for SSR


	RangeInput.prototype.render = function render() {
		var _props = this.props,
		    className = _props.className,
		    style = _props.style,
		    themePreset = _props.themePreset,
		    rest = _objectWithoutProperties(_props, ['className', 'style', 'themePreset']);

		return _react2.default.createElement(
			_Container2.default,
			{ style: style, className: className },
			_react2.default.createElement(_RangeSlider2.default, _extends({}, rest, {
				defaultSelected: {
					start: this.state.isStartValid ? Number(this.state.start) : this.props.range.start,
					end: this.state.isEndValid ? Number(this.state.end) : this.props.range.end
				},
				onValueChange: this.handleSlider,
				className: (0, _helper.getClassName)(this.props.innerClass, 'slider-container') || null
			})),
			_react2.default.createElement(
				_Flex2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'input-container') || null },
				_react2.default.createElement(
					_Flex2.default,
					{ direction: 'column', flex: 2 },
					_react2.default.createElement(_Input2.default, {
						name: 'start',
						type: 'number',
						onChange: this.handleInputChange,
						value: this.state.start,
						step: this.props.stepValue,
						alert: !this.state.isStartValid,
						className: (0, _helper.getClassName)(this.props.innerClass, 'input') || null,
						themePreset: themePreset
					}),
					!this.state.isStartValid && _react2.default.createElement(
						_Content2.default,
						{ alert: true },
						'Input range is invalid'
					)
				),
				_react2.default.createElement(
					_Flex2.default,
					{ justifyContent: 'center', alignItems: 'center', flex: 1 },
					'-'
				),
				_react2.default.createElement(
					_Flex2.default,
					{ direction: 'column', flex: 2 },
					_react2.default.createElement(_Input2.default, {
						name: 'end',
						type: 'number',
						onChange: this.handleInputChange,
						value: this.state.end,
						step: this.props.stepValue,
						alert: !this.state.isEndValid,
						className: (0, _helper.getClassName)(this.props.innerClass, 'input') || null,
						themePreset: themePreset
					}),
					!this.state.isEndValid && _react2.default.createElement(
						_Content2.default,
						{ alert: true },
						'Input range is invalid'
					)
				)
			)
		);
	};

	return RangeInput;
}(_react.Component);

RangeInput.defaultQuery = _RangeSlider2.default.defaultQuery;
RangeInput.parseValue = _RangeSlider2.default.parseValue;


RangeInput.propTypes = {
	className: _types2.default.string,
	defaultSelected: _types2.default.range,
	innerClass: _types2.default.style,
	onValueChange: _types2.default.func,
	range: _types2.default.range,
	stepValue: _types2.default.number,
	style: _types2.default.style,
	themePreset: _types2.default.themePreset
};

RangeInput.defaultProps = {
	range: {
		start: 0,
		end: 10
	},
	stepValue: 1
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		themePreset: state.config.themePreset
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, null)(RangeInput);