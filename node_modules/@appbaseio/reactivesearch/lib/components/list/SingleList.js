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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleList = function (_Component) {
	_inherits(SingleList, _Component);

	function SingleList(props) {
		_classCallCheck(this, SingleList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: '',
			options: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
			searchTerm: ''
		};
		_this.locked = false;
		_this.internalComponent = props.componentId + '__internal';
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	SingleList.prototype.componentWillMount = function componentWillMount() {
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

	SingleList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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

	SingleList.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	SingleList.generateQueryOptions = function generateQueryOptions(props) {
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

	SingleList.prototype.render = function render() {
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
					{ key: selectAllLabel, className: '' + (this.state.currentValue === selectAllLabel ? 'active' : '') },
					_react2.default.createElement(_FormControlList.Radio, {
						className: (0, _helper.getClassName)(this.props.innerClass, 'radio'),
						id: this.props.componentId + '-' + selectAllLabel,
						name: this.props.componentId,
						value: selectAllLabel,
						onClick: this.handleClick,
						readOnly: true,
						checked: this.state.currentValue === selectAllLabel,
						show: this.props.showRadio
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
						{ key: item.key, className: '' + (_this3.state.currentValue === String(item.key) ? 'active' : '') },
						_react2.default.createElement(_FormControlList.Radio, {
							className: (0, _helper.getClassName)(_this3.props.innerClass, 'radio'),
							id: _this3.props.componentId + '-' + item.key,
							name: _this3.props.componentId,
							value: item.key,
							readOnly: true,
							onClick: _this3.handleClick,
							checked: _this3.state.currentValue === String(item.key),
							show: _this3.props.showRadio
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

	return SingleList;
}(_react.Component);

SingleList.defaultQuery = function (value, props) {
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

	this.setValue = function (nextValue) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this4.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this4.locked) {
			return;
		}

		_this4.locked = true;
		var value = nextValue;
		if (nextValue === _this4.state.currentValue) {
			value = '';
		}

		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: value
			}, function () {
				_this4.updateQuery(value, props);
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(value);
			});
		};

		(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || SingleList.defaultQuery;

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
		var queryOptions = SingleList.generateQueryOptions(props);
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

SingleList.propTypes = {
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
	showRadio: _types2.default.boolRequired,
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

SingleList.defaultProps = {
	className: null,
	placeholder: 'Search',
	showCount: true,
	showFilter: true,
	showRadio: true,
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(SingleList);