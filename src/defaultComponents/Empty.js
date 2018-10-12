import React from 'react';
import { string } from 'prop-types';
import { localDefaultEmptyId } from '../constant';

const EmptyComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultEmptyId }
      className={ props.testProp }
    />
    : null;
};

EmptyComponent.propTypes = {
  testProp: string
};

export default EmptyComponent;
