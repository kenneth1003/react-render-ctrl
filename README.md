## React-Render-Ctrl
[![npm package][npm-badge]][npm]
A component render control HOC for different states.
## Table of Content
- [Intention](#intention)
- [Quick Start](#quick-start)
- [Examples](#examples)
  - [Basic Ssage](#basic-usage)
  - [Default State Component](#default-state-component)
  - [Customized State Component](#customized-state-component)
- [API](#api)
- [License](#license)
## Intention
In react development we often face a problem of dealing with different states for some components. In most cases, those states includes:
- Ideal State
- Loading State
- Error State
- Empty State

For those components, you want to show proper hint to users base on component's state. The code may look something like the following:
`container.js`

```jsx
class Container extends React.Component {
  render() {
    return (
      // ...
      {
        isComponentError
        ? <ErrorHint />
        : isLoading
          ? <LoadingSpinner />
          : data.length > 0
            ? <MyComponent data={ data } />
            : <EmptyHint />
      }
      // ...
    )
  }
}
```
The code above is not ideal, because
1. Nested Ternary operator. If there are several component all implement these kind of logics, it is not easy to understand at a galance.
2. These kind of similar logics can be generalize and be handled in single place instead of spreading all over the code base.
3. If `<ErrorHint />`, `<LoadingSpinner />`, `<EmptyHint />` are the same across the project, you still have to import all of them to wherever they are used. It makes the code more verbose.
4. If `<ErrorHint />`, `<LoadingSpinner />`, `<EmptyHint />` are specific for the component, then they should be located in the `component.js` instead of in the `container.js` for higher cohesion.

To address these problems, I think [Provdier Pattern](https://www.robinwieruch.de/react-provider-pattern-context/) would be a good solution. Provider provides global Loading, Empty, Error Components and use  High-Order-Component to wrap the component you would like to implement render logics. Like the following,
`index.js`
```jsx
<RenderCtrlProvider
  ErrorComponent={ /* your default error hint component */ }
  EmptyComponent={ /* your default empty component */ }
  LoadingComponent={ /* your default loading component */ }
>
  <YourApp />
</RenderCtrlProvider>
```
`YourComponent.js`
```jsx
class YourComponent extends Component {
  //...
}

export default withRenderCtrl(YourComponent, {
  LoadingComponent: /* your customized loading for this component */
});
```
`container.js`
```jsx
class Container extends Component {
  // ...
  render() {
    return (
      // ...
      <YourComponent
        isError={ isComponentError }
        isLoading={ isLoading }
        isDataReady={ data.length > 0 /* or other logics indicate data is ready */ }
        // other props...
      />
      // ...
    );
  }
}
```
This appoarch alleviates the problems we mention above.

## Examples
installation:
`npm install react-render-ctrl` or `yarn add react-render-ctrl`
### Basic Usage
You can use it directly without using `RenderCtrlProvider`, if you don't need to config your default state components.
`YourComponent.js`
```jsx
import React from 'react';
import { withRenderCtrl } from 'react-render-ctrl';
// ...
class YourComponent extends React.Component {
  // ...
}
export default withRenderCtrl(YourComponent, {
  ErrorComponent: () => <div>sth wrong</div>,
  EmptyComponent: () => <div>it is empty</div>,
  LoadingComponent: () => <div>loading</div>,
});
```
`container.js`
```jsx
class Container extends React.Component {
  // ...
  render() {
    return (
      // ...
      <YourComponent
        isError={ /* your corresponding logic */ }
        isLoading={ /* your corresponding logic */ }
        isDataReady={ /* your corresponding logic */ }
      />
      // ...
    );
  }
}
```
### Default State Component
If you need to config your default state components, you have to implement `<RenderCtrlProvider />` in the root of your application.
`index.js`
```jsx
ReactDOM.render(
  <RenderCtrlProvider
    ErrorComponent={ /* your default error hint component */ }
    EmptyComponent={ /* your default empty component */ }
    LoadingComponent={ /* your default loading component */ }
  >
    <YourApp />
  </RenderCtrlProvider>
  ,
  document.getElementById('root')
);
```
In your component you don't need to pass state component as argument to the `withRenderCtrl` function.
`YourComponent.js`
```jsx
import React from 'react';
import { withRenderCtrl } from 'react-render-ctrl';
// ...
class YourComponent extends React.Component {
  // ...
}
export default withRenderCtrl(YourComponent);
```
`container.js`
```jsx
class Container extends React.Component {
  // ...
  render() {
    return (
      // ...
      <YourComponent
        isError={ /* your corresponding logic */ }
        isLoading={ /* your corresponding logic */ }
        isDataReady={ /* your corresponding logic */ }
      />
      // ...
    );
  }
}
```
### Customized State Component
As above, you still can provide customized state component to `YourComponent`. It will overwrite the default state component.
`YourComponent.js`
```jsx
import React from 'react';
import { withRenderCtrl } from 'react-render-ctrl';
// ...
class YourComponent extends React.Component {
  // ...
}
export default withRenderCtrl(YourComponent, {
  ErrorComponent: () => <div>customized error component</div>,
  EmptyComponent: () => <div>customized empty component</div>,
  LoadingComponent: () => <div>customized loading component</div>,
});
```
`container.js`
```jsx
class Container extends React.Component {
  // ...
  render() {
    return (
      // ...
      <YourComponent
        isError={ /* your corresponding logic */ }
        isLoading={ /* your corresponding logic */ }
        isDataReady={ /* your corresponding logic */ }
      />
      // ...
    );
  }
}
```
## API
#####withRenderCtrl (WrappedComponent, [StateComponents])
```
// Arguments Type
WrappedComponent: ReactComponent
StateComponent: {
  ErrorComponent: ReactComponent,
  EmptyComponent: ReactComponent,
  LoadingComponent: ReactComponent
}
```
#####RenderCtrlProvider
|props|type|default|description|
|-|-|-|-|
|`ErrorComponent`|`element`|`null`||
|`EmptyComponent`|`element`|`null`||
|`LoadingComponent`|`element`|`null`||

#####EnhancedComponent
`EnhancedComponent` is the return of `withRenderCtrl`.
|props|type|default|description|
|-|-|-|-|
|`isError`|`bool`|`false`||
|`isLoading`|`bool`|`false`||
|`isDataReady`|`bool`|`false`||
|`shouldReloadEverytime`|`bool`|`false`|always show `<LoadingComponent />` when `isLoading` is true even if data is ready|
|`debug`|`bool`|`false`|log debug info in the console when `process.env.NODE_ENV !== 'production'`|

##License
MIT