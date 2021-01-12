import React from 'react';
import { localDefaultEmptyId } from '../constant';

const EmptyComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultEmptyId }
      className={ props.testProp }
    />
    : null;
};

export default EmptyComponent;
