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

var _TagList = require('../../styles/TagList');

var _TagList2 = _interopRequireDefault(_TagList);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagCloud = function (_Component) {
	_inherits(TagCloud, _Component);

	function TagCloud(props) {
		_classCallCheck(this, TagCloud);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: {},
			options: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : []
		};
		_this.locked = false;
		_this.type = 'term';
		_this.internalComponent = props.componentId + '__internal';
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	TagCloud.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.internalComponent);
		this.props.addComponent(this.props.componentId);
		this.updateQueryOptions(this.props);

		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected, true);
		}
	};

	TagCloud.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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
			_this2.updateQuery(Object.keys(_this2.state.currentValue), nextProps);
		});

		var selectedValue = Object.keys(this.state.currentValue);

		if (!nextProps.multiSelect) {
			selectedValue = selectedValue.length && selectedValue[0] || '';
		}

		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.setValue(nextProps.defaultSelected, true, nextProps);
		} else if (!(0, _helper.isEqual)(selectedValue, nextProps.selectedValue)) {
			this.setValue(nextProps.selectedValue, true, nextProps);
		}
	};

	TagCloud.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	TagCloud.generateQueryOptions = function generateQueryOptions(props) {
		var _queryOptions$aggs;

		var queryOptions = (0, _helper.getQueryOptions)(props);
		queryOptions.aggs = (_queryOptions$aggs = {}, _queryOptions$aggs[props.dataField] = {
			terms: {
				field: props.dataField,
				size: props.size,
				order: (0, _helper.getAggsOrder)(props.sortBy || 'asc')
			}
		}, _queryOptions$aggs);

		return queryOptions;
	};

	TagCloud.prototype.render = function render() {
		var _this3 = this;

		var min = 0.8;
		var max = 3;

		if (this.state.options.length === 0) {
			return null;
		}

		var highestCount = 0;
		this.state.options.forEach(function (item) {
			highestCount = item.doc_count > highestCount ? item.doc_count : highestCount;
		});

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			_react2.default.createElement(
				_TagList2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'list') || null },
				this.state.options.map(function (item) {
					var size = item.doc_count / highestCount * (max - min) + min;

					return _react2.default.createElement(
						'span',
						{
							key: item.key,
							onClick: function onClick() {
								return _this3.setValue(item.key);
							},
							onKeyPress: function onKeyPress(e) {
								return (0, _helper.handleA11yAction)(e, function () {
									return _this3.setValue(item.key);
								});
							},
							style: { fontSize: size + 'em' },
							className: _this3.state.currentValue[item.key] ? ((0, _helper.getClassName)(_this3.props.innerClass, 'input') || '') + ' active' : (0, _helper.getClassName)(_this3.props.innerClass, 'input'),
							role: 'menuitem',
							tabIndex: '0'
						},
						item.key,
						_this3.props.showCount && ' (' + item.doc_count + ')'
					);
				})
			)
		);
	};

	return TagCloud;
}(_react.Component);

TagCloud.defaultQuery = function (value, props) {
	var query = null;
	var type = props.queryFormat === 'or' ? 'terms' : 'term';
	type = props.multiSelect ? type : 'term';
	if (value) {
		var listQuery = void 0;
		if (!props.multiSelect || props.queryFormat === 'or') {
			var _type, _listQuery;

			listQuery = (_listQuery = {}, _listQuery[type] = (_type = {}, _type[props.dataField] = value, _type), _listQuery);
		} else {
			// adds a sub-query with must as an array of objects for each term/value
			var queryArray = value.map(function (item) {
				var _type2, _ref;

				return _ref = {}, _ref[type] = (_type2 = {}, _type2[props.dataField] = item, _type2), _ref;
			});
			listQuery = {
				bool: {
					must: queryArray
				}
			};
		}

		query = value.length ? listQuery : null;
	}
	return query;
};

var _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.setReact = function (props) {
		var react = props.react;

		if (react) {
			var newReact = (0, _helper.pushToAndClause)(react, _this4.internalComponent);
			props.watchComponent(props.componentId, newReact);
		} else {
			props.watchComponent(props.componentId, { and: _this4.internalComponent });
		}
	};

	this.setValue = function (value) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this4.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this4.locked) {
			return;
		}

		_this4.locked = true;
		var currentValue = _this4.state.currentValue;

		var finalValues = null;

		if (props.multiSelect) {
			if (isDefaultValue) {
				finalValues = value;
				currentValue = {};
				if (value) {
					value.forEach(function (item) {
						currentValue[item] = true;
					});
				}
			} else {
				if (currentValue[value]) {
					var _currentValue = currentValue,
					    del = _currentValue[value],
					    rest = _objectWithoutProperties(_currentValue, [value]);

					currentValue = _extends({}, rest);
				} else {
					currentValue[value] = true;
				}
				finalValues = Object.keys(currentValue);
			}
		} else {
			var _currentValue2;

			currentValue = (_currentValue2 = {}, _currentValue2[value] = true, _currentValue2);
			finalValues = value;
		}

		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: currentValue
			}, function () {
				_this4.updateQuery(finalValues, props);
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(finalValues);
			});
		};

		(0, _helper.checkValueChange)(props.componentId, finalValues, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || TagCloud.defaultQuery;

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
		var queryOptions = TagCloud.generateQueryOptions(props);
		props.setQueryOptions(_this4.internalComponent, queryOptions);
	};
};

TagCloud.propTypes = {
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
	defaultSelected: _types2.default.stringOrArray,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	multiSelect: _types2.default.bool,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	queryFormat: _types2.default.queryFormatSearch,
	react: _types2.default.react,
	showCount: _types2.default.bool,
	showFilter: _types2.default.bool,
	size: _types2.default.number,
	sortBy: _types2.default.sortByWithCount,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

TagCloud.defaultProps = {
	className: null,
	multiSelect: false,
	queryFormat: 'or',
	showFilter: true,
	size: 100,
	sortBy: 'asc',
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		options: state.aggregations[props.componentId],
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(TagCloud);