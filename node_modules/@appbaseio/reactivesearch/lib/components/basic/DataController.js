'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataController = function (_Component) {
	_inherits(DataController, _Component);

	function DataController() {
		var _temp, _this, _ret;

		_classCallCheck(this, DataController);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.updateQuery = function () {
			var defaultSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var props = arguments[1];

			_this.locked = true;
			var query = props.customQuery || DataController.defaultQuery;

			var performUpdate = function performUpdate() {
				props.updateQuery({
					componentId: props.componentId,
					query: query(defaultSelected, props),
					value: defaultSelected,
					label: props.filterLabel,
					showFilter: props.showFilter,
					URLParams: props.URLParams
				});
				_this.locked = false;
				if (props.onValueChange) props.onValueChange(defaultSelected);
			};

			(0, _helper.checkValueChange)(props.componentId, defaultSelected, props.beforeValueChange, performUpdate);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	DataController.prototype.componentDidMount = function componentDidMount() {
		this.locked = false;
		this.props.addComponent(this.props.componentId);
		this.props.setQueryListener(this.props.componentId, this.props.onQueryChange, null);

		if (this.props.defaultSelected) {
			this.updateQuery(this.props.defaultSelected, this.props);
		} else {
			this.updateQuery(null, this.props);
		}
	};

	DataController.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (!this.locked) {
			if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected)) {
				this.updateQuery(nextProps.defaultSelected, nextProps);
			} else if (!(0, _helper.isEqual)(this.props.selectedValue, nextProps.selectedValue)) {
				this.updateQuery(nextProps.selectedValue, nextProps);
			}
		}
	};

	DataController.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	};

	DataController.defaultQuery = function defaultQuery() {
		return {
			match_all: {}
		};
	};

	DataController.prototype.render = function render() {
		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: this.props.className },
			this.props.children
		);
	};

	return DataController;
}(_react.Component);

DataController.defaultProps = {
	className: null,
	showFilter: true,
	style: {},
	URLParams: false
};

DataController.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryListener: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	selectedValue: _types2.default.selectedValue,
	// component props
	componentId: _types2.default.stringRequired,
	beforeValueChange: _types2.default.func,
	children: _types2.default.children,
	className: _types2.default.string,
	customQuery: _types2.default.func,
	// DataController can accept any defaultSelected depending on the query used
	defaultSelected: _types2.default.any, // eslint-disable-line
	filterLabel: _types2.default.string,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	showFilter: _types2.default.bool,
	style: _types2.default.style,
	URLParams: _types2.default.bool
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
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
		updateQuery: function updateQuery(updateQueryObject) {
			return dispatch((0, _actions.updateQuery)(updateQueryObject));
		},
		setQueryListener: function setQueryListener(component, onQueryChange, beforeQueryChange) {
			return dispatch((0, _actions.setQueryListener)(component, onQueryChange, beforeQueryChange));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(DataController);