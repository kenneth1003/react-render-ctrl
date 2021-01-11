import { ClassicComponent, FunctionComponent } from 'react'

type ReactComponent<T> = ClassicComponent<T> | FunctionComponent<T>

interface StateComponents {
  ErrorComponent?: ReactComponent<any>,
  EmptyComponent?: ReactComponent<any>,
  LoadingComponent?: ReactComponent<any>,
}

type RenderCtrlProvider = ClassicComponent<StateComponents>

interface WithRenderCtrlProps {
  isError?: boolean,
    isDataReady?: boolean,
    isLoading?: boolean,
    errorComponentProps?: ErrorProps,
    loadingComponentProps?: LoadingProps,
    emptyComponentProps?: EmptyProps,
    debug?: boolean,
    shouldReloadEverytime?: boolean,
}

interface withRenderCtrl {
  (
    WrappedComponent: T,
    stateComponents?: StateComponents
  ): FunctionComponent<WithRenderCtrlProps & Parameters<T>[0]>
}

export {
  RenderCtrlProvider,
  withRenderCtrl
}
