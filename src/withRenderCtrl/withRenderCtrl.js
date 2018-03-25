import React, { Component } from 'react';
import { bool, func, any, element, oneOfType } from 'prop-types';
import {
  localDefaultLoadingId,
  localDefaultEmptyId,
  localDefaultErrorId
} from '../constant';


const _LoadingComponent = () => <div id={ localDefaultLoadingId }></div>;
const _EmptyComponent = () => <div id={ localDefaultEmptyId } />;
const _ErrorComponent = () => <div id={ localDefaultErrorId }>Error</div>;

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
				console.log(WrappedComponent.name + ':');
				console.group();
        console.log(`[props.isError]: ${isError}`);
        console.log(`[props.isDataReady]: ${isDataReady}`);
				console.log(`[props.isLoading]: ${isLoading}`);
				console.groupEnd();
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
