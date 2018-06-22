'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _ReactiveList = require('./ReactiveList');

var _ReactiveList2 = _interopRequireDefault(_ReactiveList);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Card = require('../../styles/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultCard = function (_Component) {
	_inherits(ResultCard, _Component);

	function ResultCard() {
		var _temp, _this, _ret;

		_classCallCheck(this, ResultCard);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderAsCard = function (item) {
			var result = _this.props.onData(item);

			if (result) {
				return _react2.default.createElement(
					_Card2.default,
					_extends({
						key: item._id,
						href: result.url,
						className: (0, _helper.getClassName)(_this.props.innerClass, 'listItem'),
						target: _this.props.target,
						rel: _this.props.target === '_blank' ? 'noopener noreferrer' : null
					}, result.containerProps),
					_react2.default.createElement(_Card.Image, {
						style: { backgroundImage: 'url(' + result.image + ')' },
						className: (0, _helper.getClassName)(_this.props.innerClass, 'image')
					}),
					typeof result.title === 'string' ? _react2.default.createElement(_Title2.default, {
						dangerouslySetInnerHTML: { __html: result.title },
						className: (0, _helper.getClassName)(_this.props.innerClass, 'title')
					}) : _react2.default.createElement(
						_Title2.default,
						{ className: (0, _helper.getClassName)(_this.props.innerClass, 'title') },
						result.title
					),
					typeof result.description === 'string' ? _react2.default.createElement('article', { dangerouslySetInnerHTML: { __html: result.description } }) : _react2.default.createElement(
						'article',
						null,
						result.description
					)
				);
			}

			return null;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	ResultCard.prototype.render = function render() {
		var _props = this.props,
		    onData = _props.onData,
		    props = _objectWithoutProperties(_props, ['onData']);

		return _react2.default.createElement(_ReactiveList2.default, _extends({}, props, {
			onData: this.renderAsCard,
			listClass: _Card.container
		}));
	};

	return ResultCard;
}(_react.Component);

ResultCard.generateQueryOptions = function (props) {
	return _ReactiveList2.default.generateQueryOptions(props);
};

ResultCard.propTypes = {
	innerClass: _types2.default.style,
	target: _types2.default.stringRequired,
	onData: _types2.default.func
};

ResultCard.defaultProps = {
	target: '_blank'
};

exports.default = ResultCard;