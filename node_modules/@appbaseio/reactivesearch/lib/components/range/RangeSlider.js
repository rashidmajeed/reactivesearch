'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Slider = require('rheostat/lib/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _HistogramContainer = require('./addons/HistogramContainer');

var _HistogramContainer2 = _interopRequireDefault(_HistogramContainer);

var _RangeLabel = require('./addons/RangeLabel');

var _RangeLabel2 = _interopRequireDefault(_RangeLabel);

var _Slider3 = require('../../styles/Slider');

var _Slider4 = _interopRequireDefault(_Slider3);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Label = require('../../styles/Label');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeSlider = function (_Component) {
	_inherits(RangeSlider, _Component);

	function RangeSlider(props) {
		_classCallCheck(this, RangeSlider);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: [props.range.start, props.range.end],
			stats: []
		};

		_this.locked = false;
		_this.internalComponent = _this.props.componentId + '__internal';
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	RangeSlider.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.props.addComponent(this.internalComponent);

		this.updateQueryOptions(this.props);
		this.setReact(this.props);

		var _props = this.props,
		    selectedValue = _props.selectedValue,
		    defaultSelected = _props.defaultSelected;

		if (Array.isArray(selectedValue)) {
			this.handleChange(selectedValue);
		} else if (selectedValue) {
			// for value as an object for SSR
			this.handleChange(RangeSlider.parseValue(selectedValue, this.props));
		} else if (defaultSelected) {
			this.handleChange(RangeSlider.parseValue(defaultSelected, this.props));
		}
	};

	RangeSlider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});
		(0, _helper.checkSomePropChange)(this.props, nextProps, ['showHistogram', 'interval'], function () {
			return _this2.updateQueryOptions(nextProps);
		});
		(0, _helper.checkPropChange)(this.props.options, nextProps.options, function () {
			var options = nextProps.options;

			if (Array.isArray(options)) {
				options.sort(function (a, b) {
					if (a.key < b.key) return -1;
					if (a.key > b.key) return 1;
					return 0;
				});
			}
			_this2.setState({
				stats: options || []
			});
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQueryOptions(nextProps);
			_this2.handleChange(_this2.state.currentValue, nextProps);
		});

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.handleChange([nextProps.defaultSelected.start, nextProps.defaultSelected.end], nextProps);
		} else if (!(0, _helper.isEqual)(this.state.currentValue, nextProps.selectedValue)) {
			this.handleChange(nextProps.selectedValue || [nextProps.range.start, nextProps.range.end]);
		}
	};

	RangeSlider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
		var upperLimit = Math.floor((nextProps.range.end - nextProps.range.start) / 2);
		if (nextProps.stepValue < 1 || nextProps.stepValue > upperLimit) {
			console.warn('stepValue for RangeSlider ' + nextProps.componentId + ' should be greater than 0 and less than or equal to ' + upperLimit);
			return false;
		}
		return true;
	};

	RangeSlider.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	RangeSlider.prototype.render = function render() {
		return _react2.default.createElement(
			_Slider4.default,
			{ primary: true, style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{
					className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null
				},
				this.props.title
			),
			this.state.stats.length && this.props.showHistogram && this.props.showSlider ? _react2.default.createElement(_HistogramContainer2.default, {
				stats: this.state.stats,
				range: this.props.range,
				interval: this.getValidInterval(this.props)
			}) : null,
			this.props.showSlider && _react2.default.createElement(_Slider2.default, {
				min: this.props.range.start,
				max: this.props.range.end,
				values: this.state.currentValue,
				onChange: this.handleSlider,
				onValuesUpdated: this.handleDrag,
				snap: this.props.snap,
				snapPoints: this.props.snap ? this.getSnapPoints() : null,
				className: (0, _helper.getClassName)(this.props.innerClass, 'slider')
			}),
			this.props.rangeLabels && this.props.showSlider && _react2.default.createElement(
				'div',
				{ className: _Label.rangeLabelsContainer },
				_react2.default.createElement(
					_RangeLabel2.default,
					{
						align: 'left',
						className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null
					},
					this.props.rangeLabels.start
				),
				_react2.default.createElement(
					_RangeLabel2.default,
					{
						align: 'right',
						className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null
					},
					this.props.rangeLabels.end
				)
			)
		);
	};

	return RangeSlider;
}(_react.Component);

RangeSlider.parseValue = function (value, props) {
	return value ? [value.start, value.end] : [props.range.start, props.range.end];
};

RangeSlider.defaultQuery = function (value, props) {
	if (Array.isArray(value) && value.length) {
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
	var _this3 = this;

	this.setReact = function (props) {
		var react = props.react;

		if (react) {
			var newReact = (0, _helper.pushToAndClause)(react, _this3.internalComponent);
			props.watchComponent(props.componentId, newReact);
		} else {
			props.watchComponent(props.componentId, { and: _this3.internalComponent });
		}
	};

	this.getSnapPoints = function () {
		var snapPoints = [];
		var stepValue = _this3.props.stepValue;

		// limit the number of steps to prevent generating a large number of snapPoints

		if ((_this3.props.range.end - _this3.props.range.start) / stepValue > 100) {
			stepValue = (_this3.props.range.end - _this3.props.range.start) / 100;
		}

		for (var i = _this3.props.range.start; i <= _this3.props.range.end; i += stepValue) {
			snapPoints = snapPoints.concat(i);
		}
		if (snapPoints[snapPoints.length - 1] !== _this3.props.range.end) {
			snapPoints = snapPoints.concat(_this3.props.range.end);
		}
		return snapPoints;
	};

	this.getValidInterval = function (props) {
		var min = Math.ceil((props.range.end - props.range.start) / 100) || 1;
		if (!props.interval) {
			return min;
		} else if (props.interval < min) {
			console.error(props.componentId + ': interval prop\'s value should be greater than or equal to ' + min);
			return min;
		}
		return props.interval;
	};

	this.histogramQuery = function (props) {
		var _ref;

		return _ref = {}, _ref[props.dataField] = {
			histogram: {
				field: props.dataField,
				interval: _this3.getValidInterval(props),
				offset: props.range.start
			}
		}, _ref;
	};

	this.handleChange = function (currentValue) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this3.locked) {
			return;
		}

		_this3.locked = true;
		var performUpdate = function performUpdate() {
			_this3.setState({
				currentValue: currentValue
			}, function () {
				_this3.updateQuery([currentValue[0], currentValue[1]], props);
				_this3.locked = false;
				if (props.onValueChange) {
					props.onValueChange({
						start: currentValue[0],
						end: currentValue[1]
					});
				}
			});
		};
		(0, _helper.checkValueChange)(props.componentId, {
			start: currentValue[0],
			end: currentValue[1]
		}, props.beforeValueChange, performUpdate);
	};

	this.handleSlider = function (_ref2) {
		var values = _ref2.values;

		if (!(0, _helper.isEqual)(values, _this3.state.currentValue)) {
			_this3.handleChange(values);
		}
	};

	this.handleDrag = function (values) {
		if (_this3.props.onDrag) {
			var min = values.min,
			    max = values.max,
			    currentValue = values.values;

			_this3.props.onDrag(currentValue, [min, max]);
		}
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || RangeSlider.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: false, // disable filters for RangeSlider
			URLParams: props.URLParams
		});
	};

	this.updateQueryOptions = function (props) {
		if (props.showHistogram) {
			var queryOptions = {
				aggs: _this3.histogramQuery(props)
			};

			props.setQueryOptions(_this3.internalComponent, queryOptions, false);

			var query = props.customQuery || RangeSlider.defaultQuery;

			props.updateQuery({
				componentId: _this3.internalComponent,
				query: query([props.range.start, props.range.end], props)
			});
		}
	};
};

RangeSlider.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	setQueryOptions: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	options: _types2.default.options,
	selectedValue: _types2.default.selectedValue,
	// component props
	beforeValueChange: _types2.default.func,
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	customQuery: _types2.default.func,
	dataField: _types2.default.stringRequired,
	defaultSelected: _types2.default.range,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	interval: _types2.default.number,
	onDrag: _types2.default.func,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	range: _types2.default.range,
	rangeLabels: _types2.default.rangeLabels,
	react: _types2.default.react,
	showHistogram: _types2.default.bool,
	showSlider: _types2.default.bool,
	snap: _types2.default.bool,
	stepValue: _types2.default.number,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

RangeSlider.defaultProps = {
	className: null,
	range: {
		start: 0,
		end: 10
	},
	showHistogram: true,
	showSlider: true,
	snap: true,
	stepValue: 1,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		options: state.aggregations[props.componentId] ? state.aggregations[props.componentId][props.dataField] && state.aggregations[props.componentId][props.dataField].buckets : [],
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
		setQueryOptions: function setQueryOptions(component, props, execute) {
			return dispatch((0, _actions.setQueryOptions)(component, props, execute));
		},
		setQueryListener: function setQueryListener(component, onQueryChange, beforeQueryChange) {
			return dispatch((0, _actions.setQueryListener)(component, onQueryChange, beforeQueryChange));
		},
		updateQuery: function updateQuery(updateQueryObject) {
			return dispatch((0, _actions.updateQuery)(updateQueryObject));
		},
		watchComponent: function watchComponent(component, react) {
			return dispatch((0, _actions.watchComponent)(component, react));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(RangeSlider);