'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Input = require('../../styles/Input');

var _Input2 = _interopRequireDefault(_Input);

var _InputIcon = require('../../styles/InputIcon');

var _InputIcon2 = _interopRequireDefault(_InputIcon);

var _CancelSvg = require('../shared/CancelSvg');

var _CancelSvg2 = _interopRequireDefault(_CancelSvg);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField = function (_Component) {
	_inherits(TextField, _Component);

	function TextField(props) {
		_classCallCheck(this, TextField);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: props.selectedValue || ''
		};
		_this.locked = false;
		props.setQueryListener(props.componentId, props.onQueryChange, null);
		return _this;
	}

	TextField.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);

		if (this.props.selectedValue) {
			this.setValue(this.props.selectedValue, true);
		} else if (this.props.defaultSelected) {
			this.setValue(this.props.defaultSelected, true);
		}
	};

	TextField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			_this2.setReact(nextProps);
		});

		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateQuery(_this2.state.currentValue, nextProps);
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

	TextField.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	TextField.prototype.setReact = function setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	};

	TextField.prototype.render = function render() {
		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{ className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null },
				this.props.title
			),
			_react2.default.createElement(
				'div',
				{ className: _Input.suggestionsContainer },
				_react2.default.createElement(_Input2.default, {
					type: 'text',
					className: (0, _helper.getClassName)(this.props.innerClass, 'input') || null,
					placeholder: this.props.placeholder,
					onChange: this.handleChange,
					value: this.state.currentValue,
					onBlur: this.props.onBlur,
					onFocus: this.props.onFocus,
					onKeyPress: this.props.onKeyPress,
					onKeyDown: this.props.onKeyDown,
					onKeyUp: this.props.onKeyUp,
					autoFocus: this.props.autoFocus,
					innerRef: this.props.innerRef,
					themePreset: this.props.themePreset,
					showClear: this.props.showClear
				}),
				this.renderIcons()
			)
		);
	};

	return TextField;
}(_react.Component);

TextField.defaultQuery = function (value, props) {
	if (value && value.trim() !== '') {
		var _match;

		return {
			match: (_match = {}, _match[props.dataField] = value, _match)
		};
	}
	return null;
};

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.handleTextChange = (0, _helper.debounce)(function (value) {
		_this3.updateQuery(value, _this3.props);
	}, this.props.debounce);

	this.setValue = function (value) {
		var isDefaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this3.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this3.locked) {
			return;
		}

		_this3.locked = true;
		var performUpdate = function performUpdate() {
			_this3.setState({
				currentValue: value
			}, function () {
				if (isDefaultValue) {
					_this3.updateQuery(value, props);
				} else {
					// debounce for handling text while typing
					_this3.handleTextChange(value);
				}
				_this3.locked = false;
				if (props.onValueChange) props.onValueChange(value);
			});
		};
		(0, _helper.checkValueChange)(props.componentId, value, props.beforeValueChange, performUpdate);
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || TextField.defaultQuery;

		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: props.showFilter,
			URLParams: props.URLParams
		});
	};

	this.handleChange = function (e) {
		_this3.setValue(e.target.value);
	};

	this.clearValue = function () {
		_this3.setValue('', true);
	};

	this.renderCancelIcon = function () {
		if (_this3.props.showClear) {
			return _this3.props.clearIcon || _react2.default.createElement(_CancelSvg2.default, null);
		}
		return null;
	};

	this.renderIcons = function () {
		return _react2.default.createElement(
			'div',
			null,
			_this3.state.currentValue && _this3.props.showClear && _react2.default.createElement(
				_InputIcon2.default,
				{
					onClick: _this3.clearValue,
					iconPosition: 'right'
				},
				_this3.renderCancelIcon()
			)
		);
	};
};

TextField.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	autoFocus: _types2.default.bool,
	beforeValueChange: _types2.default.func,
	className: _types2.default.string,
	clearIcon: _types2.default.children,
	componentId: _types2.default.stringRequired,
	customQuery: _types2.default.func,
	dataField: _types2.default.stringRequired,
	debounce: _types2.default.number,
	defaultSelected: _types2.default.string,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	innerRef: _types2.default.func,
	onBlur: _types2.default.func,
	onFocus: _types2.default.func,
	onKeyDown: _types2.default.func,
	onKeyPress: _types2.default.func,
	onKeyUp: _types2.default.func,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	placeholder: _types2.default.string,
	react: _types2.default.react,
	ref: _types2.default.func,
	showClear: _types2.default.bool,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	themePreset: _types2.default.themePreset,
	title: _types2.default.title,
	URLParams: _types2.default.bool
};

TextField.defaultProps = {
	className: null,
	debounce: 0,
	placeholder: 'Search',
	showClear: false,
	showFilter: true,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
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

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(TextField);