import React, {useContext } from 'react';
import { RenderCtrlContext } from '../RenderCtrlProvider';
import defaultErrorComponent from '../defaultComponents/Error';
import defaultLoadingComponent from '../defaultComponents/Loading';
import defaultEmptyComponent from '../defaultComponents/Empty';


export default function withRenderCtrl(
  WrappedComponent,
  stateComponents = {}
) {
  return function RenderCtrl ({
    isError = false,
    isDataReady = false,
    isLoading = false,
    errorComponentProps = {},
    loadingComponentProps = {},
    emptyComponentProps = {},
    debug = false,
    shouldReloadEverytime = false,
    ...restProps,
  }) {
    const context = useContext(RenderCtrlContext);
    const propsToPass = {
      isError,
      isDataReady,
      isLoading,
      errorComponentProps,
      loadingComponentProps,
      emptyComponentProps,
      debug,
      shouldReloadEverytime,
      ...restProps,
    }
    // set status component
    const LoadingComponent =
      stateComponents.LoadingComponent ||
      context.LoadingComponent ||
      defaultLoadingComponent;

    const EmptyComponent =
      stateComponents.EmptyComponent ||
      context.EmptyComponent ||
      defaultEmptyComponent;

    const ErrorComponent =
      stateComponents.ErrorComponent ||
      context.ErrorComponent ||
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
      if (isDataReady) return <WrappedComponent { ...propsToPass } />;
      if (isLoading) return <LoadingComponent { ...loadingComponentProps } />;
      return <EmptyComponent { ...emptyComponentProps } />;
    }
    if (isLoading) return <LoadingComponent { ...loadingComponentProps } />;
    if (isDataReady) return <WrappedComponent { ...propsToPass } />;
    return <EmptyComponent { ...emptyComponentProps } />;
  }
}
