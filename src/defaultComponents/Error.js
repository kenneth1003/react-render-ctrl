import React from 'react';
import { string } from 'prop-types';
import { localDefaultErrorId } from '../constant';

const ErrorComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultErrorId }
      className={ props.testProp }
    />
    : null;
};

ErrorComponent.propTypes = {
  testProp: string
};

export default ErrorComponent;
