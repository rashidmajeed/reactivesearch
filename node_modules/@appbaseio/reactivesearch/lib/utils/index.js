'use strict';

exports.__esModule = true;
exports.composeThemeObject = exports.connect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _reactivecore = require('@appbaseio/reactivecore');

var connect = exports.connect = function connect() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return _reactRedux.connect.apply(undefined, args.concat([null, {
		storeKey: _reactivecore.storeKey
	}]));
};

var composeThemeObject = exports.composeThemeObject = function composeThemeObject() {
	var ownTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var userTheme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	return {
		typography: _extends({}, ownTheme.typography, userTheme.typography),
		colors: _extends({}, ownTheme.colors, userTheme.colors),
		component: _extends({}, ownTheme.component, userTheme.component)
	};
};