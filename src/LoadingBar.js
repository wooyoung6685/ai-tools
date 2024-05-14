import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 8px solid #f4f4f9;
  border-top: 8px solid #5c67f2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${loadingAnimation} 1s linear infinite;
  margin: 20px auto;
`;

const LoadingBar = () => {
  return <Loader />;
};

export default LoadingBar;