import React, { Component } from 'react';
import { bool, func, any, element, oneOfType } from 'prop-types';
import {
  localDefaultLoadingId,
  localDefaultEmptyId,
  localDefaultErrorId
} from '../constant';

const _LoadingComponent = () => {
  return process.env.NODE_ENV !== 'production' ? <div id={ localDefaultLoadingId } /> : null;
};
const _EmptyComponent = () => {
  return process.env.NODE_ENV !== 'production' ? <div id={ localDefaultEmptyId } /> : null;
};
const _ErrorComponent = () => {
  return process.env.NODE_ENV !== 'production' ? <div id={ localDefaultErrorId } /> : null;
};

export default function withRenderCtrl(
  WrappedComponent,
  stateComponents = {}
) {
  class RenderCtrl extends Component {
    static propTypes = {
      isError: bool,
      isDataReady: any,
      isLoading: bool,
      debug: bool,
      shouldReloadEverytime: bool
    }
    static defaultProps = {
      isError: false,
      isDataReady: false,
      isLoading: false,
      debug: false,
      shouldReloadEverytime: false
    }
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const {
        isError,
        isDataReady,
        isLoading,
        debug,
        shouldReloadEverytime
      } = this.props;
      // set status component
      const LoadingComponent =
        stateComponents.LoadingComponent ||
        this.context.LoadingComponent ||
        _LoadingComponent;

      const EmptyComponent =
        stateComponents.EmptyComponent ||
        this.context.EmptyComponent ||
        _EmptyComponent;

      const ErrorComponent =
        stateComponents.ErrorComponent ||
        this.context.ErrorComponent ||
        _ErrorComponent;
      if (process.env.NODE_ENV !== 'production' && debug) {
        /* eslint-disable no-console */
        console.group(WrappedComponent.name);
        console.log(`[props.isError]: ${isError}`);
        console.log(`[props.isDataReady]: ${isDataReady}`);
        console.log(`[props.isLoading]: ${isLoading}`);
        console.groupEnd(WrappedComponent.name);
        /* eslint-enable no-console */
      }
      // Render Logic
      if (isError) return <ErrorComponent />;
      if (!shouldReloadEverytime) {
        if (isDataReady) return <WrappedComponent { ...this.props } />;
        if (isLoading) return <LoadingComponent />;
        return <EmptyComponent />;
      }
      if (isLoading) return <LoadingComponent />;
      if (isDataReady) return <WrappedComponent { ...this.props } />;
      return <EmptyComponent />;
    }
  }
  RenderCtrl.contextTypes = {
    LoadingComponent: oneOfType([element, func]),
    EmptyComponent: oneOfType([element, func]),
    ErrorComponent: oneOfType([element, func])
  };
  return RenderCtrl;
}
