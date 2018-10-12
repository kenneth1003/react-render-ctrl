'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withRenderCtrl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Error = require('../defaultComponents/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Loading = require('../defaultComponents/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _Empty = require('../defaultComponents/Empty');

var _Empty2 = _interopRequireDefault(_Empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withRenderCtrl(WrappedComponent) {
  var stateComponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var RenderCtrl = function (_Component) {
    _inherits(RenderCtrl, _Component);

    function RenderCtrl(props) {
      _classCallCheck(this, RenderCtrl);

      var _this = _possibleConstructorReturn(this, (RenderCtrl.__proto__ || Object.getPrototypeOf(RenderCtrl)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(RenderCtrl, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            isError = _props.isError,
            isDataReady = _props.isDataReady,
            isLoading = _props.isLoading,
            errorComponentProps = _props.errorComponentProps,
            loadingComponentProps = _props.loadingComponentProps,
            emptyComponentProps = _props.emptyComponentProps,
            debug = _props.debug,
            shouldReloadEverytime = _props.shouldReloadEverytime;
        // set status component

        var LoadingComponent = stateComponents.LoadingComponent || this.context.LoadingComponent || _Loading2.default;

        var EmptyComponent = stateComponents.EmptyComponent || this.context.EmptyComponent || _Empty2.default;

        var ErrorComponent = stateComponents.ErrorComponent || this.context.ErrorComponent || _Error2.default;
        if (process.env.NODE_ENV !== 'production' && debug) {
          /* eslint-disable no-console */
          console.group(WrappedComponent.name);
          console.log('[props.isError]: ' + isError);
          console.log('[props.isDataReady]: ' + isDataReady);
          console.log('[props.isLoading]: ' + isLoading);
          console.log('[props.errorComponentProps]: ' + errorComponentProps);
          console.log('[props.loadingComponentProps]: ' + loadingComponentProps);
          console.log('[props.emptyComponentProps]: ' + emptyComponentProps);
          console.groupEnd(WrappedComponent.name);
          /* eslint-enable no-console */
        }
        // Render Logic
        if (isError) return _react2.default.createElement(ErrorComponent, errorComponentProps);
        if (!shouldReloadEverytime) {
          if (isDataReady) return _react2.default.createElement(WrappedComponent, this.props);
          if (isLoading) return _react2.default.createElement(LoadingComponent, loadingComponentProps);
          return _react2.default.createElement(EmptyComponent, emptyComponentProps);
        }
        if (isLoading) return _react2.default.createElement(LoadingComponent, loadingComponentProps);
        if (isDataReady) return _react2.default.createElement(WrappedComponent, this.props);
        return _react2.default.createElement(EmptyComponent, emptyComponentProps);
      }
    }]);

    return RenderCtrl;
  }(_react.Component);

  RenderCtrl.propTypes = {
    isError: _propTypes.bool,
    isDataReady: _propTypes.bool,
    isLoading: _propTypes.bool,
    errorComponentProps: _propTypes.object,
    loadingComponentProps: _propTypes.object,
    emptyComponentProps: _propTypes.object,
    debug: _propTypes.bool,
    shouldReloadEverytime: _propTypes.bool
  };
  RenderCtrl.defaultProps = {
    isError: false,
    isDataReady: false,
    isLoading: false,
    errorComponentProps: {},
    loadingComponentProps: {},
    emptyComponentProps: {},
    debug: false,
    shouldReloadEverytime: false
  };

  RenderCtrl.contextTypes = {
    LoadingComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
    EmptyComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
    ErrorComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func])
  };
  return RenderCtrl;
}