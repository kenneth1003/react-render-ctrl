import React, { Component } from 'react';
import {
  bool,
  func,
  element,
  oneOfType,
  object
} from 'prop-types';
import defaultErrorComponent from '../defaultComponents/Error';
import defaultLoadingComponent from '../defaultComponents/Loading';
import defaultEmptyComponent from '../defaultComponents/Empty';


export default function withRenderCtrl(
  WrappedComponent,
  stateComponents = {}
) {
  class RenderCtrl extends Component {
    static propTypes = {
      isError: bool,
      isDataReady: bool,
      isLoading: bool,
      errorComponentProps: object,
      loadingComponentProps: object,
      emptyComponentProps: object,
      debug: bool,
      shouldReloadEverytime: bool
    }
    static defaultProps = {
      isError: false,
      isDataReady: false,
      isLoading: false,
      errorComponentProps: {},
      loadingComponentProps: {},
      emptyComponentProps: {},
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
        errorComponentProps,
        loadingComponentProps,
        emptyComponentProps,
        debug,
        shouldReloadEverytime
      } = this.props;
      // set status component
      const LoadingComponent =
        stateComponents.LoadingComponent ||
        this.context.LoadingComponent ||
        defaultLoadingComponent;

      const EmptyComponent =
        stateComponents.EmptyComponent ||
        this.context.EmptyComponent ||
        defaultEmptyComponent;

      const ErrorComponent =
        stateComponents.ErrorComponent ||
        this.context.ErrorComponent ||
        defaultErrorComponent;
      if (process.env.NODE_ENV !== 'production' && debug) {
        /* eslint-disable no-console */
        console.group(WrappedComponent.name);
        console.log(`[props.isError]: ${isError}`);
        console.log(`[props.isDataReady]: ${isDataReady}`);
        console.log(`[props.isLoading]: ${isLoading}`);
        console.log(`[props.errorComponentProps]: ${errorComponentProps}`);
        console.log(`[props.loadingComponentProps]: ${loadingComponentProps}`);
        console.log(`[props.emptyComponentProps]: ${emptyComponentProps}`);
        console.groupEnd(WrappedComponent.name);
        /* eslint-enable no-console */
      }
      // Render Logic
      if (isError) return <ErrorComponent { ...errorComponentProps } />;
      if (!shouldReloadEverytime) {
        if (isDataReady) return <WrappedComponent { ...this.props } />;
        if (isLoading) return <LoadingComponent { ...loadingComponentProps } />;
        return <EmptyComponent { ...emptyComponentProps } />;
      }
      if (isLoading) return <LoadingComponent { ...loadingComponentProps } />;
      if (isDataReady) return <WrappedComponent { ...this.props } />;
      return <EmptyComponent { ...emptyComponentProps } />;
    }
  }
  RenderCtrl.contextTypes = {
    LoadingComponent: oneOfType([element, func]),
    EmptyComponent: oneOfType([element, func]),
    ErrorComponent: oneOfType([element, func])
  };
  return RenderCtrl;
}
