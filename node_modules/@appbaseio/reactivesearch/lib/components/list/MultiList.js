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

var _Input = require('../../styles/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _FormControlList = require('../../styles/FormControlList');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiList = function (_Component) {
	_inherits(MultiList, _Component);

	function MultiList(props) {
		_classCallCheck(this, MultiList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: {},
			options: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
			searchTerm: ''
		};
		_this.locked = false;
		_this.internalComponent = props.componentId + '__internal';
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	MultiList.prototype.componentWillMount = function componentWillMount() {
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

	MultiList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

		if (this.props.selectAllLabel) {
			selectedValue = selectedValue.filter(function (val) {
				return val !== _this2.props.selectAllLabel;
			});

			if (this.state.currentValue[this.props.selectAllLabel]) {
				selectedValue = [this.props.selectAllLabel];
			}
		}
		if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
			this.setValue(nextProps.defaultSelected, true);
		} else if (!(0, _helper.isEqual)(selectedValue, nextProps.selectedValue)) {
			this.setValue(nextProps.selectedValue || [], true);
		}
	};

	MultiList.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	MultiList.generateQueryOptions = function generateQueryOptions(props) {
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

	MultiList.prototype.render = function render() {
		var _this3 = this;

		var _props = this.props,
		    selectAllLabel = _props.selectAllLabel,
		    renderListItem = _props.renderListItem;


		if (this.state.options.length === 0) {
			return null;
		}

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			this.renderSearch(),
			_react2.default.createElement(
				_FormControlList.UL,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'list') || null },
				selectAllLabel ? _react2.default.createElement(
					'li',
					{ key: selectAllLabel, className: '' + (this.state.currentValue[selectAllLabel] ? 'active' : '') },
					_react2.default.createElement(_FormControlList.Checkbox, {
						className: (0, _helper.getClassName)(this.props.innerClass, 'checkbox') || null,
						id: this.props.componentId + '-' + selectAllLabel,
						name: selectAllLabel,
						value: selectAllLabel,
						onChange: this.handleClick,
						checked: !!this.state.currentValue[selectAllLabel],
						show: this.props.showCheckbox
					}),
					_react2.default.createElement(
						'label',
						{
							className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null,
							htmlFor: this.props.componentId + '-' + selectAllLabel
						},
						selectAllLabel
					)
				) : null,
				this.state.options.filter(function (item) {
					if (String(item.key).length) {
						if (_this3.props.showSearch && _this3.state.searchTerm) {
							return String(item.key).toLowerCase().includes(_this3.state.searchTerm.toLowerCase());
						}
						return true;
					}
					return false;
				}).map(function (item) {
					return _react2.default.createElement(
						'li',
						{ key: item.key, className: '' + (_this3.state.currentValue[item.key] ? 'active' : '') },
						_react2.default.createElement(_FormControlList.Checkbox, {
							className: (0, _helper.getClassName)(_this3.props.innerClass, 'checkbox') || null,
							id: _this3.props.componentId + '-' + item.key,
							name: _this3.props.componentId,
							value: item.key,
							onChange: _this3.handleClick,
							checked: !!_this3.state.currentValue[item.key],
							show: _this3.props.showCheckbox
						}),
						_react2.default.createElement(
							'label',
							{
								className: (0, _helper.getClassName)(_this3.props.innerClass, 'label') || null,
								htmlFor: _this3.props.componentId + '-' + item.key
							},
							renderListItem ? renderListItem(item.key, item.doc_count) : _react2.default.createElement(
								'span',
								null,
								item.key,
								_this3.props.showCount && _react2.default.createElement(
									'span',
									{
										className: (0, _helper.getClassName)(_this3.props.innerClass, 'count') || null
									},
									'\xA0(',
									item.doc_count,
									')'
								)
							)
						)
					);
				})
			)
		);
	};

	return MultiList;
}(_react.Component);

MultiList.defaultQuery = function (value, props) {
	var query = null;
	var type = props.queryFormat === 'or' ? 'terms' : 'term';

	if (!Array.isArray(value) || value.length === 0) {
		return null;
	}

	if (props.selectAllLabel && value.includes(props.selectAllLabel)) {
		if (props.showMissing) {
			query = { match_all: {} };
		} else {
			query = {
				exists: {
					field: props.dataField
				}
			};
		}
	} else if (value) {
		var listQuery = void 0;
		if (props.queryFormat === 'or') {
			if (props.showMissing) {
				var _type, _ref;

				var hasMissingTerm = value.includes(props.missingLabel);
				var should = [(_ref = {}, _ref[type] = (_type = {}, _type[props.dataField] = value.filter(function (item) {
					return item !== props.missingLabel;
				}), _type), _ref)];
				if (hasMissingTerm) {
					should = should.concat({
						bool: {
							must_not: {
								exists: { field: props.dataField }
							}
						}
					});
				}
				listQuery = {
					bool: {
						should: should
					}
				};
			} else {
				var _type2, _listQuery;

				listQuery = (_listQuery = {}, _listQuery[type] = (_type2 = {}, _type2[props.dataField] = value, _type2), _listQuery);
			}
		} else {
			// adds a sub-query with must as an array of objects for each term/value
			var queryArray = value.map(function (item) {
				var _type3, _ref2;

				return _ref2 = {}, _ref2[type] = (_type3 = {}, _type3[props.dataField] = item, _type3), _ref2;
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
		var selectAllLabel = _this4.props.selectAllLabel;
		var currentValue = _this4.state.currentValue;

		var finalValues = null;

		if (selectAllLabel && (Array.isArray(value) && value.includes(selectAllLabel) || typeof value === 'string' && value === selectAllLabel)) {
			if (currentValue[selectAllLabel]) {
				currentValue = {};
				finalValues = [];
			} else {
				_this4.state.options.forEach(function (item) {
					currentValue[item.key] = true;
				});
				currentValue[selectAllLabel] = true;
				finalValues = [selectAllLabel];
			}
		} else if (isDefaultValue) {
			finalValues = value;
			currentValue = {};
			if (value) {
				value.forEach(function (item) {
					currentValue[item] = true;
				});
			}

			if (selectAllLabel && selectAllLabel in currentValue) {
				var _currentValue = currentValue,
				    del = _currentValue[selectAllLabel],
				    obj = _objectWithoutProperties(_currentValue, [selectAllLabel]);

				currentValue = _extends({}, obj);
			}
		} else {
			if (currentValue[value]) {
				var _currentValue2 = currentValue,
				    _del = _currentValue2[value],
				    rest = _objectWithoutProperties(_currentValue2, [value]);

				currentValue = _extends({}, rest);
			} else {
				currentValue[value] = true;
			}

			if (selectAllLabel && selectAllLabel in currentValue) {
				var _currentValue3 = currentValue,
				    _del2 = _currentValue3[selectAllLabel],
				    _obj = _objectWithoutProperties(_currentValue3, [selectAllLabel]);

				currentValue = _extends({}, _obj);
			}
			finalValues = Object.keys(currentValue);
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
		var query = props.customQuery || MultiList.defaultQuery;

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
		var queryOptions = MultiList.generateQueryOptions(props);
		props.setQueryOptions(_this4.internalComponent, queryOptions);
	};

	this.handleInputChange = function (e) {
		var value = e.target.value;

		_this4.setState({
			searchTerm: value
		});
	};

	this.renderSearch = function () {
		if (_this4.props.showSearch) {
			return _react2.default.createElement(_Input2.default, {
				className: (0, _helper.getClassName)(_this4.props.innerClass, 'input') || null,
				onChange: _this4.handleInputChange,
				value: _this4.state.searchTerm,
				placeholder: _this4.props.placeholder,
				style: {
					margin: '0 0 8px'
				},
				themePreset: _this4.props.themePreset
			});
		}
		return null;
	};

	this.handleClick = function (e) {
		_this4.setValue(e.target.value);
	};
};

MultiList.propTypes = {
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
	defaultSelected: _types2.default.stringArray,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	placeholder: _types2.default.string,
	queryFormat: _types2.default.queryFormatSearch,
	react: _types2.default.react,
	renderListItem: _types2.default.func,
	selectAllLabel: _types2.default.string,
	showCheckbox: _types2.default.boolRequired,
	showCount: _types2.default.bool,
	showSearch: _types2.default.bool,
	size: _types2.default.number,
	sortBy: _types2.default.sortByWithCount,
	style: _types2.default.style,
	themePreset: _types2.default.themePreset,
	title: _types2.default.title,
	URLParams: _types2.default.bool,
	showMissing: _types2.default.bool,
	missingLabel: _types2.default.string
};

MultiList.defaultProps = {
	className: null,
	placeholder: 'Search',
	queryFormat: 'or',
	showCheckbox: true,
	showCount: true,
	showSearch: true,
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
		selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(MultiList);