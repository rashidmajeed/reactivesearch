'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _emotionTheming = require('emotion-theming');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _Input = require('../../styles/Input');

var _Select = require('../../styles/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Chevron = require('../../styles/Chevron');

var _Chevron2 = _interopRequireDefault(_Chevron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown(props) {
		_classCallCheck(this, Dropdown);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.toggle = function () {
			_this.setState({
				isOpen: !_this.state.isOpen
			});
		};

		_this.close = function () {
			_this.setState({
				isOpen: false
			});
		};

		_this.onChange = function (item) {
			if (_this.props.returnsObject) {
				_this.props.onChange(item);
			} else {
				_this.props.onChange(item[_this.props.keyField]);
			}

			if (!_this.props.multi) {
				_this.setState({
					isOpen: false
				});
			}
		};

		_this.handleStateChange = function (changes) {
			var isOpen = changes.isOpen,
			    type = changes.type;

			if (type === _downshift2.default.stateChangeTypes.mouseUp) {
				_this.setState({
					isOpen: isOpen
				});
			}
		};

		_this.getBackgroundColor = function (highlighted, selected) {
			var isDark = _this.props.themePreset === 'dark';
			if (highlighted) {
				return isDark ? '#555' : '#eee';
			} else if (selected) {
				return isDark ? '#686868' : '#fafafa';
			}
			return isDark ? '#424242' : '#fff';
		};

		_this.renderToString = function (value) {
			if (Array.isArray(value) && value.length) {
				var arrayToRender = value.map(function (item) {
					return _this.renderToString(item);
				});
				return arrayToRender.join(', ');
			} else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				if (value[_this.props.labelField]) {
					return value[_this.props.labelField];
				} else if (Object.keys(value).length) {
					return _this.renderToString(Object.keys(value));
				}
				return _this.props.placeholder;
			}
			return value;
		};

		_this.state = {
			isOpen: false
		};
		return _this;
	}

	Dropdown.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    items = _props.items,
		    selectedItem = _props.selectedItem,
		    placeholder = _props.placeholder,
		    labelField = _props.labelField,
		    keyField = _props.keyField,
		    themePreset = _props.themePreset,
		    theme = _props.theme,
		    renderListItem = _props.renderListItem;


		return _react2.default.createElement(_downshift2.default, {
			selectedItem: selectedItem,
			onChange: this.onChange,
			onOuterClick: this.close,
			onStateChange: this.handleStateChange,
			isOpen: this.state.isOpen,
			itemToString: function itemToString(i) {
				return i && i[_this2.props.labelField];
			},
			render: function render(_ref) {
				var getButtonProps = _ref.getButtonProps,
				    getItemProps = _ref.getItemProps,
				    isOpen = _ref.isOpen,
				    highlightedIndex = _ref.highlightedIndex;
				return _react2.default.createElement(
					'div',
					{ className: _Input.suggestionsContainer },
					_react2.default.createElement(
						_Select2.default,
						_extends({}, getButtonProps(), {
							className: (0, _helper.getClassName)(_this2.props.innerClass, 'select') || null,
							onClick: _this2.toggle,
							title: selectedItem ? _this2.renderToString(selectedItem) : placeholder,
							small: _this2.props.small,
							themePreset: _this2.props.themePreset
						}),
						_react2.default.createElement(
							'div',
							null,
							selectedItem ? _this2.renderToString(selectedItem) : placeholder
						),
						_react2.default.createElement(_Chevron2.default, { open: isOpen })
					),
					isOpen && items.length ? _react2.default.createElement(
						'ul',
						{ className: (0, _Input.suggestions)(themePreset, theme) + ' ' + (_this2.props.small ? 'small' : '') + ' ' + (0, _helper.getClassName)(_this2.props.innerClass, 'list') },
						items.map(function (item, index) {
							var selected = _this2.props.multi && (
							// MultiDropdownList
							selectedItem && !!selectedItem[item[keyField]] ||
							// MultiDropdownRange
							Array.isArray(selectedItem) && selectedItem.find(function (value) {
								return value[labelField] === item[labelField];
							}));

							if (!_this2.props.multi) selected = item.key === selectedItem;

							return _react2.default.createElement(
								'li',
								_extends({}, getItemProps({ item: item }), {
									key: item[keyField],
									className: '' + (selected ? 'active' : ''),
									style: {
										backgroundColor: _this2.getBackgroundColor(highlightedIndex === index, selected)
									}
								}),
								renderListItem ? renderListItem(item[labelField], item.doc_count) : _react2.default.createElement(
									'div',
									null,
									typeof item[labelField] === 'string' ? _react2.default.createElement('span', {
										dangerouslySetInnerHTML: {
											__html: item[labelField]
										}
									}) : item[labelField],
									_this2.props.showCount && item.doc_count && _react2.default.createElement(
										'span',
										{
											className: (0, _helper.getClassName)(_this2.props.innerClass, 'count') || null
										},
										'\xA0(',
										item.doc_count,
										')'
									)
								),
								selected && _this2.props.multi ? _react2.default.createElement(_Select.Tick, {
									className: (0, _helper.getClassName)(_this2.props.innerClass, 'icon') || null
								}) : null
							);
						})
					) : null
				);
			}
		});
	};

	return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
	keyField: 'key',
	labelField: 'label',
	small: false
};

Dropdown.propTypes = {
	innerClass: _types2.default.style,
	items: _types2.default.data,
	keyField: _types2.default.string,
	labelField: _types2.default.string,
	multi: _types2.default.bool,
	onChange: _types2.default.func,
	placeholder: _types2.default.string,
	returnsObject: _types2.default.bool,
	renderListItem: _types2.default.func,
	selectedItem: _types2.default.selectedValue,
	showCount: _types2.default.bool,
	single: _types2.default.bool,
	small: _types2.default.bool,
	theme: _types2.default.style,
	themePreset: _types2.default.themePreset
};

exports.default = (0, _emotionTheming.withTheme)(Dropdown);