import React from 'react';
import withRenderCtrl from ".";

const IdealComponent = () => <div id="ideal"></div>;
const TestingComponent = withRenderCtrl(IdealComponent);

test('test', () => {
  const len = render(
    <TestingComponent
      isDataReady
    />
  ).find('#ideal');
  console.log(len);
});