'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Histogram = require('../../../styles/Histogram');

var _Histogram2 = _interopRequireDefault(_Histogram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWidth = function getWidth(index, range, item, props) {
	var diff = void 0;
	if (index < range.length - 1) {
		diff = range[index + 1].key - item.key;
	} else {
		diff = props.range.end - item.key;
	}
	var fullRange = props.range.end - props.range.start;
	return diff / fullRange * 100 + '%';
};

var HistogramContainer = function HistogramContainer(props) {
	var max = props.stats[0].doc_count;
	props.stats.forEach(function (item) {
		if (max < item.doc_count) {
			max = item.doc_count;
		}
	});

	var range = [].concat(props.stats);
	if (props.stats.length) {
		if (range[0].key > props.range.start) {
			range = [{ key: props.range.start, doc_count: 0 }].concat(range);
		}
		var lastElement = range[range.length - 1];
		if (lastElement.key + props.interval < props.range.end) {
			range = [].concat(range, [{ key: props.interval + lastElement.key, doc_count: 0 }]);
		}
	}

	return _react2.default.createElement(
		'div',
		{ className: _Histogram.histogramContainer },
		range.map(function (item, index) {
			return _react2.default.createElement(_Histogram2.default, {
				key: item.key,
				width: getWidth(index, range, item, props),
				height: (100 * item.doc_count / max || 0) + '%',
				title: item.doc_count
			});
		})
	);
};

HistogramContainer.propTypes = {
	interval: _types2.default.number,
	range: _types2.default.range,
	stats: _types2.default.stats
};

exports.default = HistogramContainer;