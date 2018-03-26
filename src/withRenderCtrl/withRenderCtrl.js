import React, { Component } from 'react';
import { bool, func, any, element, oneOfType } from 'prop-types';
import {
  localDefaultLoadingId,
  localDefaultEmptyId,
  localDefaultErrorId
} from '../constant';

const _LoadingComponent = () => process.env.NODE_ENV !== 'production' ? <div id={ localDefaultLoadingId }></div> : null;
const _EmptyComponent = () => process.env.NODE_ENV !== 'production' ? <div id={ localDefaultEmptyId } /> : null;
const _ErrorComponent = () => process.env.NODE_ENV !== 'production' ? <div id={ localDefaultErrorId }>Error</div> : null;

export default function withRenderCtrl (
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
		render() {
			const {
				isError,
				isDataReady,
				isLoading,
        fetchData,
        debug,
				shouldReloadEverytime
      } = this.props;
      let DebugWrapper;
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
				console.group(WrappedComponent.name);
        console.log(`[props.isError]: ${isError}`);
        console.log(`[props.isDataReady]: ${isDataReady}`);
				console.log(`[props.isLoading]: ${isLoading}`);
				console.groupEnd(WrappedComponent.name);
      }
      // Render Logic
			if (isError) return <ErrorComponent />;
			if (!shouldReloadEverytime) {
				if (isDataReady) return <WrappedComponent { ...this.props } />;
				if (isLoading) return <LoadingComponent />;
				return <EmptyComponent />;
			} else {
				if (isLoading) return <LoadingComponent />;
				if (isDataReady) return <WrappedComponent { ...this.props } />;
				return <EmptyComponent />;
			}
			return <WrappedComponent { ...this.props } />;
		}
	};
	RenderCtrl.contextTypes = {
		LoadingComponent: oneOfType([element, func]),
		EmptyComponent: oneOfType([element, func]),
		ErrorComponent: oneOfType([element, func])
	};
	return RenderCtrl;
}
