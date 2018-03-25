'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withRenderCtrl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _constant = require('../constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _LoadingComponent = function _LoadingComponent() {
	return _react2.default.createElement('div', { id: _constant.localDefaultLoadingId });
};
var _EmptyComponent = function _EmptyComponent() {
	return _react2.default.createElement('div', { id: _constant.localDefaultEmptyId });
};
var _ErrorComponent = function _ErrorComponent() {
	return _react2.default.createElement(
		'div',
		{ id: _constant.localDefaultErrorId },
		'Error'
	);
};

function withRenderCtrl(WrappedComponent) {
	var RenderCtrl = function (_Component) {
		_inherits(RenderCtrl, _Component);

		function RenderCtrl() {
			_classCallCheck(this, RenderCtrl);

			return _possibleConstructorReturn(this, (RenderCtrl.__proto__ || Object.getPrototypeOf(RenderCtrl)).apply(this, arguments));
		}

		_createClass(RenderCtrl, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    isError = _props.isError,
				    isDataReady = _props.isDataReady,
				    isLoading = _props.isLoading,
				    fetchData = _props.fetchData,
				    debug = _props.debug,
				    shouldReloadEverytime = _props.shouldReloadEverytime;

				var DebugWrapper = void 0;

				// set status component
				var LoadingComponent = this.props.LoadingComponent || this.context.LoadingComponent || _LoadingComponent;

				var EmptyComponent = this.props.EmptyComponent || this.context.EmptyComponent || _EmptyComponent;

				var ErrorComponent = this.props.ErrorComponent || this.context.ErrorComponent || _ErrorComponent;
				if (process.env.NODE_ENV !== 'production' && debug) {
					console.log(WrappedComponent.name + ':');
					console.log('[props.isError]: ' + isError);
					console.log('[props.isDataReady]: ' + isDataReady);
					console.log('[props.isLoading]: ' + isLoading);
				}
				// Render Logic
				if (isError) return _react2.default.createElement(ErrorComponent, null);
				if (!shouldReloadEverytime) {
					if (isDataReady) return _react2.default.createElement(WrappedComponent, this.props);
					if (isLoading) return _react2.default.createElement(LoadingComponent, null);
					return _react2.default.createElement(EmptyComponent, null);
				} else {
					if (isLoading) return _react2.default.createElement(LoadingComponent, null);
					if (isDataReady) return _react2.default.createElement(WrappedComponent, this.props);
					return _react2.default.createElement(EmptyComponent, null);
				}
				return _react2.default.createElement(WrappedComponent, this.props);
			}
		}]);

		return RenderCtrl;
	}(_react.Component);

	RenderCtrl.propTypes = {
		isError: _propTypes.bool,
		isDataReady: _propTypes.any,
		isLoading: _propTypes.bool,
		debug: _propTypes.bool,
		LoadingComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
		EmptyComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
		ErrorComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
		shouldReloadEverytime: _propTypes.bool
	};
	RenderCtrl.defaultProps = {
		isError: false,
		isDataReady: false,
		isLoading: false,
		debug: false,
		LoadingComponent: null,
		EmptyComponent: null,
		ErrorComponent: null,
		shouldReloadEverytime: false
	};
	;
	RenderCtrl.contextTypes = {
		LoadingComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
		EmptyComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func]),
		ErrorComponent: (0, _propTypes.oneOfType)([_propTypes.element, _propTypes.func])
	};
	return RenderCtrl;
}