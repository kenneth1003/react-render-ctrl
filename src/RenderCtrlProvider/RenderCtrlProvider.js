import React from 'react';
import { oneOfType, element, func } from 'prop-types';

export default class RenderCtrlProvider extends React.Component {
  // eslint-disable-next-line no-undef
  static propTypes = {
    children: element.isRequired,
    LoadingComponent: oneOfType([element, func]),
    EmptyComponent: oneOfType([element, func]),
    ErrorComponent: oneOfType([element, func])
  }
  // eslint-disable-next-line no-undef
  static defaultProps = {
    LoadingComponent: () => {
      return process.env.NODE_ENV !== 'production' ? <div id="default-loading" /> : null;
    },
    EmptyComponent: () => {
      return process.env.NODE_ENV !== 'production' ? <div id="default-empty" /> : null;
    },
    ErrorComponent: () => {
      return process.env.NODE_ENV !== 'production' ? <div id="default-error" /> : null;
    }
  }
  getChildContext() {
    return {
      LoadingComponent: this.props.LoadingComponent,
      EmptyComponent: this.props.EmptyComponent,
      ErrorComponent: this.props.ErrorComponent
    };
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

RenderCtrlProvider.childContextTypes = {
  LoadingComponent: oneOfType([element, func]),
  EmptyComponent: oneOfType([element, func]),
  ErrorComponent: oneOfType([element, func])
};
