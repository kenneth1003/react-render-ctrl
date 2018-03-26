import React from 'react';
import withRenderCtrl from '.';
import {
  // localDefaultLoadingId,
  // localDefaultEmptyId,
  localDefaultErrorId
} from '../constant';

const IdealStatusComponent = () => <div id="ideal" />;
const TestingComponent = withRenderCtrl(IdealStatusComponent);

test('isDataReady should render <IdealStatusComponent />', () => {
  const len = mount(
    <TestingComponent
      isDataReady
    />
  ).find('#ideal').length;
  expect(len).toEqual(1);
});

test('isError should render <ErrorComponent />', () => {
  const len = mount(
    <TestingComponent
      isError
      isDataReady
    />
  ).find('#' + localDefaultErrorId).length;
  expect(len).toEqual(1);
  const len2 = mount(
    <TestingComponent
      isError
      isLoading
    />
  ).find('#' + localDefaultErrorId).length;
  expect(len2).toEqual(1);
});
