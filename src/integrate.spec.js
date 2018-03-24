import React from 'react';
import withRenderCtrl from "./withRednerCtrl";
import RenderCtrlProvider from "./RenderCtrlProvider";
import {
  localDefaultLoadingId,
  localDefaultEmptyId,
  localDefaultErrorId
} from './constant';

const IdealStatusComponent = () => <div id="ideal"></div>;
const TestingComponent = withRenderCtrl(IdealStatusComponent);

const LoadingComponent = () => <div id="default-loading">LoadingComponent</div>;
const EmptyComponent = () => <div id="default-empty">EmptyComponent</div>;
const ErrorComponent = () => <div id="default-error">ErrorComponent</div>;

const defaultComponents = {
  LoadingComponent,
  EmptyComponent,
  ErrorComponent
};

const CustomLoadingComponent = () => <div id="custom-loading">CustomLoadingComponent</div>;
const CustomEmptyComponent = () => <div id="custom-empty">CustomEmptyComponent</div>;
const CustomErrorComponent = () => <div id="custom-error">CustomErrorComponent</div>;

const customComponents = {
  LoadingComponent: CustomLoadingComponent,
  EmptyComponent: CustomEmptyComponent,
  ErrorComponent: CustomErrorComponent
};

test('Local Default Components Should be accessed, when no provider', () => {
  const localDefaultEmptyComponentCount = mount(
    <TestingComponent debug/>
  ).find('#' + localDefaultEmptyId).length;
  expect(localDefaultEmptyComponentCount).toEqual(1);
  const localDefaultLoadingComponentCount = mount(
    <TestingComponent
      isFetching
    />
  ).find('#' + localDefaultLoadingId).length;
  expect(localDefaultLoadingComponentCount).toEqual(1);
  const localDefaultErrorComponentCount = mount(
    <TestingComponent
      isFetching
      isError
    />
  ).find('#' + localDefaultErrorId).length;
  expect(localDefaultErrorComponentCount).toEqual(1);
});

test('Default Components Should be accessed with <RenderCtrlProvider />', () => {
  const defaultEmptyComponentCount = mount(
    <RenderCtrlProvider
      { ...defaultComponents }
    >
      <TestingComponent />
    </RenderCtrlProvider>
  ).find('#default-empty').length;

  expect(defaultEmptyComponentCount).toEqual(1);
  const defaultLoadingComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <TestingComponent
        isFetching
      />
    </RenderCtrlProvider>
  ).find('#default-loading').length;
  expect(defaultLoadingComponentCount).toEqual(1);

  const defaultErrorComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents } >
      <TestingComponent
        isFetching
        isError
      />
    </RenderCtrlProvider>
  ).find('#default-error').length;
  expect(defaultErrorComponentCount).toEqual(1);
});

test('Custom Components should overwrite Default Components with <RenderCtrlProvider />', () => {
  const customEmptyComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <TestingComponent
        { ...customComponents }
      />
    </RenderCtrlProvider>
  ).find('#custom-empty').length;
  expect(customEmptyComponentCount).toEqual(1);

  const customLoadingComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <TestingComponent
        { ...customComponents }
        isFetching
      />
    </RenderCtrlProvider>
  ).find('#custom-loading').length;
  expect(customLoadingComponentCount).toEqual(1);

  const customErrorComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <TestingComponent
        { ...customComponents }
        isFetching
        isError
      />
    </RenderCtrlProvider>
  ).find('#custom-error').length;
  expect(customErrorComponentCount).toEqual(1);
});
