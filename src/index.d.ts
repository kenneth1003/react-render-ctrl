import { ClassicComponent, FunctionComponent } from 'react'

type ReactComponent<T = any> = ClassicComponent<T> | FunctionComponent<T>

interface StateComponents {
  ErrorComponent?: ReactComponent,
  EmptyComponent?: ReactComponent,
  LoadingComponent?: ReactComponent,
}

// Why not using `ClassicComponent`, because of this issue:
// https://github.com/microsoft/TypeScript/issues/28631
type RenderCtrlProvider = FunctionComponent<StateComponents>

interface WithRenderCtrlProps {
  isError?: boolean,
    isDataReady?: boolean,
    isLoading?: boolean,
    errorComponentProps?: any,
    loadingComponentProps?: any,
    emptyComponentProps?: any,
    debug?: boolean,
    shouldReloadEverytime?: boolean,
}

interface withRenderCtrl {
  <T>(
    WrappedComponent: T,
    stateComponents?: StateComponents
  ): FunctionComponent<WithRenderCtrlProps & T extends (...args: infer A) => any ?  A[0] : T extends new(...args: infer A) => any ? A[0] : { noo: string }>
}

export = ReactRenderCtrl;
export as namespace ReactRenderCtrl;

declare namespace ReactRenderCtrl {
  export const withRenderCtrl: withRenderCtrl

  export const RenderCtrlProvider: RenderCtrlProvider
}
