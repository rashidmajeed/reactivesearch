'use strict';

exports.__esModule = true;
exports.whiteStar = exports.starRow = exports.ratingsList = undefined;

var _emotion = require('emotion');

var ratingsList = /*#__PURE__*/(0, _emotion.css)('list-style:none;margin:0;padding:0;li{display:flex;height:24px;flex-direction-row;justify-content:flex-start;align-items:center;cursor:pointer;span{font-size:0.85rem;padding-left:4px;}&.active span{font-weight:bold;}}');

var starRow = /*#__PURE__*/(0, _emotion.css)('display:inline-flex;flex-direction:row;svg{width:18px;height:18px;margin-right:2px;}');

var whiteStar = /*#__PURE__*/(0, _emotion.css)('polygon{fill:#ccc;}');

exports.ratingsList = ratingsList;
exports.starRow = starRow;
exports.whiteStar = whiteStar;