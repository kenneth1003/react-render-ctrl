import React from 'react';
import { localDefaultErrorId } from '../constant';

const ErrorComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultErrorId }
      className={ props.testProp }
    />
    : null;
};

export default ErrorComponent;
