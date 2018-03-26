import React from 'react';
import withRenderCtrl from './withRenderCtrl';
import RenderCtrlProvider from './RenderCtrlProvider';
import {
  localDefaultLoadingId,
  localDefaultEmptyId,
  localDefaultErrorId
} from './constant';

const IdealStatusComponent = () => <div id="ideal" />;
const ComponentDefault = withRenderCtrl(IdealStatusComponent);

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
const ComponentCustom = withRenderCtrl(IdealStatusComponent, customComponents);

test('Local Default Components Should be accessed, when no provider', () => {
  const localDefaultEmptyComponentCount = mount(
    <ComponentDefault debug />
  ).find('#' + localDefaultEmptyId).length;
  expect(localDefaultEmptyComponentCount).toEqual(1);
  const localDefaultLoadingComponentCount = mount(
    <ComponentDefault
      isLoading
    />
  ).find('#' + localDefaultLoadingId).length;
  expect(localDefaultLoadingComponentCount).toEqual(1);
  const localDefaultErrorComponentCount = mount(
    <ComponentDefault
      isLoading
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
      <ComponentDefault />
    </RenderCtrlProvider>
  ).find('#default-empty').length;

  expect(defaultEmptyComponentCount).toEqual(1);
  const defaultLoadingComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <ComponentDefault
        isLoading
      />
    </RenderCtrlProvider>
  ).find('#default-loading').length;
  expect(defaultLoadingComponentCount).toEqual(1);

  const defaultErrorComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents } >
      <ComponentDefault
        isLoading
        isError
      />
    </RenderCtrlProvider>
  ).find('#default-error').length;
  expect(defaultErrorComponentCount).toEqual(1);
});

test('Custom Components should overwrite Default Components with <RenderCtrlProvider />', () => {
  const customEmptyComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <ComponentCustom />
    </RenderCtrlProvider>
  ).find('#custom-empty').length;
  expect(customEmptyComponentCount).toEqual(1);

  const customLoadingComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <ComponentCustom
        isLoading
      />
    </RenderCtrlProvider>
  ).find('#custom-loading').length;
  expect(customLoadingComponentCount).toEqual(1);

  const customErrorComponentCount = mount(
    <RenderCtrlProvider { ...defaultComponents }>
      <ComponentCustom
        isLoading
        isError
      />
    </RenderCtrlProvider>
  ).find('#custom-error').length;
  expect(customErrorComponentCount).toEqual(1);
});
