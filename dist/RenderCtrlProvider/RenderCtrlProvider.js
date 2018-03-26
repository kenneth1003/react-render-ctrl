'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderCtrlProvider = function (_React$Component) {
  _inherits(RenderCtrlProvider, _React$Component);

  function RenderCtrlProvider() {
    _classCallCheck(this, RenderCtrlProvider);

    return _possibleConstructorReturn(this, (RenderCtrlProvider.__proto__ || Object.getPrototypeOf(RenderCtrlProvider)).apply(this, arguments));
  }

  _createClass(RenderCtrlProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        LoadingComponent: this.props.LoadingComponent,
        EmptyComponent: this.props.EmptyComponent,
        ErrorComponent: this.props.ErrorComponent
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return RenderCtrlProvider;
}(_react2.default.Component);

RenderCtrlProvider.propTypes = {
  LoadingComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
  EmptyComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
  ErrorComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func])
};
RenderCtrlProvider.defaultProps = {
  LoadingComponent: function LoadingComponent() {
    return process.env.NODE_ENV !== 'production' ? _react2.default.createElement('div', { id: 'default-loading' }) : null;
  },
  EmptyComponent: function EmptyComponent() {
    return process.env.NODE_ENV !== 'production' ? _react2.default.createElement('div', { id: 'default-empty' }) : null;
  },
  ErrorComponent: function ErrorComponent() {
    return process.env.NODE_ENV !== 'production' ? _react2.default.createElement(
      'div',
      { id: 'default-error' },
      'Something wrong happened'
    ) : null;
  }
};
exports.default = RenderCtrlProvider;


RenderCtrlProvider.childContextTypes = {
  LoadingComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
  EmptyComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
  ErrorComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func])
};