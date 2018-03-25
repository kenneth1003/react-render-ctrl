import React from 'react';
import { oneOfType, element, func } from 'prop-types';

export default class RenderCtrlProvider extends React.Component {
  static propTypes = {
    LoadingComponent: oneOfType([element, func]),
    EmptyComponent: oneOfType([element, func]),
    ErrorComponent: oneOfType([element, func])
  }
  static defaultProps = {
    LoadingComponent: () => process.env.NODE_ENV !== 'production' ? <div id="default-loading"></div> : null,
    EmptyComponent: () => process.env.NODE_ENV !== 'production' ? <div id="default-empty"></div> : null,
    ErrorComponent: () => process.env.NODE_ENV !== 'production' ? <div id="default-error">Something wrong happened</div> : null
  }
  getChildContext() {
    return {
	    LoadingComponent: this.props.LoadingComponent,
	    EmptyComponent: this.props.EmptyComponent,
	    ErrorComponent: this.props.ErrorComponent
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
