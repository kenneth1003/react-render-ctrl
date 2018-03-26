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
In react development we often face a problem of dealing with different states for some data-driven components. In most cases, those states include:
- **Ideal State**. The happy path for the component, everything is OK.
- **Loading State**. Component shows something to indicate it is loading.
- **Error State**. Component shows something went wrong.
- **Empty State**. Component shows something to indicate it is empty.

For those components, you would like to show a proper hint to users base on component's state. The code may look something like the following:
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
1. **Nested Ternary operator**. If there are several components all implement this kind of logic, it is not easy to understand at a galance.
2. **Spreading logics**. This kind of similar logic can be generalized and be handled in a single place instead of spreading all over the code base.
3. **Verbose importing**. If `<ErrorHint />`, `<LoadingSpinner />`, `<EmptyHint />` are the same across the project, you still have to import all of them to wherever they are used. It makes the code more verbose.
4. **Lower cohesion**. If `<ErrorHint />`, `<LoadingSpinner />`, `<EmptyHint />` are specific for the component, then they should be located in the `component.js` instead of in the `container.js` for higher cohesion.

To address these problems, I think [Provider Pattern](https://www.robinwieruch.de/react-provider-pattern-context/) would be a good solution. Provider provides global Loading, Empty, Error Components and uses  High-Order-Component to wrap the component you would like to implement render logic. Like the following,
`index.js`
```jsx
<RenderCtrlProvider
  ErrorComponent={ () => <div>default error hint</div> }
  EmptyComponent={ () => <div>default empty hint</div> }
  LoadingComponent={ () => <div>default loading hint</div> }
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
        isError={ something.went.wrong }
        isLoading={ api.isFetching }
        isDataReady={ data.length > 0 && data[0].value }
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
    ErrorComponent={ () => <div>default error hint</div> }
    EmptyComponent={ () => <div>default empty hint</div> }
    LoadingComponent={ () => <div>default loading hint</div> }
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
        isError={ something.went.wrong }
        isLoading={ api.isFetching }
        isDataReady={ data.length > 0 && data[0].value }
      />
      // ...
    );
  }
}
```
### Customized State Component
As above, you still can provide customized **state components** to `YourComponent`. It will overwrite the default **state components**.

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
        isError={ something.went.wrong }
        isLoading={ api.isFetching }
        isDataReady={ data.length > 0 && data[0].value }
      />
      // ...
    );
  }
}
```
## API
##### withRenderCtrl (WrappedComponent, [StateComponents])
```js
// Arguments Type
WrappedComponent: ReactComponent,
StateComponent: {
  ErrorComponent: ReactComponent,
  EmptyComponent: ReactComponent,
  LoadingComponent: ReactComponent
}
```
##### RenderCtrlProvider

|props|type|default|description|
|-|-|-|-|
|`ErrorComponent`|`element`|`null`||
|`EmptyComponent`|`element`|`null`||
|`LoadingComponent`|`element`|`null`||

##### EnhancedComponent
`EnhancedComponent` is the return of `withRenderCtrl`.

|props|type|default|description|
|-|-|-|-|
|`isError`|`bool`|`false`||
|`isLoading`|`bool`|`false`||
|`isDataReady`|`bool`|`false`||
|`shouldReloadEverytime`|`bool`|`false`|always show `<LoadingComponent />` while `isLoading` is true even if data is ready|
|`debug`|`bool`|`false`|log debug info in the console while `process.env.NODE_ENV !== 'production'`|

## TODO
- Flow typing
- higher test coverage
- pre-build code-checking
- CI/CD

## License
MIT
