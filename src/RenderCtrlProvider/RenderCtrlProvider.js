import React from 'react';

export const RenderCtrlContext = React.createContext({})
export default class RenderCtrlProvider extends React.Component {
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

  render() {
    return (
      <RenderCtrlContext.Provider value={{
        LoadingComponent: this.props.LoadingComponent,
        EmptyComponent: this.props.EmptyComponent,
        ErrorComponent: this.props.ErrorComponent
      }}>
        { this.props.children }
      </RenderCtrlContext.Provider>
    );
  }
}
