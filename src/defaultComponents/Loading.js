import React from 'react';
import { localDefaultLoadingId } from '../constant';

const LoadingComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultLoadingId }
      className={ props.testProp }
    />
    : null;
};

export default LoadingComponent;
