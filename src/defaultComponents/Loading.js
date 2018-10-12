import React from 'react';
import { string } from 'prop-types';
import { localDefaultLoadingId } from '../constant';

const LoadingComponent = (props) => {
  return process.env.NODE_ENV !== 'production'
    ? <div
      id={ localDefaultLoadingId }
      className={ props.testProp }
    />
    : null;
};

LoadingComponent.propTypes = {
  testProp: string
};

export default LoadingComponent;
