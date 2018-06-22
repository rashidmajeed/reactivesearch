'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = initReactivesearch;

var _appbaseJs = require('appbase-js');

var _appbaseJs2 = _interopRequireDefault(_appbaseJs);

var _valueReducer = require('@appbaseio/reactivecore/lib/reducers/valueReducer');

var _valueReducer2 = _interopRequireDefault(_valueReducer);

var _queryReducer = require('@appbaseio/reactivecore/lib/reducers/queryReducer');

var _queryReducer2 = _interopRequireDefault(_queryReducer);

var _queryOptionsReducer = require('@appbaseio/reactivecore/lib/reducers/queryOptionsReducer');

var _queryOptionsReducer2 = _interopRequireDefault(_queryOptionsReducer);

var _dependencyTreeReducer = require('@appbaseio/reactivecore/lib/reducers/dependencyTreeReducer');

var _dependencyTreeReducer2 = _interopRequireDefault(_dependencyTreeReducer);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var componentsWithHighlightQuery = ['DataSearch', 'CategorySearch'];

var componentsWithOptions = ['ResultList', 'ResultCard', 'ReactiveList', 'ReactiveMap', 'SingleList', 'MultiList', 'TagCloud'].concat(componentsWithHighlightQuery);

var componentsWithoutFilters = ['NumberBox', 'RangeSlider', 'DynamicRangeSlider', 'RangeInput', 'RatingsFilter'];

var resultComponents = ['ResultCard', 'ResultList', 'ReactiveList', 'ReactiveMap'];

function getValue(state, id, defaultValue) {
	return state ? state[id] : defaultValue;
}

function parseValue(value, component) {
	if (component.source && component.source.parseValue) {
		return component.source.parseValue(value, component);
	}
	return value;
}

function getQuery(component, value) {
	// get default query of result components
	if (resultComponents.includes(component.type)) {
		return component.defaultQuery ? component.defaultQuery() : {};
	}

	// get custom or default query of sensor components
	var currentValue = parseValue(value, component);
	if (component.customQuery) {
		return component.customQuery(currentValue, component);
	}
	return component.source.defaultQuery ? component.source.defaultQuery(currentValue, component) : {};
}

function initReactivesearch(componentCollection, searchState, settings) {
	return new Promise(function (resolve, reject) {
		var credentials = settings.url && settings.url.trim() !== '' && !settings.credentials ? null : settings.credentials;
		var config = {
			url: settings.url && settings.url.trim() !== '' ? settings.url : 'https://scalr.api.appbase.io',
			app: settings.app,
			credentials: credentials,
			type: settings.type ? settings.type : '*'
		};
		var appbaseRef = new _appbaseJs2.default(config);

		var components = [];
		var selectedValues = {};
		var queryList = {};
		var queryLog = {};
		var queryOptions = {};
		var dependencyTree = {};
		var finalQuery = [];
		var orderOfQueries = [];
		var hits = {};
		var aggregations = {};
		var state = {};

		componentCollection.forEach(function (component) {
			components = [].concat(components, [component.componentId]);

			var isInternalComponentPresent = false;
			var isResultComponent = resultComponents.includes(component.type);
			var internalComponent = component.componentId + '__internal';
			var label = component.filterLabel || component.componentId;
			var value = getValue(searchState, label, component.defaultSelected);

			// [1] set selected values
			var showFilter = component.showFilter !== undefined ? component.showFilter : true;
			if (componentsWithoutFilters.includes(component.type)) {
				showFilter = false;
			}
			selectedValues = (0, _valueReducer2.default)(selectedValues, {
				type: 'SET_VALUE',
				component: component.componentId,
				label: label,
				value: value,
				showFilter: showFilter,
				URLParams: component.URLParams || false
			});

			// [2] set query options - main component query (valid for result components)
			if (componentsWithOptions.includes(component.type)) {
				var options = component.source.generateQueryOptions ? component.source.generateQueryOptions(component) : null;
				var highlightQuery = {};

				if (componentsWithHighlightQuery.includes(component.type) && component.highlight) {
					highlightQuery = component.source.highlightQuery(component);
				}

				if (options && Object.keys(options).length || highlightQuery && Object.keys(highlightQuery).length) {
					// eslint-disable-next-line
					var _ref = options || {},
					    aggs = _ref.aggs,
					    size = _ref.size,
					    otherQueryOptions = _objectWithoutProperties(_ref, ['aggs', 'size']);

					if (aggs && Object.keys(aggs).length) {
						isInternalComponentPresent = true;

						// query should be applied on the internal component
						// to enable feeding the data to parent component
						queryOptions = (0, _queryOptionsReducer2.default)(queryOptions, {
							type: 'SET_QUERY_OPTIONS',
							component: internalComponent,
							options: { aggs: aggs, size: size || 100 }
						});
					}

					// sort, highlight, size, from - query should be applied on the main component
					if (otherQueryOptions && Object.keys(otherQueryOptions).length || highlightQuery && Object.keys(highlightQuery).length) {
						if (!otherQueryOptions) otherQueryOptions = {};
						if (!highlightQuery) highlightQuery = {};

						var mainQueryOptions = _extends({}, otherQueryOptions, highlightQuery, { size: size });
						if (isInternalComponentPresent) {
							mainQueryOptions = _extends({}, otherQueryOptions, highlightQuery);
						}
						if (isResultComponent) {
							mainQueryOptions = _extends({
								from: 0,
								size: component.size || 10
							}, mainQueryOptions, highlightQuery);
						}
						queryOptions = (0, _queryOptionsReducer2.default)(queryOptions, {
							type: 'SET_QUERY_OPTIONS',
							component: component.componentId,
							options: _extends({}, mainQueryOptions)
						});
					}
				}
			}

			// [3] set dependency tree
			if (component.react || isInternalComponentPresent || isResultComponent) {
				var react = component.react;

				if (isInternalComponentPresent || isResultComponent) {
					react = (0, _helper.pushToAndClause)(react, internalComponent);
				}

				dependencyTree = (0, _dependencyTreeReducer2.default)(dependencyTree, {
					type: 'WATCH_COMPONENT',
					component: component.componentId,
					react: react
				});
			}

			// [4] set query list
			if (isResultComponent) {
				var _getQuery = getQuery(component),
				    query = _getQuery.query;

				queryList = (0, _queryReducer2.default)(queryList, {
					type: 'SET_QUERY',
					component: internalComponent,
					query: query
				});
			} else {
				queryList = (0, _queryReducer2.default)(queryList, {
					type: 'SET_QUERY',
					component: component.componentId,
					query: getQuery(component, value)
				});
			}
		});

		// [5] Generate finalQuery for search
		componentCollection.forEach(function (component) {
			// eslint-disable-next-line
			var _buildQuery = (0, _helper.buildQuery)(component.componentId, dependencyTree, queryList, queryOptions),
			    queryObj = _buildQuery.queryObj,
			    options = _buildQuery.options;

			var validOptions = ['aggs', 'from', 'sort'];
			// check if query or options are valid - non-empty
			if (queryObj && !!Object.keys(queryObj).length || options && Object.keys(options).some(function (item) {
				return validOptions.includes(item);
			})) {
				var _extends2;

				if (!queryObj || queryObj && !Object.keys(queryObj).length) {
					queryObj = { match_all: {} };
				}

				orderOfQueries = [].concat(orderOfQueries, [component.componentId]);

				var currentQuery = _extends({
					query: _extends({}, queryObj)
				}, options, queryOptions[component.componentId]);

				queryLog = _extends({}, queryLog, (_extends2 = {}, _extends2[component.componentId] = currentQuery, _extends2));

				finalQuery = [].concat(finalQuery, [{
					preference: component.componentId
				}, currentQuery]);
			}
		});

		state = {
			components: components,
			dependencyTree: dependencyTree,
			queryList: queryList,
			queryOptions: queryOptions,
			selectedValues: selectedValues,
			queryLog: queryLog
		};

		appbaseRef.msearch({
			type: config.type === '*' ? '' : config.type,
			body: finalQuery
		}).on('data', function (res) {
			orderOfQueries.forEach(function (component, index) {
				var _extends4;

				var response = res.responses[index];
				if (response.aggregations) {
					var _extends3;

					aggregations = _extends({}, aggregations, (_extends3 = {}, _extends3[component] = response.aggregations, _extends3));
				}
				hits = _extends({}, hits, (_extends4 = {}, _extends4[component] = {
					hits: response.hits.hits,
					total: response.hits.total,
					time: response.took
				}, _extends4));
			});
			state = _extends({}, state, {
				hits: hits,
				aggregations: aggregations
			});
			resolve(state);
		}).on('error', function (err) {
			return reject(err);
		});
	});
}