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
	WrappedComponent
) {
	class RenderCtrl extends Component {
		static propTypes = {
			isError: bool,
			isDataReady: any,
			isFetching: bool,
			debug: bool,
			LoadingComponent: oneOfType([element, func]),
			EmptyComponent: oneOfType([element, func]),
			ErrorComponent: oneOfType([element, func]),
			shouldReloadEverytime: bool
		}
		static defaultProps = {
			isError: false,
			isDataReady: false,
			isFetching: false,
			debug: false,
			LoadingComponent: null,
			EmptyComponent: null,
			ErrorComponent: null,
			shouldReloadEverytime: false
		}
		render() {
			const {
				isError,
				isDataReady,
				isFetching,
        fetchData,
        debug,
				shouldReloadEverytime
      } = this.props;
      let DebugWrapper;

      // set status component
      const LoadingComponent =
        this.props.LoadingComponent ||
        this.context.LoadingComponent ||
        _LoadingComponent;
      
      const EmptyComponent =
        this.props.EmptyComponent ||
        this.context.EmptyComponent ||
        _EmptyComponent;
      
      const ErrorComponent =
        this.props.ErrorComponent ||
        this.context.ErrorComponent ||
        _ErrorComponent;
      if (process.env.NODE_ENV !== 'production' && debug) {
        console.log(WrappedComponent.name + ':');
        console.log(`[props.isError]: ${isError}`);
        console.log(`[props.isDataReady]: ${isDataReady}`);
        console.log(`[props.isFetching]: ${isFetching}`);
      }
      // Render Logic
			if (isError) return ErrorComponent();
			if (!shouldReloadEverytime) {
				if (isDataReady) return <WrappedComponent { ...this.props } />;
				if (isFetching) return LoadingComponent();
				return EmptyComponent();
			} else {
				if (isFetching) return LoadingComponent();
				if (isDataReady) return <WrappedComponent { ...this.props } />;
				return EmptyComponent();
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
