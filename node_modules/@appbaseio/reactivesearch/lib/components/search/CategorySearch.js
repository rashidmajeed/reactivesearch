'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _emotionTheming = require('emotion-theming');

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _suggestions = require('@appbaseio/reactivecore/lib/utils/suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Input = require('../../styles/Input');

var _Input2 = _interopRequireDefault(_Input);

var _CancelSvg = require('../shared/CancelSvg');

var _CancelSvg2 = _interopRequireDefault(_CancelSvg);

var _SearchSvg = require('../shared/SearchSvg');

var _SearchSvg2 = _interopRequireDefault(_SearchSvg);

var _InputIcon = require('../../styles/InputIcon');

var _InputIcon2 = _interopRequireDefault(_InputIcon);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = (0, _emotionTheming.withTheme)(function (props) {
	return _react2.default.createElement(
		'span',
		{
			className: 'trim',
			style: {
				color: props.primary ? props.theme.colors.primaryColor : props.theme.colors.textColor
			}
		},
		props.children
	);
});

var CategorySearch = function (_Component) {
	_inherits(CategorySearch, _Component);

	function CategorySearch(props) {
		_classCallCheck(this, CategorySearch);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: '',
			suggestions: [],
			isOpen: false
		};
		_this.internalComponent = props.componentId + '__internal';
		_this.locked = false;
		_this.prevValue = '';
		_this.prevCategory = null;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	CategorySearch.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.props.addComponent(this.internalComponent);

		if (this.props.highlight) {
			var queryOptions = CategorySearch.highlightQuery(this.props) || {};
			queryOptions.size = 20;
			this.props.setQueryOptions(this.props.componentId, queryOptions);
		} else {
			this.props.setQueryOptions(this.props.componentId, {
				size: 20
			});
		}
		this.setReact(this.props);

		var aggsQuery = this.getAggsQuery(this.props.categoryField);
		this.props.setQueryOptions(this.internalComponent, aggsQuery, false);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected, true);
		}
	};

	CategorySearch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkSomePropChange)(this.props, nextProps, ['highlight', 'dataField', 'highlightField'], function () {
			var queryOptions = CategorySearch.highlightQuery(nextProps) || {};
			queryOptions.size = 20;
			_this2.props.setQueryOptions(nextProps.componentId, queryOptions);
		});

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			return _this2.setReact(nextProps);
		});

		if (Array.isArray(nextProps.suggestions) && this.state.currentValue.trim().length) {
			// shallow check allows us to set suggestions even if the next set
			// of suggestions are same as the current one
			if (this.props.suggestions !== nextProps.suggestions) {
				this.setState({
					suggestions: this.onSuggestions(nextProps.suggestions)
				});
			}
		}

		(0, _helper.checkSomePropChange)(this.props, nextProps, ['fieldWeights', 'fuzziness', 'queryFormat', 'dataField', 'categoryField'], function () {
			_this2.updateQuery(nextProps.componentId, _this2.state.currentValue, nextProps);
		});

		if (this.props.defaultSelected !== nextProps.defaultSelected) {
			this.setValue(nextProps.defaultSelected, true, nextProps);
		} else if (
		// since, selectedValue will be updated when currentValue changes,
		// we must only check for the changes introduced by
		// clear action from SelectedFilters component in which case,
		// the currentValue will never match the updated selectedValue
		this.props.selectedValue !== nextProps.selectedValue && this.state.currentValue !== nextProps.selectedValue) {
			this.setValue(nextProps.selectedValue || '', true, nextProps);
		}
	};

	CategorySearch.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	// only works if there's a change in downshift's value


	CategorySearch.prototype.render = function render() {
		var _this3 = this;

		var suggestionsList = [];
		var _props = this.props,
		    theme = _props.theme,
		    themePreset = _props.themePreset;


		if (!this.state.currentValue && this.props.defaultSuggestions && this.props.defaultSuggestions.length) {
			suggestionsList = this.props.defaultSuggestions;
		} else if (this.state.currentValue) {
			suggestionsList = this.state.suggestions;
		}

		if (this.state.currentValue && this.state.suggestions.length && this.props.categories && this.props.categories.length) {
			var categorySuggestions = [{
				label: this.state.currentValue + ' in all categories',
				value: this.state.currentValue,
				category: '*'
			}, {
				label: this.state.currentValue + ' in ' + this.props.categories[0].key,
				value: this.state.currentValue,
				category: this.props.categories[0].key
			}];

			if (this.props.categories.length > 1) {
				categorySuggestions = [].concat(categorySuggestions, [{
					label: this.state.currentValue + ' in ' + this.props.categories[1].key,
					value: this.state.currentValue,
					category: this.props.categories[1].key
				}]);
			}
			suggestionsList = [].concat(categorySuggestions, suggestionsList);
		}

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{
					className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null
				},
				this.props.title
			),
			this.props.autosuggest ? _react2.default.createElement(_downshift2.default, {
				id: this.props.componentId + '-downshift',
				onChange: this.onSuggestionSelected,
				onOuterClick: this.handleOuterClick,
				onStateChange: this.handleStateChange,
				isOpen: this.state.isOpen,
				itemToString: function itemToString(i) {
					return i;
				},
				render: function render(_ref) {
					var getInputProps = _ref.getInputProps,
					    getItemProps = _ref.getItemProps,
					    isOpen = _ref.isOpen,
					    highlightedIndex = _ref.highlightedIndex;
					return _react2.default.createElement(
						'div',
						{ className: _Input.suggestionsContainer },
						_react2.default.createElement(_Input2.default, _extends({
							showClear: _this3.props.showClear,
							id: _this3.props.componentId + '-input',
							showIcon: _this3.props.showIcon,
							iconPosition: _this3.props.iconPosition,
							innerRef: _this3.props.innerRef
						}, getInputProps({
							className: (0, _helper.getClassName)(_this3.props.innerClass, 'input'),
							placeholder: _this3.props.placeholder,
							value: _this3.state.currentValue === null ? '' : _this3.state.currentValue,
							onChange: _this3.onInputChange,
							onBlur: _this3.props.onBlur,
							onFocus: _this3.handleFocus,
							onKeyPress: _this3.props.onKeyPress,
							onKeyDown: function onKeyDown(e) {
								return _this3.handleKeyDown(e, highlightedIndex);
							},
							onKeyUp: _this3.props.onKeyUp
						}), {
							themePreset: themePreset
						})),
						_this3.renderIcons(),
						isOpen && suggestionsList.length ? _react2.default.createElement(
							'ul',
							{
								className: (0, _Input.suggestions)(themePreset, theme) + ' ' + (0, _helper.getClassName)(_this3.props.innerClass, 'list')
							},
							suggestionsList.slice(0, 10).map(function (item, index) {
								return _react2.default.createElement(
									'li',
									_extends({}, getItemProps({ item: item }), {
										key: index + 1 + '-' + item.value,
										style: {
											backgroundColor: _this3.getBackgroundColor(highlightedIndex, index)
										}
									}),
									_react2.default.createElement(
										Text,
										{ primary: !!item.category },
										item.label
									)
								);
							})
						) : null
					);
				}
			}) : _react2.default.createElement(
				'div',
				{ className: _Input.suggestionsContainer },
				_react2.default.createElement(_Input2.default, {
					className: (0, _helper.getClassName)(this.props.innerClass, 'input'),
					placeholder: this.props.placeholder,
					value: this.state.currentValue ? this.state.currentValue : '',
					onChange: this.onInputChange,
					onBlur: this.props.onBlur,
					onFocus: this.props.onFocus,
					onKeyPress: this.props.onKeyPress,
					onKeyDown: this.props.onKeyDown,
					onKeyUp: this.props.onKeyUp,
					autoFocus: this.props.autoFocus,
					iconPosition: this.props.iconPosition,
					showClear: this.props.showClear,
					showIcon: this.props.showIcon,
					innerRef: this.props.innerRef,
					themePreset: themePreset
				}),
				this.renderIcons()
			)
		);
	};

	return CategorySearch;
}(_react.Component);

CategorySearch.highlightQuery = function (props) {
	if (props.customHighlight) {
		return props.customHighlight(props);
	}
	if (!props.highlight) {
		return null;
	}
	var fields = {};
	var highlightField = props.highlightField ? props.highlightField : props.dataField;

	if (typeof highlightField === 'string') {
		fields[highlightField] = {};
	} else if (Array.isArray(highlightField)) {
		highlightField.forEach(function (item) {
			fields[item] = {};
		});
	}

	return {
		highlight: {
			pre_tags: ['<mark>'],
			post_tags: ['</mark>'],
			fields: fields
		}
	};
};

CategorySearch.defaultQuery = function (value, props, category) {
	var finalQuery = null;
	var fields = void 0;

	if (value) {
		if (Array.isArray(props.dataField)) {
			fields = props.dataField;
		} else {
			fields = [props.dataField];
		}
		finalQuery = {
			bool: Object.assign({
				should: CategorySearch.shouldQuery(value, fields, props),
				minimum_should_match: '1'
			}, props.defaultQuery && {
				must: props.defaultQuery(value, props)
			})
		};

		if (category && category !== '*') {
			var _term;

			finalQuery = [finalQuery, {
				term: (_term = {}, _term[props.categoryField] = category, _term)
			}];
		}
	}

	if (value === '') {
		finalQuery = {
			match_all: {}
		};
	}

	return finalQuery;
};

CategorySearch.shouldQuery = function (value, dataFields, props) {
	var fields = dataFields.map(function (field, index) {
		return '' + field + (Array.isArray(props.fieldWeights) && props.fieldWeights[index] ? '^' + props.fieldWeights[index] : '');
	});

	if (props.queryFormat === 'and') {
		return [{
			multi_match: {
				query: value,
				fields: fields,
				type: 'cross_fields',
				operator: 'and'
			}
		}, {
			multi_match: {
				query: value,
				fields: fields,
				type: 'phrase_prefix',
				operator: 'and'
			}
		}];
	}

	return [{
		multi_match: {
			query: value,
			fields: fields,
			type: 'best_fields',
			operator: 'or',
			fuzziness: props.fuzziness ? props.fuzziness : 0
		}
	}, {
		multi_match: {
			query: value,
			fields: fields,
			type: 'phrase_prefix',
			operator: 'or'
		}
	}];
};

var _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.getAggsQuery = function (field) {
		var _aggs;

		return {
			aggs: (_aggs = {}, _aggs[field] = {
				terms: {
					field: field
				}
			}, _aggs)
		};
	};

	this.setReact = function (props) {
		var react = props.react;

		if (react) {
			var newReact = (0, _helper.pushToAndClause)(react, _this4.internalComponent);
			props.watchComponent(props.componentId, newReact);
		} else {
			props.watchComponent(props.componentId, { and: _this4.internalComponent });
		}
	};

	this.onSuggestions = function (searchSuggestions) {
		if (_this4.props.onSuggestion) {
			return searchSuggestions.map(function (suggestion) {
				return _this4.props.onSuggestion(suggestion);
			});
		}

		var fields = Array.isArray(_this4.props.dataField) ? _this4.props.dataField : [_this4.props.dataField];

		return (0, _suggestions2.default)(fields, searchSuggestions, _this4.state.currentValue.toLowerCase());
	};

	this.setValue = function (value) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this4.props;
		var category = arguments[3];

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this4.locked) {
			return;
		}

		_this4.locked = true;
		var performUpdate = function performUpdate() {
			_this4.setState({
				currentValue: value
			}, function () {
				if (isDefaultValue) {
					if (_this4.props.autosuggest) {
						_this4.setState({
							isOpen: false
						});
						_this4.updateQuery(_this4.internalComponent, value, props);
					}
					_this4.updateQuery(props.componentId, value, props, category);
				} else {
					// debounce for handling text while typing
					_this4.handleTextChange(value);
				}
				_this4.locked = false;
				if (props.onValueChange) props.onValueChange(value);
			});
		};
		(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
	};

	this.handleTextChange = (0, _helper.debounce)(function (value) {
		if (_this4.props.autosuggest) {
			_this4.updateQuery(_this4.internalComponent, value, _this4.props);
		} else {
			_this4.updateQuery(_this4.props.componentId, value, _this4.props);
		}
	}, this.props.debounce);

	this.updateQuery = function (componentId, value, props, category) {
		var query = props.customQuery || CategorySearch.defaultQuery;

		props.updateQuery({
			componentId: componentId,
			query: query(value, props, category),
			value: value,
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};

	this.handleFocus = function (event) {
		_this4.setState({
			isOpen: true
		});
		if (_this4.props.onFocus) {
			_this4.props.onFocus(event);
		}
	};

	this.clearValue = function () {
		_this4.setValue('', true);
		_this4.onValueSelected(null);
	};

	this.handleOuterClick = function () {
		_this4.setValue(_this4.state.currentValue, true);
		_this4.onValueSelected();
	};

	this.handleKeyDown = function (event, highlightedIndex) {
		// if a suggestion was selected, delegate the handling to suggestion handler
		if (event.key === 'Enter' && highlightedIndex === null) {
			_this4.setValue(event.target.value, true);
			_this4.onValueSelected(event.target.value);
		}
		if (_this4.props.onKeyDown) {
			_this4.props.onKeyDown(event);
		}
	};

	this.onInputChange = function (e) {
		var value = e.target.value;

		if (!_this4.state.isOpen) {
			_this4.setState({
				isOpen: true
			});
		}
		if (value.trim() !== _this4.state.currentValue.trim()) {
			_this4.setState({
				suggestions: []
			}, function () {
				_this4.setValue(value);
			});
		} else {
			_this4.setValue(value);
		}
	};

	this.onSuggestionSelected = function (suggestion, event) {
		_this4.setValue(suggestion.value, true, _this4.props, suggestion.category);
		_this4.onValueSelected(suggestion.value, suggestion.category);
		if (_this4.props.onBlur) {
			_this4.props.onBlur(event);
		}
	};

	this.onValueSelected = function () {
		var currentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.state.currentValue;
		var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var onValueSelected = _this4.props.onValueSelected;
		// check if either the previous value or the category has changed when the user clicks outside

		if (onValueSelected && (_this4.prevValue !== currentValue || _this4.prevCategory !== category)) {
			onValueSelected(currentValue, category);
			_this4.prevValue = currentValue;
		}
	};

	this.handleStateChange = function (changes) {
		var isOpen = changes.isOpen,
		    type = changes.type;

		if (type === _downshift2.default.stateChangeTypes.mouseUp) {
			_this4.setState({
				isOpen: isOpen
			});
		}
	};

	this.getBackgroundColor = function (highlightedIndex, index) {
		var isDark = _this4.props.themePreset === 'dark';
		if (isDark) {
			return highlightedIndex === index ? '#555' : '#424242';
		}
		return highlightedIndex === index ? '#eee' : '#fff';
	};

	this.renderIcon = function () {
		if (_this4.props.showIcon) {
			return _this4.props.icon || _react2.default.createElement(_SearchSvg2.default, null);
		}
		return null;
	};

	this.renderCancelIcon = function () {
		if (_this4.props.showClear) {
			return _this4.props.clearIcon || _react2.default.createElement(_CancelSvg2.default, null);
		}
		return null;
	};

	this.renderIcons = function () {
		return _react2.default.createElement(
			'div',
			null,
			_this4.state.currentValue && _this4.props.showClear && _react2.default.createElement(
				_InputIcon2.default,
				{
					onClick: _this4.clearValue,
					iconPosition: 'right',
					clearIcon: _this4.props.iconPosition === 'right'
				},
				_this4.renderCancelIcon()
			),
			_react2.default.createElement(
				_InputIcon2.default,
				{ iconPosition: _this4.props.iconPosition },
				_this4.renderIcon()
			)
		);
	};
};

CategorySearch.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	setQueryOptions: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	options: _types2.default.options,
	categories: _types2.default.data,
	selectedValue: _types2.default.selectedValue,
	suggestions: _types2.default.suggestions,
	// component props
	autoFocus: _types2.default.bool,
	autosuggest: _types2.default.bool,
	beforeValueChange: _types2.default.func,
	categoryField: _types2.default.string,
	className: _types2.default.string,
	clearIcon: _types2.default.children,
	componentId: _types2.default.stringRequired,
	customHighlight: _types2.default.func,
	customQuery: _types2.default.func,
	dataField: _types2.default.dataFieldArray,
	debounce: _types2.default.number,
	defaultSelected: _types2.default.string,
	defaultSuggestions: _types2.default.suggestions,
	fieldWeights: _types2.default.fieldWeights,
	filterLabel: _types2.default.string,
	fuzziness: _types2.default.fuzziness,
	highlight: _types2.default.bool,
	highlightField: _types2.default.stringOrArray,
	icon: _types2.default.children,
	iconPosition: _types2.default.iconPosition,
	innerClass: _types2.default.style,
	innerRef: _types2.default.func,
	onBlur: _types2.default.func,
	onFocus: _types2.default.func,
	onKeyDown: _types2.default.func,
	onKeyPress: _types2.default.func,
	onKeyUp: _types2.default.func,
	onQueryChange: _types2.default.func,
	onSuggestion: _types2.default.func,
	onValueChange: _types2.default.func,
	onValueSelected: _types2.default.func,
	placeholder: _types2.default.string,
	queryFormat: _types2.default.queryFormatSearch,
	react: _types2.default.react,
	showClear: _types2.default.bool,
	showFilter: _types2.default.bool,
	showIcon: _types2.default.bool,
	style: _types2.default.style,
	title: _types2.default.title,
	theme: _types2.default.style,
	themePreset: _types2.default.themePreset,
	URLParams: _types2.default.bool
};

CategorySearch.defaultProps = {
	autosuggest: true,
	className: null,
	debounce: 0,
	iconPosition: 'left',
	placeholder: 'Search',
	queryFormat: 'or',
	showClear: false,
	showFilter: true,
	showIcon: true,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		categories: state.aggregations[props.componentId] && state.aggregations[props.componentId][props.categoryField] && state.aggregations[props.componentId][props.categoryField].buckets || [],
		selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
		suggestions: state.hits[props.componentId] && state.hits[props.componentId].hits || [],
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)((0, _emotionTheming.withTheme)(CategorySearch));