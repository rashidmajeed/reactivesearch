Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SliderConstants = require('./constants/SliderConstants');

var SliderConstants = _interopRequireWildcard(_SliderConstants);

var _linear = require('./algorithms/linear');

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals document */
/* eslint react/no-array-index-key: 1 */

function getClassName(props) {
  var orientation = props.orientation === 'vertical' ? 'rheostat-vertical' : 'rheostat-horizontal';

  return ['rheostat', orientation].concat(props.className.split(' ')).join(' ');
}

var has = Object.prototype.hasOwnProperty;

var PropTypeArrOfNumber = _propTypes2['default'].arrayOf(_propTypes2['default'].number);
var PropTypeReactComponent = _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].string]);

function getHandleFor(ev) {
  return Number(ev.currentTarget.getAttribute('data-handle-key'));
}

function killEvent(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement('button', _extends({}, this.props, { type: 'button' }));
      }

      return render;
    }()
  }]);

  return Button;
}(_react2['default'].Component);

var propTypes = {
  // the algorithm to use
  algorithm: _propTypes2['default'].shape({
    getValue: _propTypes2['default'].func,
    getPosition: _propTypes2['default'].func
  }),
  // any children you pass in
  children: _propTypes2['default'].node,
  // standard class name you'd like to apply to the root element
  className: _propTypes2['default'].string,
  // prevent the slider from moving when clicked
  disabled: _propTypes2['default'].bool,
  // a custom handle you can pass in
  handle: PropTypeReactComponent,
  // the maximum possible value
  max: _propTypes2['default'].number,
  // the minimum possible value
  min: _propTypes2['default'].number,
  // called on click
  onClick: _propTypes2['default'].func,
  // called whenever the user is done changing values on the slider
  onChange: _propTypes2['default'].func,
  // called on key press
  onKeyPress: _propTypes2['default'].func,
  // called when you finish dragging a handle
  onSliderDragEnd: _propTypes2['default'].func,
  // called every time the slider is dragged and the value changes
  onSliderDragMove: _propTypes2['default'].func,
  // called when you start dragging a handle
  onSliderDragStart: _propTypes2['default'].func,
  // called whenever the user is actively changing the values on the slider
  // (dragging, clicked, keypress)
  onValuesUpdated: _propTypes2['default'].func,
  // the orientation
  orientation: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
  // a component for rendering the pits
  pitComponent: PropTypeReactComponent,
  // the points that pits are rendered on
  pitPoints: PropTypeArrOfNumber,
  // a custom progress bar you can pass in
  progressBar: PropTypeReactComponent,
  // should we snap?
  snap: _propTypes2['default'].bool,
  // the points we should snap to
  snapPoints: PropTypeArrOfNumber,
  // whether a proposed update is valid
  getNextHandlePosition: _propTypes2['default'].func,
  // the values
  values: PropTypeArrOfNumber
};

var defaultProps = {
  algorithm: _linear2['default'],
  className: '',
  children: null,
  disabled: false,
  handle: Button,
  max: SliderConstants.PERCENT_FULL,
  min: SliderConstants.PERCENT_EMPTY,
  onClick: null,
  onChange: null,
  onKeyPress: null,
  onSliderDragEnd: null,
  onSliderDragMove: null,
  onSliderDragStart: null,
  onValuesUpdated: null,
  orientation: 'horizontal',
  pitComponent: null,
  pitPoints: [],
  progressBar: 'div',
  snap: false,
  snapPoints: [],
  getNextHandlePosition: null,
  values: [SliderConstants.PERCENT_EMPTY]
};

var Rheostat = function (_React$Component2) {
  _inherits(Rheostat, _React$Component2);

  function Rheostat(props) {
    _classCallCheck(this, Rheostat);

    var _this2 = _possibleConstructorReturn(this, (Rheostat.__proto__ || Object.getPrototypeOf(Rheostat)).call(this, props));

    var _this2$props = _this2.props,
        algorithm = _this2$props.algorithm,
        max = _this2$props.max,
        min = _this2$props.min,
        values = _this2$props.values;

    _this2.state = {
      className: getClassName(_this2.props),
      handlePos: values.map(function (value) {
        return algorithm.getPosition(value, min, max);
      }),
      handleDimensions: 0,
      // mousePos: null,
      sliderBox: {},
      slidingIndex: null,
      values: values
    };
    _this2.getPublicState = _this2.getPublicState.bind(_this2);
    _this2.getSliderBoundingBox = _this2.getSliderBoundingBox.bind(_this2);
    _this2.getProgressStyle = _this2.getProgressStyle.bind(_this2);
    _this2.getMinValue = _this2.getMinValue.bind(_this2);
    _this2.getMaxValue = _this2.getMaxValue.bind(_this2);
    _this2.getHandleDimensions = _this2.getHandleDimensions.bind(_this2);
    _this2.getClosestSnapPoint = _this2.getClosestSnapPoint.bind(_this2);
    _this2.getSnapPosition = _this2.getSnapPosition.bind(_this2);
    _this2.getNextPositionForKey = _this2.getNextPositionForKey.bind(_this2);
    _this2.getNextState = _this2.getNextState.bind(_this2);
    _this2.handleClick = _this2.handleClick.bind(_this2);
    _this2.getClosestHandle = _this2.getClosestHandle.bind(_this2);
    _this2.setStartSlide = _this2.setStartSlide.bind(_this2);
    _this2.startMouseSlide = _this2.startMouseSlide.bind(_this2);
    _this2.startTouchSlide = _this2.startTouchSlide.bind(_this2);
    _this2.handleMouseSlide = _this2.handleMouseSlide.bind(_this2);
    _this2.handleTouchSlide = _this2.handleTouchSlide.bind(_this2);
    _this2.handleSlide = _this2.handleSlide.bind(_this2);
    _this2.endSlide = _this2.endSlide.bind(_this2);
    _this2.handleKeydown = _this2.handleKeydown.bind(_this2);
    _this2.validatePosition = _this2.validatePosition.bind(_this2);
    _this2.validateValues = _this2.validateValues.bind(_this2);
    _this2.canMove = _this2.canMove.bind(_this2);
    _this2.fireChangeEvent = _this2.fireChangeEvent.bind(_this2);
    _this2.slideTo = _this2.slideTo.bind(_this2);
    _this2.updateNewValues = _this2.updateNewValues.bind(_this2);
    _this2.setRef = _this2.setRef.bind(_this2);
    _this2.invalidatePitStyleCache = _this2.invalidatePitStyleCache.bind(_this2);

    _this2.pitStyleCache = {};
    return _this2;
  }

  _createClass(Rheostat, [{
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _props = this.props,
            className = _props.className,
            disabled = _props.disabled,
            min = _props.min,
            max = _props.max,
            orientation = _props.orientation,
            pitPoints = _props.pitPoints,
            algorithm = _props.algorithm;
        var _state = this.state,
            values = _state.values,
            slidingIndex = _state.slidingIndex;


        var minMaxChanged = nextProps.min !== min || nextProps.max !== max;

        var valuesChanged = values.length !== nextProps.values.length || values.some(function (value, idx) {
          return nextProps.values[idx] !== value;
        });

        var orientationChanged = nextProps.className !== className || nextProps.orientation !== orientation;

        var algorithmChanged = nextProps.algorithm !== algorithm;

        var pitPointsChanged = nextProps.pitPoints !== pitPoints;

        var willBeDisabled = nextProps.disabled && !disabled;

        if (orientationChanged) {
          this.setState({
            className: getClassName(nextProps)
          });
        }

        if (minMaxChanged || valuesChanged) this.updateNewValues(nextProps);

        if (minMaxChanged || pitPointsChanged || orientationChanged || algorithmChanged) {
          this.invalidatePitStyleCache();
        }

        if (willBeDisabled && slidingIndex !== null) {
          this.endSlide();
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'getPublicState',
    value: function () {
      function getPublicState() {
        var _props2 = this.props,
            min = _props2.min,
            max = _props2.max;
        var values = this.state.values;


        return { max: max, min: min, values: values };
      }

      return getPublicState;
    }()

    // istanbul ignore next

  }, {
    key: 'getSliderBoundingBox',
    value: function () {
      function getSliderBoundingBox() {
        var rheostat = this.rheostat;

        var node = rheostat.getDOMNode ? rheostat.getDOMNode() : rheostat;
        var rect = node.getBoundingClientRect();

        return {
          height: rect.height || node.clientHeight,
          left: rect.left,
          top: rect.top,
          width: rect.width || node.clientWidth
        };
      }

      return getSliderBoundingBox;
    }()
  }, {
    key: 'getProgressStyle',
    value: function () {
      function getProgressStyle(idx) {
        var orientation = this.props.orientation;
        var handlePos = this.state.handlePos;


        var value = handlePos[idx];

        if (idx === 0) {
          return orientation === 'vertical' ? { height: String(value) + '%', top: 0 } : { left: 0, width: String(value) + '%' };
        }

        var prevValue = handlePos[idx - 1];
        var diffValue = value - prevValue;

        return orientation === 'vertical' ? { height: diffValue + '%', top: String(prevValue) + '%' } : { left: String(prevValue) + '%', width: diffValue + '%' };
      }

      return getProgressStyle;
    }()
  }, {
    key: 'getMinValue',
    value: function () {
      function getMinValue(idx) {
        var min = this.props.min;
        var values = this.state.values;

        return values[idx - 1] ? Math.max(min, values[idx - 1]) : min;
      }

      return getMinValue;
    }()
  }, {
    key: 'getMaxValue',
    value: function () {
      function getMaxValue(idx) {
        var max = this.props.max;
        var values = this.state.values;

        return values[idx + 1] ? Math.min(max, values[idx + 1]) : max;
      }

      return getMaxValue;
    }()

    // istanbul ignore next

  }, {
    key: 'getHandleDimensions',
    value: function () {
      function getHandleDimensions(ev, sliderBox) {
        var handleNode = ev.currentTarget || null;

        if (!handleNode) return 0;

        return this.props.orientation === 'vertical' ? handleNode.clientHeight / sliderBox.height * SliderConstants.PERCENT_FULL / 2 : handleNode.clientWidth / sliderBox.width * SliderConstants.PERCENT_FULL / 2;
      }

      return getHandleDimensions;
    }()
  }, {
    key: 'getClosestSnapPoint',
    value: function () {
      function getClosestSnapPoint(value) {
        var snapPoints = this.props.snapPoints;

        if (!snapPoints.length) return value;

        return snapPoints.reduce(function (snapTo, snap) {
          return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
        });
      }

      return getClosestSnapPoint;
    }()
  }, {
    key: 'getSnapPosition',
    value: function () {
      function getSnapPosition(positionPercent) {
        var _props3 = this.props,
            algorithm = _props3.algorithm,
            max = _props3.max,
            min = _props3.min,
            snap = _props3.snap;


        if (!snap) return positionPercent;

        var value = algorithm.getValue(positionPercent, min, max);

        var snapValue = this.getClosestSnapPoint(value);

        return algorithm.getPosition(snapValue, min, max);
      }

      return getSnapPosition;
    }()
  }, {
    key: 'getNextPositionForKey',
    value: function () {
      function getNextPositionForKey(idx, keyCode) {
        var _stepMultiplier;

        var _state2 = this.state,
            handlePos = _state2.handlePos,
            values = _state2.values;
        var _props4 = this.props,
            algorithm = _props4.algorithm,
            max = _props4.max,
            min = _props4.min,
            snapPoints = _props4.snapPoints,
            shouldSnap = _props4.snap;


        var proposedValue = values[idx];
        var proposedPercentage = handlePos[idx];
        var originalPercentage = proposedPercentage;
        var stepValue = 1;

        if (max >= 100) {
          proposedPercentage = Math.round(proposedPercentage);
        } else {
          stepValue = 100 / (max - min);
        }

        var currentIndex = null;

        if (shouldSnap) {
          currentIndex = snapPoints.indexOf(this.getClosestSnapPoint(values[idx]));
        }

        var stepMultiplier = (_stepMultiplier = {}, _defineProperty(_stepMultiplier, SliderConstants.KEYS.LEFT, function (v) {
          return v * -1;
        }), _defineProperty(_stepMultiplier, SliderConstants.KEYS.RIGHT, function (v) {
          return v * 1;
        }), _defineProperty(_stepMultiplier, SliderConstants.KEYS.UP, function (v) {
          return v * 1;
        }), _defineProperty(_stepMultiplier, SliderConstants.KEYS.DOWN, function (v) {
          return v * -1;
        }), _defineProperty(_stepMultiplier, SliderConstants.KEYS.PAGE_DOWN, function (v) {
          return v > 1 ? -v : v * -10;
        }), _defineProperty(_stepMultiplier, SliderConstants.KEYS.PAGE_UP, function (v) {
          return v > 1 ? v : v * 10;
        }), _stepMultiplier);

        if (has.call(stepMultiplier, keyCode)) {
          proposedPercentage += stepMultiplier[keyCode](stepValue);

          if (shouldSnap) {
            if (proposedPercentage > originalPercentage) {
              // move cursor right unless overflow
              if (currentIndex < snapPoints.length - 1) {
                proposedValue = snapPoints[currentIndex + 1];
              }
              // move cursor left unless there is overflow
            } else if (currentIndex > 0) {
              proposedValue = snapPoints[currentIndex - 1];
            }
          }
        } else if (keyCode === SliderConstants.KEYS.HOME) {
          proposedPercentage = SliderConstants.PERCENT_EMPTY;

          if (shouldSnap) {
            var _snapPoints = _slicedToArray(snapPoints, 1);

            proposedValue = _snapPoints[0];
          }
        } else if (keyCode === SliderConstants.KEYS.END) {
          proposedPercentage = SliderConstants.PERCENT_FULL;

          if (shouldSnap) {
            proposedValue = snapPoints[snapPoints.length - 1];
          }
        } else {
          return null;
        }

        return shouldSnap ? algorithm.getPosition(proposedValue, min, max) : proposedPercentage;
      }

      return getNextPositionForKey;
    }()
  }, {
    key: 'getNextState',
    value: function () {
      function getNextState(idx, proposedPosition) {
        var handlePos = this.state.handlePos;
        var _props5 = this.props,
            max = _props5.max,
            min = _props5.min,
            algorithm = _props5.algorithm;


        var actualPosition = this.validatePosition(idx, proposedPosition);

        var nextHandlePos = handlePos.map(function (pos, index) {
          return index === idx ? actualPosition : pos;
        });

        return {
          handlePos: nextHandlePos,
          values: nextHandlePos.map(function (pos) {
            return algorithm.getValue(pos, min, max);
          })
        };
      }

      return getNextState;
    }()
  }, {
    key: 'getClosestHandle',
    value: function () {
      function getClosestHandle(positionPercent) {
        var handlePos = this.state.handlePos;


        return handlePos.reduce(function (closestIdx, node, idx) {
          var challenger = Math.abs(handlePos[idx] - positionPercent);
          var current = Math.abs(handlePos[closestIdx] - positionPercent);
          return challenger < current ? idx : closestIdx;
        }, 0);
      }

      return getClosestHandle;
    }()

    // istanbul ignore next

  }, {
    key: 'setStartSlide',
    value: function () {
      function setStartSlide(ev /* , x, y */) {
        var sliderBox = this.getSliderBoundingBox();

        this.setState({
          handleDimensions: this.getHandleDimensions(ev, sliderBox),
          // mousePos: { x, y },
          sliderBox: sliderBox,
          slidingIndex: getHandleFor(ev)
        });
      }

      return setStartSlide;
    }()
  }, {
    key: 'setRef',
    value: function () {
      function setRef(ref) {
        this.rheostat = ref;
      }

      return setRef;
    }()

    // istanbul ignore next

  }, {
    key: 'startMouseSlide',
    value: function () {
      function startMouseSlide(ev) {
        this.setStartSlide(ev, ev.clientX, ev.clientY);

        if (typeof document.addEventListener === 'function') {
          document.addEventListener('mousemove', this.handleMouseSlide, false);
          document.addEventListener('mouseup', this.endSlide, false);
        } else {
          document.attachEvent('onmousemove', this.handleMouseSlide);
          document.attachEvent('onmouseup', this.endSlide);
        }

        killEvent(ev);
      }

      return startMouseSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'startTouchSlide',
    value: function () {
      function startTouchSlide(ev) {
        var onSliderDragStart = this.props.onSliderDragStart;


        if (ev.changedTouches.length > 1) return;

        var touch = ev.changedTouches[0];

        this.setStartSlide(ev, touch.clientX, touch.clientY);

        document.addEventListener('touchmove', this.handleTouchSlide, false);
        document.addEventListener('touchend', this.endSlide, false);

        if (onSliderDragStart) onSliderDragStart();

        killEvent(ev);
      }

      return startTouchSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'handleMouseSlide',
    value: function () {
      function handleMouseSlide(ev) {
        var slidingIndex = this.state.slidingIndex;

        if (slidingIndex === null) return;
        this.handleSlide(ev.clientX, ev.clientY);
        killEvent(ev);
      }

      return handleMouseSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'handleTouchSlide',
    value: function () {
      function handleTouchSlide(ev) {
        var slidingIndex = this.state.slidingIndex;

        if (slidingIndex === null) return;

        if (ev.changedTouches.length > 1) {
          this.endSlide();
          return;
        }

        var touch = ev.changedTouches[0];

        this.handleSlide(touch.clientX, touch.clientY);
        killEvent(ev);
      }

      return handleTouchSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'handleSlide',
    value: function () {
      function handleSlide(x, y) {
        var _props6 = this.props,
            orientation = _props6.orientation,
            onSliderDragMove = _props6.onSliderDragMove;
        var _state3 = this.state,
            idx = _state3.slidingIndex,
            sliderBox = _state3.sliderBox;


        var positionPercent = orientation === 'vertical' ? (y - sliderBox.top) / sliderBox.height * SliderConstants.PERCENT_FULL : (x - sliderBox.left) / sliderBox.width * SliderConstants.PERCENT_FULL;

        this.slideTo(idx, positionPercent);

        if (this.canMove(idx, positionPercent)) {
          if (onSliderDragMove) onSliderDragMove();
        }
      }

      return handleSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'endSlide',
    value: function () {
      function endSlide() {
        var _this3 = this;

        var _props7 = this.props,
            onSliderDragEnd = _props7.onSliderDragEnd,
            snap = _props7.snap;
        var _state4 = this.state,
            slidingIndex = _state4.slidingIndex,
            handlePos = _state4.handlePos;


        this.setState({ slidingIndex: null });

        if (typeof document.removeEventListener === 'function') {
          document.removeEventListener('mouseup', this.endSlide, false);
          document.removeEventListener('touchend', this.endSlide, false);
          document.removeEventListener('touchmove', this.handleTouchSlide, false);
          document.removeEventListener('mousemove', this.handleMouseSlide, false);
        } else {
          document.detachEvent('onmousemove', this.handleMouseSlide);
          document.detachEvent('onmouseup', this.endSlide);
        }

        if (onSliderDragEnd) onSliderDragEnd();
        if (snap) {
          var positionPercent = this.getSnapPosition(handlePos[slidingIndex]);
          this.slideTo(slidingIndex, positionPercent, function () {
            return _this3.fireChangeEvent();
          });
        } else {
          this.fireChangeEvent();
        }
      }

      return endSlide;
    }()

    // istanbul ignore next

  }, {
    key: 'handleClick',
    value: function () {
      function handleClick(ev) {
        var _this4 = this;

        if (ev.target.getAttribute('data-handle-key')) {
          return;
        }

        var _props8 = this.props,
            orientation = _props8.orientation,
            onClick = _props8.onClick;

        // Calculate the position of the slider on the page so we can determine
        // the position where you click in relativity.

        var sliderBox = this.getSliderBoundingBox();

        var positionDecimal = orientation === 'vertical' ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;

        var positionPercent = positionDecimal * SliderConstants.PERCENT_FULL;

        var handleId = this.getClosestHandle(positionPercent);

        var validPositionPercent = this.getSnapPosition(positionPercent);

        // Move the handle there
        this.slideTo(handleId, validPositionPercent, function () {
          return _this4.fireChangeEvent();
        });

        if (onClick) onClick();
      }

      return handleClick;
    }()

    // istanbul ignore next

  }, {
    key: 'handleKeydown',
    value: function () {
      function handleKeydown(ev) {
        var _this5 = this;

        var idx = getHandleFor(ev);

        if (ev.keyCode === SliderConstants.KEYS.ESC) {
          ev.currentTarget.blur();
          return;
        }

        var proposedPercentage = this.getNextPositionForKey(idx, ev.keyCode);

        if (proposedPercentage === null) return;

        if (this.canMove(idx, proposedPercentage)) {
          this.slideTo(idx, proposedPercentage, function () {
            return _this5.fireChangeEvent();
          });
          var onKeyPress = this.props.onKeyPress;

          if (onKeyPress) onKeyPress();
        }

        killEvent(ev);
      }

      return handleKeydown;
    }()

    // Apply user adjustments to position

  }, {
    key: 'userAdjustPosition',
    value: function () {
      function userAdjustPosition(idx, proposedPosition) {
        var getNextHandlePosition = this.props.getNextHandlePosition;

        var nextPosition = proposedPosition;
        if (getNextHandlePosition) {
          nextPosition = parseFloat(getNextHandlePosition(idx, proposedPosition));

          if (Number.isNaN(nextPosition) || nextPosition < SliderConstants.PERCENT_EMPTY || nextPosition > SliderConstants.PERCENT_FULL) {
            throw new TypeError('getNextHandlePosition returned invalid position. Valid positions are floats between 0 and 100');
          }
        }

        return nextPosition;
      }

      return userAdjustPosition;
    }()

    // Make sure the proposed position respects the bounds and
    // does not collide with other handles too much.

  }, {
    key: 'validatePosition',
    value: function () {
      function validatePosition(idx, proposedPosition) {
        var _state5 = this.state,
            handlePos = _state5.handlePos,
            handleDimensions = _state5.handleDimensions;


        var nextPosition = this.userAdjustPosition(idx, proposedPosition);

        return Math.max(Math.min(nextPosition, handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : SliderConstants.PERCENT_FULL // 100% is the highest value
        ), handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : SliderConstants.PERCENT_EMPTY // 0% is the lowest value
        );
      }

      return validatePosition;
    }()
  }, {
    key: 'validateValues',
    value: function () {
      function validateValues(proposedValues, props) {
        var _ref = props || this.props,
            max = _ref.max,
            min = _ref.min;

        return proposedValues.map(function (value, idx, values) {
          var realValue = Math.max(Math.min(value, max), min);

          if (values.length && realValue < values[idx - 1]) {
            return values[idx - 1];
          }

          return realValue;
        });
      }

      return validateValues;
    }()

    // Can we move the slider to the given position?

  }, {
    key: 'canMove',
    value: function () {
      function canMove(idx, proposedPosition) {
        var _state6 = this.state,
            handlePos = _state6.handlePos,
            handleDimensions = _state6.handleDimensions;


        if (proposedPosition < SliderConstants.PERCENT_EMPTY) return false;
        if (proposedPosition > SliderConstants.PERCENT_FULL) return false;

        var nextHandlePosition = handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : Infinity;

        if (proposedPosition > nextHandlePosition) return false;

        var prevHandlePosition = handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : -Infinity;

        if (proposedPosition < prevHandlePosition) return false;

        return true;
      }

      return canMove;
    }()

    // istanbul ignore next

  }, {
    key: 'fireChangeEvent',
    value: function () {
      function fireChangeEvent() {
        var onChange = this.props.onChange;

        if (onChange) onChange(this.getPublicState());
      }

      return fireChangeEvent;
    }()

    // istanbul ignore next

  }, {
    key: 'slideTo',
    value: function () {
      function slideTo(idx, proposedPosition, onAfterSet) {
        var _this6 = this;

        var nextState = this.getNextState(idx, proposedPosition);

        this.setState(nextState, function () {
          var onValuesUpdated = _this6.props.onValuesUpdated;

          if (onValuesUpdated) onValuesUpdated(_this6.getPublicState());
          if (onAfterSet) onAfterSet();
        });
      }

      return slideTo;
    }()

    // istanbul ignore next

  }, {
    key: 'updateNewValues',
    value: function () {
      function updateNewValues(nextProps) {
        var _this7 = this;

        var slidingIndex = this.state.slidingIndex;

        // Don't update while the slider is sliding

        if (slidingIndex !== null) {
          return;
        }

        var max = nextProps.max,
            min = nextProps.min,
            values = nextProps.values;
        var algorithm = this.props.algorithm;


        var nextValues = this.validateValues(values, nextProps);

        this.setState({
          handlePos: nextValues.map(function (value) {
            return algorithm.getPosition(value, min, max);
          }),
          values: nextValues
        }, function () {
          return _this7.fireChangeEvent();
        });
      }

      return updateNewValues;
    }()
  }, {
    key: 'invalidatePitStyleCache',
    value: function () {
      function invalidatePitStyleCache() {
        this.pitStyleCache = {};
      }

      return invalidatePitStyleCache;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this8 = this;

        var _props9 = this.props,
            algorithm = _props9.algorithm,
            children = _props9.children,
            disabled = _props9.disabled,
            Handle = _props9.handle,
            max = _props9.max,
            min = _props9.min,
            orientation = _props9.orientation,
            PitComponent = _props9.pitComponent,
            pitPoints = _props9.pitPoints,
            ProgressBar = _props9.progressBar;
        var _state7 = this.state,
            className = _state7.className,
            handlePos = _state7.handlePos,
            values = _state7.values;


        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          _react2['default'].createElement(
            'div',
            {
              className: className,
              ref: this.setRef,
              onClick: !disabled ? this.handleClick : undefined,
              style: { position: 'relative' }
            },
            _react2['default'].createElement('div', { className: 'rheostat-background' }),
            handlePos.map(function (pos, idx) {
              var handleStyle = orientation === 'vertical' ? { top: String(pos) + '%', position: 'absolute' } : { left: String(pos) + '%', position: 'absolute' };

              return _react2['default'].createElement(Handle, {
                'aria-valuemax': _this8.getMaxValue(idx),
                'aria-valuemin': _this8.getMinValue(idx),
                'aria-valuenow': values[idx],
                'aria-disabled': disabled,
                'data-handle-key': idx,
                className: 'rheostat-handle',
                key: 'handle-' + String(idx),
                onClick: _this8.killEvent,
                onKeyDown: !disabled ? _this8.handleKeydown : undefined,
                onMouseDown: !disabled ? _this8.startMouseSlide : undefined,
                onTouchStart: !disabled ? _this8.startTouchSlide : undefined,
                role: 'slider',
                style: handleStyle,
                tabIndex: 0
              });
            }),
            handlePos.map(function (node, idx, arr) {
              if (idx === 0 && arr.length > 1) {
                return null;
              }

              return _react2['default'].createElement(ProgressBar, {
                className: 'rheostat-progress',
                key: 'progress-bar-' + String(idx),
                style: _this8.getProgressStyle(idx)
              });
            }),
            PitComponent && pitPoints.map(function (n) {
              var pitStyle = _this8.pitStyleCache[n];

              if (!pitStyle) {
                var pos = algorithm.getPosition(n, min, max);
                pitStyle = orientation === 'vertical' ? { top: String(pos) + '%', position: 'absolute' } : { left: String(pos) + '%', position: 'absolute' };
                _this8.pitStyleCache[n] = pitStyle;
              }

              return _react2['default'].createElement(
                PitComponent,
                { key: 'pit-' + String(n), style: pitStyle },
                n
              );
            }),
            children
          )
        );
      }

      return render;
    }()
  }]);

  return Rheostat;
}(_react2['default'].Component);

Rheostat.propTypes = propTypes;
Rheostat.defaultProps = defaultProps;

exports['default'] = Rheostat;