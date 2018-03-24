import React from 'react';
import { oneOfType, element, func } from 'prop-types';

const LoadingComponent = () => <div id="default-loading">LoadingComponent</div>;
const EmptyComponent = () => <div id="default-empty">EmptyComponent</div>;
const ErrorComponent = () => <div id="default-error">ErrorComponent</div>;

export default class RenderCtrlProvider extends React.Component {
  getChildContext() {
    return {
	    LoadingComponent: this.props.LoadingComponent || LoadingComponent,
	    EmptyComponent: this.props.EmptyComponent || EmptyComponent,
	    ErrorComponent: this.props.ErrorComponent || ErrorComponent
    };
  }

  render() {
    return <div>
      { this.props.children }
    </div>;
  }
}

RenderCtrlProvider.childContextTypes = {
  LoadingComponent: oneOfType([element, func]),
  EmptyComponent: oneOfType([element, func]),
  ErrorComponent: oneOfType([element, func])
};
