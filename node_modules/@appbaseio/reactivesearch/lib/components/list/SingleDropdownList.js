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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleDropdownList = function (_Component) {
	_inherits(SingleDropdownList, _Component);

	function SingleDropdownList(props) {
		_classCallCheck(this, SingleDropdownList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: '',
			options: []
		};
		_this.locked = false;
		_this.internalComponent = props.componentId + '__internal';
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	SingleDropdownList.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.internalComponent);
		this.props.addComponent(this.props.componentId);
		this.updateQueryOptions(this.props);

		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected);
		}
	};

	SingleDropdownList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});
		(0, _helper.checkPropChange)(this.props.options, nextProps.options, function () {
			_this2.setState({
				options: nextProps.options[nextProps.dataField] ? nextProps.options[nextProps.dataField].buckets : []
			});
		});
		(0, _helper.checkSomePropChange)(this.props, nextProps, ['size', 'sortBy'], function () {
			return _this2.updateQueryOptions(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQueryOptions(nextProps);
			_this2.updateQuery(_this2.state.currentValue, nextProps);
		});

		if (this.props.defaultSelected !== nextProps.defaultSelected) {
			this.setValue(nextProps.defaultSelected);
		} else if (this.state.currentValue !== nextProps.selectedValue) {
			this.setValue(nextProps.selectedValue || '');
		}
	};

	SingleDropdownList.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	SingleDropdownList.generateQueryOptions = function generateQueryOptions(props) {
		var _queryOptions$aggs;

		var queryOptions = (0, _helper.getQueryOptions)(props);
		queryOptions.aggs = (_queryOptions$aggs = {}, _queryOptions$aggs[props.dataField] = {
			terms: _extends({
				field: props.dataField,
				size: props.size,
				order: (0, _helper.getAggsOrder)(props.sortBy || 'count')
			}, props.showMissing ? { missing: props.missingLabel } : {})
		}, _queryOptions$aggs);
		return queryOptions;
	};

	SingleDropdownList.prototype.render = function render() {
		var selectAll = [];

		if (this.state.options.length === 0) {
			return null;
		}

		if (this.props.selectAllLabel) {
			selectAll = [{
				key: this.props.selectAllLabel
			}];
		}

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
				items: [].concat(selectAll, this.state.options.filter(function (item) {
					return String(item.key).trim().length;
				}).map(function (item) {
					return _extends({}, item, { key: String(item.key) });
				})),
				onChange: this.setValue,
				selectedItem: this.state.currentValue,
				placeholder: this.props.placeholder,
				labelField: 'key',
				showCount: this.props.showCount,
				themePreset: this.props.themePreset,
				renderListItem: this.props.renderListItem
			})
		);
	};

	return SingleDropdownList;
}(_react.Component);

SingleDropdownList.defaultQuery = function (value, props) {
	if (props.selectAllLabel && props.selectAllLabel === value) {
		if (props.showMissing) {
			return { match_all: {} };
		}
		return {
			exists: {
				field: props.dataField
			}
		};
	} else if (value) {
		var _term;

		if (props.showMissing && props.missingLabel === value) {
			return {
				bool: {
					must_not: {
						exists: { field: props.dataField }
					}
				}
			};
		}
		return {
			term: (_term = {}, _term[props.dataField] = value, _term)
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
		var query = props.customQuery || SingleDropdownList.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};

	this.updateQueryOptions = function (props) {
		var queryOptions = SingleDropdownList.generateQueryOptions(props);
		props.setQueryOptions(_this3.internalComponent, queryOptions);
	};
};

SingleDropdownList.propTypes = {
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
	defaultSelected: _types2.default.string,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	placeholder: _types2.default.string,
	react: _types2.default.react,
	renderListItem: _types2.default.func,
	selectAllLabel: _types2.default.string,
	showCount: _types2.default.bool,
	showFilter: _types2.default.bool,
	size: _types2.default.number,
	sortBy: _types2.default.sortByWithCount,
	style: _types2.default.style,
	title: _types2.default.title,
	themePreset: _types2.default.themePreset,
	URLParams: _types2.default.bool,
	showMissing: _types2.default.bool,
	missingLabel: _types2.default.string
};

SingleDropdownList.defaultProps = {
	className: null,
	placeholder: 'Select a value',
	showCount: true,
	showFilter: true,
	size: 100,
	sortBy: 'count',
	style: {},
	URLParams: false,
	showMissing: false,
	missingLabel: 'N/A'
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		options: state.aggregations[props.componentId],
		selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || '',
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
		setQueryOptions: function setQueryOptions(component, props) {
			return dispatch((0, _actions.setQueryOptions)(component, props));
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(SingleDropdownList);